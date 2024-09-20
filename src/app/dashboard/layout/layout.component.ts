import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '@/shared/services/Theme/theme-service.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  private _themeService = inject(ThemeService);
  isDark = this._themeService.isDark;
  loading = signal(true);
}
