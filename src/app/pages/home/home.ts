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
    {path: '/digimon', name: 'Digimon',
      image: 'https://digi-api.com/images/digimon/w/Agumon.png',
      description: 'Monstruos digitales que evolucionan junto a sus compañeros humanos.'},
    {path: '/dragon-ball', name: 'Dragon Ball Z',
      image: 'https://dragonball-api.com/characters/goku_normal.webp',
      description: 'Guerreros Saiyajin, transformaciones y combates que sacuden el universo.'},
    {path: '/pokemon', name: 'Pokémon',
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
      description: 'Criaturas de todos los tipos para capturar, entrenar y coleccionar.'},
    {path: '/demon-slayer', name: 'Demon Slayer',
      image: 'https://www.demonslayer-api.com/api/v1/characters/images/1.webp',
      description: 'Cazadores de demonios y sus estilos de respiración.'},
  ];
}
