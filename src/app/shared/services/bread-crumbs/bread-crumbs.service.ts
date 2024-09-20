import { Injectable, inject, signal, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadCrumbsService implements OnDestroy{
  private router = inject(Router);
  private subscriptionRoute!: Subscription;
  breadcrumbs = signal<string[]>([]);

  constructor(){
    this.subscriptionRoute = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs.update( listOld => [...event.urlAfterRedirects.split('/').filter( v => v.length) ]);
      }
    });

  }
  ngOnDestroy(): void {
    this.subscriptionRoute.unsubscribe()
  }
}
