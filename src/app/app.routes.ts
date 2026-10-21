import {Routes} from '@angular/router';
import {DemonSlayerCharactersList} from './pages/demon-slayer-characters-list/demon-slayer-characters-list';
import {DbzCharactersList} from './pages/dbz-characters-list/dbz-characters-list';
import {DigimonList} from './pages/digimon-list/digimon-list';
import {ProductsList} from './pages/products-list/products-list';

export const routes: Routes = [
  {path: '', redirectTo: 'demon-slayer', pathMatch: 'full'},
  {path: "demon-slayer", component: DemonSlayerCharactersList},
  {path: "dragon-ball", component: DbzCharactersList},
  {path: "digimon-list", component: DigimonList},
  {path: "products-list", component: ProductsList}
];
