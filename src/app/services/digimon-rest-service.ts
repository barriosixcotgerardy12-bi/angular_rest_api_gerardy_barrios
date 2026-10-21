import {computed, Injectable, signal} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {CharacterModel} from '../interfaces/character-model';
import {DigimonListResponse} from '../interfaces/digimon-response';

@Injectable({providedIn: 'root'})
export class DigimonRestService {

  pageIndex = signal<number>(0);
  pageSize = signal<number>(12);

  dataList = httpResource<DigimonListResponse>(
    () => `https://digi-api.com/api/v1/digimon?page=${this.pageIndex()}&pageSize=${this.pageSize()}`
  );

  /** La respuesta de la API se convierte al modelo común que entiende la tarjeta */
  characters = computed<CharacterModel[]>(() =>
    (this.dataList.value()?.content ?? []).map(d => ({id: d.id, name: d.name, img: d.image}))
  );

  total = computed(() => this.dataList.value()?.pageable.totalElements ?? 0);
}
