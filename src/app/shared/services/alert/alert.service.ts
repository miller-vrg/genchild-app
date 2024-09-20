import { ItemAlert } from '@/shared/types';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts = signal< ItemAlert[] > ([]);
  time: any[] = [];

  constructor() { }

  removeAlert(index: number) {
    const listAlert =  [...this.alerts()];
    listAlert.splice(index, 1);
    this.alerts.update( listAlertOld => [...listAlert] );
  }

  removeLoading() {
    this.alerts().forEach( (a,i) => {
      if( a.class.includes('loading') ) {
        this.removeAlert(i);
      }
     });
  }

  add(alert: ItemAlert):number{
    this.alerts.update( alertsOld => [...alertsOld, alert]);
    if(!alert.class.includes('loading')) this.removeInTime();
    return this.alerts().length - 1;
  }

   removeInTime(){
      setTimeout(() => {
        this.removeAlert(0);
      }, 3000);
  }


}
