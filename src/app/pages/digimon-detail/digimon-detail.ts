import {Component, computed, effect, inject, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DigimonRestService} from '../../services/digimon-rest-service';
import {DigimonDetailResponse} from '../../interfaces/digimon-detail-response';
import {CharacterDetailView} from '../../components/character-detail-view/character-detail-view';

@Component({
  selector: 'app-digimon-detail',
  imports: [CharacterDetailView, MatProgressSpinner, MatButton, MatIcon],
  templateUrl: './digimon-detail.html',
  styleUrl: './digimon-detail.css',
})
export class DigimonDetail {
  id = input.required<string>();   // viene del :id de la ruta

  private service = inject(DigimonRestService);
  private snack = inject(MatSnackBar);

  resource = httpResource<DigimonDetailResponse>(() => this.service.detailUrl(this.id()));

  detail = computed(() => {
    const value = this.resource.value();
    return value ? this.service.toDetail(value) : null;
  });

  constructor() {
    effect(() => {
      if (this.resource.error()) {
        this.snack.open('No se pudo cargar el detalle del Digimon.', 'Cerrar', {duration: 4000});
      }
    });
  }
}

