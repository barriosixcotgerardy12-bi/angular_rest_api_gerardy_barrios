import {effect, Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ThemeService {
  readonly dark = signal(this.initial());

  constructor() {
    effect(() => {
      const isDark = this.dark();
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  toggle() {
    this.dark.update(v => !v);
  }

  private initial(): boolean {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  }
}