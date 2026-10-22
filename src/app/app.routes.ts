import {Routes} from '@angular/router';
import {Home} from './pages/home/home';
import {DigimonList} from './pages/digimon-list/digimon-list';
import {DigimonDetail} from './pages/digimon-detail/digimon-detail';
import {DbzCharactersList} from './pages/dbz-characters-list/dbz-characters-list';
import {DbzDetail} from './pages/dbz-detail/dbz-detail';
import {PokemonList} from './pages/pokemon-list/pokemon-list';
import {PokemonDetail} from './pages/pokemon-detail/pokemon-detail';
import {DemonSlayerCharactersList} from './pages/demon-slayer-characters-list/demon-slayer-characters-list';

export const routes: Routes = [
  {path: '', component: Home, title: 'Inicio'},
  {path: 'digimon', component: DigimonList, title: 'Digimon'},
  {path: 'digimon/:id', component: DigimonDetail, title: 'Detalle Digimon'},
  {path: 'dragon-ball', component: DbzCharactersList, title: 'Dragon Ball Z'},
  {path: 'dragon-ball/:id', component: DbzDetail, title: 'Detalle Dragon Ball Z'},
  {path: 'pokemon', component: PokemonList, title: 'Pokémon'},
  {path: 'pokemon/:id', component: PokemonDetail, title: 'Detalle Pokémon'},
  {path: 'demon-slayer', component: DemonSlayerCharactersList, title: 'Demon Slayer'},
  {path: '**', redirectTo: ''},
];