import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { authenticateGuard } from '@/auth/guards/authenticate.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authenticateGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
      },
      {
        path: 'enfermedades',
        loadComponent: () => import('./pages/enfermedades/enfermedades.component').then(c => c.EnfermedadesComponent)
      },
      {
        path: 'caracteristicas',
        loadComponent: () => import('./pages/caracteristicas/caracteristicas.component')
          .then(c => c.CaracteristicasComponent)
      },
      {
        path: 'usuario',
        loadComponent: () => import('./pages/usuario/usuario.component')
          .then(c => c.RegistrarUsuarioComponent)
      },
      {
        path: 'pacientes',
        children:[
          {
            path: ':id',
            loadComponent: () => import('./pages/info-paciente/info-paciente.component')
            .then(c => c.InfoPacienteComponent)
          },
          {
            path: '',
            loadComponent: () => import('./pages/Paciente/paciente.component')
            .then( c => c.PacienteComponent)
          }
        ]
      },
      {
        path: 'examenes',
        loadComponent: () => import('./pages/examenes/examenes.component')
          .then(c => c.ExamenesComponent)
      },
      {
        path: 'nosotros',
        loadComponent: () => import('./pages/nosotros/nosotros.component')
          .then(c => c.NosotrosComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
