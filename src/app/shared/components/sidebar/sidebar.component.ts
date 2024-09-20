import { Component, inject} from '@angular/core';
import { environment } from '@/environments/environment.development';
import { AuthenticationService } from '@/auth/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private authService = inject(AuthenticationService);
  private isAdmin = this.authService.isAdmin();
  rutaRaiz = environment.rutaRaiz;

  menus: {ruta:string,icon:string,title:string,isVisible: boolean }[]=[
    {
      ruta:`/${this.rutaRaiz}`,
      icon:'dashboard.svg',
      title:'Dashboard',
      isVisible: true
    },
    {
      ruta:'enfermedades',
      icon:'enfermedad.svg',
      title:'Enfermedades',
      isVisible: true
    },
    {
      ruta:'pacientes',
      icon:'registro.svg',
      title:'Pacientes',
      isVisible: true
    },
    {
      ruta:'usuario',
      icon:'registrar.svg',
      title:'Usuarios',
      isVisible: this.isAdmin
    },
    {
      ruta:'examenes',
      icon:'examen.svg',
      title:'Examenes',
      isVisible: true
    },
    {
      ruta:'nosotros',
      icon:'nosotros.svg',
      title:'Nosotros',
      isVisible: true
    }
  ]


  logaut(){
    this.authService.logaout();
  }
}
