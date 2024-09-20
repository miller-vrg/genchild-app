import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as sharedComponet from '@/shared/components';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    sharedComponet.AlertComponent,
    sharedComponet.BreadCrumbsComponent,
    sharedComponet.HeaderComponent,
    sharedComponet.InputGroupComponent,
    sharedComponet.LoadingComponent,
    sharedComponet.ModalComponent,
    sharedComponet.StatisticsComponent,
    sharedComponet.ResultadoComponent,
    sharedComponet.SearchComponent,
    sharedComponet.PaginationComponent,
    sharedComponet.TextareagroupComponent,
    sharedComponet.SidebarComponent,
    sharedComponet.DesplegableComponent,
    sharedComponet.CaracteristicasVE,
    sharedComponet.TablaDiagnosticoComponent,
    sharedComponet.TableAccionComponent,
    sharedComponet.InfoUsuariosComponent,
    sharedComponet.ModalDiagnosticoComponent
], imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports:[
    sharedComponet.AlertComponent,
    sharedComponet.BreadCrumbsComponent,
    sharedComponet.HeaderComponent,
    sharedComponet.InputGroupComponent,
    sharedComponet.LoadingComponent,
    sharedComponet.ModalComponent,
    sharedComponet.StatisticsComponent,
    sharedComponet.ResultadoComponent,
    sharedComponet.SearchComponent,
    sharedComponet.PaginationComponent,
    sharedComponet.TextareagroupComponent,
    sharedComponet.SidebarComponent,
    sharedComponet.DesplegableComponent,
    sharedComponet.CaracteristicasVE,
    sharedComponet.TablaDiagnosticoComponent,
    sharedComponet.TableAccionComponent,
    sharedComponet.InfoUsuariosComponent,
    sharedComponet.ModalDiagnosticoComponent
  ]
})
export class SharedModule { }

