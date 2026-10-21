import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

export interface ImageDialogData {
  src: string;
  name: string;
}

@Component({
  selector: 'app-image-dialog',
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton],
  template: `
    <h2 mat-dialog-title>{{ data.name }}</h2>
    <mat-dialog-content>
      <img [src]="data.src" [alt]="data.name">
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: `img { display: block; margin: auto; max-width: 100%; max-height: 70vh; object-fit: contain; }`,
})
export class ImageDialog {
  data = inject<ImageDialogData>(MAT_DIALOG_DATA);
}