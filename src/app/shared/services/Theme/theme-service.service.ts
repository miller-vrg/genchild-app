import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  isDark = signal(false);

  constructor(){
    this.isDark.update( valueOld => JSON.parse(localStorage.getItem('dark') ?? 'false'));
  }

  getTheme(): boolean {
    if (localStorage.getItem('dark')) {
      return JSON.parse(localStorage.getItem('dark') || '');
    }
    return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  setTheme(): void {
    this.isDark.update( valueOld => !valueOld );
    localStorage.setItem('dark', JSON.stringify(this.isDark()));
  }
}
