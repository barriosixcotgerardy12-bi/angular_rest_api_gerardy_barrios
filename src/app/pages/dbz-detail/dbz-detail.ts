import {Component, computed, effect, inject, input} from '@angular/core';
import {httpResource} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DbzRestService} from '../../services/dbz-rest-service';
import {DbzDetailResponse} from '../../interfaces/dbz-detail-response';
import {CharacterDetailView} from '../../components/character-detail-view/character-detail-view';

@Component({
  selector: 'app-dbz-detail',
  imports: [CharacterDetailView, MatProgressSpinner, MatButton, MatIcon],
  templateUrl: './dbz-detail.html',
  styleUrl: './dbz-detail.css',
})
export class DbzDetail {
  id = input.required<string>();

  private service = inject(DbzRestService);
  private snack = inject(MatSnackBar);

  resource = httpResource<DbzDetailResponse>(() => this.service.detailUrl(this.id()));

  detail = computed(() => {
    const value = this.resource.value();
    return value ? this.service.toDetail(value) : null;
  });

  constructor() {
    effect(() => {
      if (this.resource.error()) {
        this.snack.open('No se pudo cargar el detalle del personaje.', 'Cerrar', {duration: 4000});
      }
    });
  }
}