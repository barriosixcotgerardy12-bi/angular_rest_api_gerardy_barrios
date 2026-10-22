import {computed, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CharacterModel} from '../interfaces/character-model';
import {CharacterDetail, DetailField, DetailGallery, DetailGroup} from '../interfaces/character-detail';
import {DemonSlayerDetailItem, DemonSlayerListResponse} from '../interfaces/demon-slayer-response';

const BASE = 'https://www.demonslayer-api.com';

@Injectable({providedIn: 'root'})
export class DemonSlayerRestService {

  pageIndex = signal<number>(0);
  pageSize = signal<number>(12);

  // Esta API pagina desde 1, MatPaginator desde 0: por eso se suma 1
  dataList = httpResource<DemonSlayerListResponse>(
    () => `${BASE}/api/v1/characters?page=${this.pageIndex() + 1}&limit=${this.pageSize()}`
  );

  /** Modelo común para las tarjetas (la API llama "img" a la imagen) */
  characters = computed<CharacterModel[]>(() =>
    (this.dataList.hasValue() ? this.dataList.value().content : [])
      .map(c => ({id: c.id, name: c.name, img: c.img}))
  );

  total = computed(() => this.dataList.hasValue() ? this.dataList.value().pagination.totalElements : 0);

  // Esta API no tiene /characters/{id}: el personaje se pide con ?id= y llega dentro de "content"
  detailUrl(id: string): string {
    return `${BASE}/api/v1/characters?id=${id}`;
  }

  toDetail(d: DemonSlayerDetailItem): CharacterDetail {
    const fields: DetailField[] = [
      {label: 'Edad', value: d.age ?? ''},
      {label: 'Género', value: d.gender ?? ''},
      {label: 'Raza', value: d.race ?? ''},
    ].filter(f => f.value !== '');

    const groups: DetailGroup[] = [
      {
        title: 'Afiliación',
        items: d.affiliation?.name
          ? [{name: d.affiliation.name, text: d.affiliation.description ? this.clean(d.affiliation.description) : undefined}]
          : [],
      },
      {
        title: 'Primera aparición',
        items: d.first_arc_appearance?.name
          ? [{name: d.first_arc_appearance.name, text: d.first_arc_appearance.description ? this.clean(d.first_arc_appearance.description) : undefined}]
          : [],
      },
      {
        title: 'Frase memorable',
        items: d.quote ? [{name: `“${this.clean(d.quote)}”`}] : [],
      },
    ].filter(g => g.items.length > 0);

    const galleries: DetailGallery[] = [];
    if (d.combat_style?.length) {
      galleries.push({
        title: 'Estilos de combate',
        items: d.combat_style.map(s => ({
          name: s.name,
          image: s.img,
          text: s.description ? this.clean(s.description) : undefined,
        })),
      });
    }

    return {
      id: d.id,
      name: d.name,
      image: d.img ?? null,
      description: d.description ? this.clean(d.description) : undefined,
      fields,
      groups,
      relations: [],
      galleries,
    };
  }

  /** La API usa "´" en lugar de "'" en sus textos */
  private clean(text: string): string {
    return text.replace(/´/g, '’');
  }
}