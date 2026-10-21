import {Component, inject} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {ThemeService} from './services/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbar, MatButton, MatIconButton,
    MatIcon, MatMenu, MatMenuItem, MatMenuTrigger],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  theme = inject(ThemeService);
  links = [
    {path: '/', label: 'Home'},
    {path: '/digimon', label: 'Digimon'},
    {path: '/dragon-ball', label: 'Dragon Ball Z'},
    {path: '/pokemon', label: 'Pokémon'},
    {path: '/demon-slayer', label: 'Demon Slayer'},
  ];
}