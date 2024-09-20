import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared/modules/shared/shared.module';
@Component({
  selector: 'nosotros',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.scss'
})
export class NosotrosComponent {
  @Input() showModal = signal<boolean>(false);
  @Input() isShow = signal<boolean>(false);

  closed(){
    this.showModal.update( dataOld => false);
  }


  open() {
    this.showModal.update( valueOld => !valueOld);
  }
}
