import {Component, effect, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DemonSlayerRestService} from '../../services/demon-slayer-rest-service';
import {CharacterCard} from '../../components/character-card/character-card';
import {ImageDialog} from '../../components/image-dialog/image-dialog';
import {CharacterModel} from '../../interfaces/character-model';

@Component({
  selector: 'app-demon-slayer-characters-list',
  imports: [CharacterCard, MatPaginator, MatProgressSpinner, MatButton, MatIcon],
  templateUrl: './demon-slayer-characters-list.html',
  styleUrl: './demon-slayer-characters-list.css',
})
export class DemonSlayerCharactersList {
  service = inject(DemonSlayerRestService);
  private dialog = inject(MatDialog);
  private router = inject(Router);
  private snack = inject(MatSnackBar);

  constructor() {
    effect(() => {
      if (this.service.dataList.error()) {
        this.snack.open('No se pudo cargar la información de Demon Slayer.', 'Cerrar', {duration: 4000});
      }
    });
  }

  onPage(e: PageEvent) {
    this.service.pageIndex.set(e.pageIndex);
    this.service.pageSize.set(e.pageSize);
  }

  zoom(c: CharacterModel) {
    this.dialog.open(ImageDialog, {data: {src: c.img, name: c.name}, maxWidth: '95vw'});
  }

  openDetail(c: CharacterModel) {
    this.router.navigate(['/demon-slayer', c.id]);
  }
}