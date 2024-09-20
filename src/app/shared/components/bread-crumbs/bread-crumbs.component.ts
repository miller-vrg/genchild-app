import { Component, OnInit, computed, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadCrumbsService } from '@/shared/services';

@Component({
  selector: 'bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrl: './bread-crumbs.component.scss'
})
export class BreadCrumbsComponent {
  private breadcrumbService = inject(BreadCrumbsService);
  breadcrumbs = this.breadcrumbService.breadcrumbs;
  sizeBreadcrumbs = computed( () => this.breadcrumbs().length );
}
