import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {DemonSlayerCharactersList} from './pages/demon-slayer-characters-list/demon-slayer-characters-list';
import {DbzCharactersList} from './pages/dbz-characters-list/dbz-characters-list';
import {DigimonList} from './pages/digimon-list/digimon-list';

export const routes: Routes = [
  {path: '', component: Home, title: 'Inicio'},
  {path: 'digimon', component: DigimonList, title: 'Digimon'},
  {path: 'dragon-ball', component: DbzCharactersList, title: 'Dragon Ball Z'},
  // {path: 'pokemon', component: PokemonList, title: 'Pokémon'},   // se activa en el commit de Pokémon
  {path: 'demon-slayer', component: DemonSlayerCharactersList, title: 'Demon Slayer'},
  {path: '**', redirectTo: ''},
];