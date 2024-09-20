import { Component, Input, signal, output, input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() isShow = signal<boolean>(false);
  opacidad = input<boolean>(false);
  zindex = input<string>('z-10');

  closeModal() {
    this.isShow.update( valueOld => false);
  }

  submitSelection() {
    this.closeModal();
  }
}
