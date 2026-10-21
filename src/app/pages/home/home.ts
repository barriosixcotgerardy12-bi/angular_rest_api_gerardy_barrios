import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardImage, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardActions, MatCardImage],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  universes = [
    {path: '/digimon', name: 'Digimon', image: 'images/digimon.jpg',
      description: 'Monstruos digitales que evolucionan junto a sus compañeros humanos.'},
    {path: '/dragon-ball', name: 'Dragon Ball Z', image: 'images/dbz.jpg',
      description: 'Guerreros Saiyajin, transformaciones y combates que sacuden el universo.'},
    {path: '/pokemon', name: 'Pokémon', image: 'images/pokemon.jpg',
      description: 'Criaturas de todos los tipos para capturar, entrenar y coleccionar.'},
    {path: '/demon-slayer', name: 'Demon Slayer', image: 'images/demon-slayer.jpg',
      description: 'Cazadores de demonios y sus estilos de respiración.'},
  ];
}
