import {computed, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CharacterModel} from '../interfaces/character-model';
import {DigimonListResponse} from '../interfaces/digimon-response';
import {CharacterDetail, DetailField, DetailRelationItem} from '../interfaces/character-detail';
import {DigimonDetailResponse, DigimonEvolution} from '../interfaces/digimon-detail-response';

@Injectable({providedIn: 'root'})
export class DigimonRestService {

  pageIndex = signal<number>(0);
  pageSize = signal<number>(12);

  dataList = httpResource<DigimonListResponse>(
    () => `https://digi-api.com/api/v1/digimon?page=${this.pageIndex()}&pageSize=${this.pageSize()}`
  );

  characters = computed<CharacterModel[]>(() =>
    (this.dataList.hasValue() ? this.dataList.value().content : [])
      .map(d => ({id: d.id, name: d.name, img: d.image}))
  );

  total = computed(() => this.dataList.hasValue() ? this.dataList.value().pageable.totalElements : 0);

  detailUrl(id: string): string {
    return `https://digi-api.com/api/v1/digimon/${id}`;
  }

  toDetail(d: DigimonDetailResponse): CharacterDetail {
    const desc =
      d.descriptions.find(x => x.language === 'en_us' && x.description) ??
      d.descriptions.find(x => x.description);

    const fields: DetailField[] = [
      {label: 'Nivel', value: d.levels.map(l => l.level).join(', ')},
      {label: 'Tipo', value: d.types.map(t => t.type).join(', ')},
      {label: 'Atributo', value: d.attributes.map(a => a.attribute).join(', ')},
      {label: 'Lanzamiento', value: d.releaseDate ?? ''},
      {label: 'X-Antibody', value: d.xAntibody ? 'Sí' : ''},
    ].filter(f => f.value !== '');

    const groups = [
      {
        title: 'Habilidades',
        items: d.skills.map(s => ({
          name: s.translation ? `${s.skill} (${s.translation})` : s.skill,
          text: s.description || undefined,
        })),
      },

      {
        title: 'Campos',
        items: d.fields.map(f => ({name: f.field})),
      },
    ].filter(g => g.items.length > 0);

    const relations = [
      {title: 'Evoluciona desde', items: this.mapEvolutions(d.priorEvolutions)},
      {title: 'Evoluciona a', items: this.mapEvolutions(d.nextEvolutions)},
    ].filter(r => r.items.length > 0);

    return {
      id: d.id,
      name: d.name,
      image: d.images[0]?.href ?? null,
      description: desc?.description,
      fields,
      groups,
      relations,
    };
  }

  private mapEvolutions(list: DigimonEvolution[]): DetailRelationItem[] {
    const seen = new Set<number>();
    const result: DetailRelationItem[] = [];
    for (const e of list) {
      if (seen.has(e.id)) continue;
      seen.add(e.id);
      result.push({id: e.id, name: e.digimon, image: e.image, condition: e.condition || undefined});
    }
    return result;
  }
}

