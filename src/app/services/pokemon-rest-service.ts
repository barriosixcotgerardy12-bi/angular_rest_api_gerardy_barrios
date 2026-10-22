import {computed, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CharacterModel} from '../interfaces/character-model';
import {CharacterDetail, DetailField, DetailGroup} from '../interfaces/character-detail';
import {PokemonListResponse} from '../interfaces/pokemon-response';
import {PokemonDetailResponse, PokemonSpeciesResponse} from '../interfaces/pokemon-detail-response';

const TYPE_NAMES: Record<string, string> = {
  normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico', grass: 'Planta',
  ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno', ground: 'Tierra', flying: 'Volador',
  psychic: 'Psíquico', bug: 'Bicho', rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón',
  dark: 'Siniestro', steel: 'Acero', fairy: 'Hada',
};

const STAT_NAMES: Record<string, string> = {
  hp: 'PS', attack: 'Ataque', defense: 'Defensa',
  'special-attack': 'Ataque esp.', 'special-defense': 'Defensa esp.', speed: 'Velocidad',
};

@Injectable({providedIn: 'root'})
export class PokemonRestService {

  pageIndex = signal<number>(0);
  pageSize = signal<number>(12);

  // Esta API pagina con offset: posición inicial = página × tamaño de página
  dataList = httpResource<PokemonListResponse>(
    () => `https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize()}&offset=${this.pageIndex() * this.pageSize()}`
  );

  /** El listado no trae ID ni imagen: el ID se saca de la URL y la imagen se arma con él */
  characters = computed<CharacterModel[]>(() => {
    const results = this.dataList.hasValue() ? this.dataList.value().results : [];
    return results.map(p => {
      const id = this.idFromUrl(p.url);
      return {id, name: this.pretty(p.name), img: this.artwork(id)};
    });
  });

  total = computed(() => this.dataList.hasValue() ? this.dataList.value().count : 0);

  detailUrl(id: string): string {
    return `https://pokeapi.co/api/v2/pokemon/${id}`;
  }

  toDetail(p: PokemonDetailResponse, s?: PokemonSpeciesResponse): CharacterDetail {
    const fields: DetailField[] = [
      {label: 'Tipo', value: p.types.map(t => TYPE_NAMES[t.type.name] ?? this.pretty(t.type.name)).join(', ')},
      {label: 'Categoría', value: this.byLanguage(s?.genera)?.genus ?? ''},
      {label: 'Altura', value: `${p.height / 10} m`},
      {label: 'Peso', value: `${p.weight / 10} kg`},
      {label: 'Experiencia base', value: p.base_experience ?? ''},
      {label: 'Legendario', value: s?.is_legendary ? 'Sí' : ''},
      {label: 'Mítico', value: s?.is_mythical ? 'Sí' : ''},
      ...p.stats.map(st => ({
        label: STAT_NAMES[st.stat.name] ?? this.pretty(st.stat.name),
        value: st.base_stat,
      })),
    ].filter(f => f.value !== '');

    const maxMoves = 20;
    const moves = p.moves.map(m => ({name: this.pretty(m.move.name)}));
    if (moves.length > maxMoves) {
      const rest = moves.length - maxMoves;
      moves.splice(maxMoves, rest, {name: `… y ${rest} más`});
    }

    const groups: DetailGroup[] = [
      {
        title: 'Habilidades',
        items: p.abilities.map(a => ({
          name: this.pretty(a.ability.name),
          text: a.is_hidden ? 'Habilidad oculta' : undefined,
        })),
      },
      {title: 'Movimientos', items: moves},
    ].filter(g => g.items.length > 0);

    const description = this.byLanguage(s?.flavor_text_entries)?.flavor_text.replace(/[\n\f]/g, ' ');

    return {
      id: p.id,
      name: this.pretty(p.name),
      image: p.sprites.other?.['official-artwork']?.front_default ?? p.sprites.front_default ?? this.artwork(p.id),
      description,
      fields,
      groups,
      relations: [],
    };
  }

  private artwork(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  private idFromUrl(url: string): number {
    return Number(url.split('/').filter(Boolean).pop());
  }

  /** "mr-mime" → "Mr Mime" */
  private pretty(name: string): string {
    return name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  /** Prefiere el texto en español; si no existe, en inglés. Toma la entrada más reciente. */
  private byLanguage<T extends { language: { name: string } }>(list?: T[]): T | undefined {
    if (!list) return undefined;
    const es = list.filter(x => x.language.name === 'es');
    const en = list.filter(x => x.language.name === 'en');
    return (es.length ? es : en).at(-1);
  }
}