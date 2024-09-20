import { Component, inject, input } from '@angular/core';
import { ThemeService } from '@/shared/services/Theme/theme-service.service';
import { AuthenticationService } from '@/auth/services/authentication.service';
import { IUsuarioView } from '../../types/interfaces/IUsuarioView';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _themeService = inject(ThemeService);
  private _authService = inject(AuthenticationService);
  user = this._authService.user;
  isDark = this._themeService.isDark;
toggleTheme() {
  this._themeService.setTheme();
}

}
