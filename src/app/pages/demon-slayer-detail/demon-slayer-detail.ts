import {Component, computed, effect, inject, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DemonSlayerRestService} from '../../services/demon-slayer-rest-service';
import {DemonSlayerDetailResponse} from '../../interfaces/demon-slayer-response';
import {CharacterDetailView} from '../../components/character-detail-view/character-detail-view';

@Component({
  selector: 'app-demon-slayer-detail',
  imports: [CharacterDetailView, MatProgressSpinner, MatButton, MatIcon],
  templateUrl: './demon-slayer-detail.html',
  styleUrl: './demon-slayer-detail.css',
})
export class DemonSlayerDetail {
  id = input.required<string>();

  private service = inject(DemonSlayerRestService);
  private snack = inject(MatSnackBar);

  resource = httpResource<DemonSlayerDetailResponse>(() => this.service.detailUrl(this.id()));

  // La API devuelve una lista; el personaje pedido es el primer elemento
  detail = computed(() => {
    if (!this.resource.hasValue()) return null;
    const item = this.resource.value().content[0];
    return item ? this.service.toDetail(item) : null;
  });

  constructor() {
    effect(() => {
      if (this.resource.error()) {
        this.snack.open('No se pudo cargar el detalle del personaje.', 'Cerrar', {duration: 4000});
      }
    });
  }
}