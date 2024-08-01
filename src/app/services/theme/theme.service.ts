import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode: boolean = false;

  constructor() {
    this.loadTheme();
  }

  public toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('dark-mode', this.isDarkMode ? 'true' : 'false');
  }

  loadTheme(): void {
    const savedTheme = localStorage.getItem('dark-mode');
    this.isDarkMode = savedTheme === 'true';
    this.applyTheme();
  }

  get darkModeEnabled(): boolean {
    return this.isDarkMode;
  }
}
