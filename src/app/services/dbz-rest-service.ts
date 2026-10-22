import {computed, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CharacterModel} from '../interfaces/character-model';
import {CharacterDetail, DetailField, DetailGallery} from '../interfaces/character-detail';
import {DbzListResponse} from '../interfaces/dbz-response';
import {DbzDetailResponse} from '../interfaces/dbz-detail-response';

@Injectable({providedIn: 'root'})
export class DbzRestService {

  pageIndex = signal<number>(0);
  pageSize = signal<number>(12);

  // Esta API pagina desde 1, MatPaginator desde 0: por eso se suma 1
  dataList = httpResource<DbzListResponse>(
    () => `https://dragonball-api.com/api/characters?page=${this.pageIndex() + 1}&limit=${this.pageSize()}`
  );

  /** Modelo común para las tarjetas (sin descripción: en esta API es muy larga) */
  characters = computed<CharacterModel[]>(() =>
    (this.dataList.value()?.items ?? []).map(c => ({id: c.id, name: c.name, img: c.image}))
  );

  total = computed(() => this.dataList.value()?.meta.totalItems ?? 0);

  detailUrl(id: string): string {
    return `https://dragonball-api.com/api/characters/${id}`;
  }

  toDetail(d: DbzDetailResponse): CharacterDetail {
    const fields: DetailField[] = [
      {label: 'Raza', value: d.race ?? ''},
      {label: 'Género', value: d.gender ?? ''},
      {label: 'Afiliación', value: d.affiliation ?? ''},
      {label: 'Ki', value: d.ki ?? ''},
      {label: 'Ki máximo', value: d.maxKi ?? ''},
      {label: 'Planeta de origen', value: d.originPlanet?.name ?? ''},
    ].filter(f => f.value !== '');

    const galleries: DetailGallery[] = [];

    if (d.originPlanet) {
      galleries.push({
        title: 'Planeta de origen',
        items: [{
          name: d.originPlanet.isDestroyed ? `${d.originPlanet.name} (destruido)` : d.originPlanet.name,
          image: d.originPlanet.image,
          text: d.originPlanet.description || undefined,
        }],
      });
    }

    if (d.transformations?.length) {
      galleries.push({
        title: 'Transformaciones',
        items: d.transformations.map(t => ({
          name: t.name,
          image: t.image,
          text: t.ki ? `Ki: ${t.ki}` : undefined,
        })),
      });
    }

    return {
      id: d.id,
      name: d.name,
      image: d.image ?? null,
      description: d.description || undefined,
      fields,
      groups: [],
      relations: [],
      galleries,
    };
  }
}