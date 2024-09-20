import { AlertService } from '@/shared/services/alert/alert.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  private readonly alertService = inject(AlertService);
  alerts = this.alertService.alerts;

  remove(index: number) {
     this.alertService.removeAlert(index);
  }
}

