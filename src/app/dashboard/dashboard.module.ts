import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../shared/modules/shared/shared.module';
import { interceptorInterceptor } from '@/shared/interceptor/interceptor.interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ],
  providers: [
    provideHttpClient( withInterceptors([interceptorInterceptor]) )
  ]
})
export class DashboardModule { }
