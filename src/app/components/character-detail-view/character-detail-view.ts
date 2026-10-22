import {Component, inject, input} from '@angular/core';
import {Location} from '@angular/common';
import {RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CharacterDetail} from '../../interfaces/character-detail';
import {ImageDialog} from '../image-dialog/image-dialog';

@Component({
  selector: 'app-character-detail-view',
  imports: [RouterLink, MatButton, MatIcon],
  templateUrl: './character-detail-view.html',
  styleUrl: './character-detail-view.css',
})
export class CharacterDetailView {
  detail = input.required<CharacterDetail>();
  basePath = input<string>('');   // ej. '/digimon', para enlazar las relaciones

  private dialog = inject(MatDialog);
  private location = inject(Location);

  back() {
    this.location.back();
  }

  zoom() {
    const d = this.detail();
    if (d.image) {
      this.dialog.open(ImageDialog, {data: {src: d.image, name: d.name}, maxWidth: '95vw'});
    }
  }
}