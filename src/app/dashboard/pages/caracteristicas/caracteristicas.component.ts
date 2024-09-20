import { SharedModule } from '@/shared/modules/shared/shared.module';
import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'page-caracteristicas',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss']
})
export class CaracteristicasComponent {
  @Input() label: string='';
  @Input() isChecked: boolean= false;
  @Output() isCheckedChange = new EventEmitter<boolean>();

  onCheckboxChange(event: any) {
    this.isChecked = event.target.checked;
    this.isCheckedChange.emit(this.isChecked);
  }
}
