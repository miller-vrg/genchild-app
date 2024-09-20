import { SharedModule } from '@/shared/modules/shared/shared.module';
import { IEnfermedad } from '@/shared/types';
import { CommonModule } from '@angular/common';
import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'detalles-enfermedad-ve',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './detalles-enfermedad-ve.component.html',
  styleUrl: './detalles-enfermedad-ve.component.scss'
})
export class DetallesEnfermedadVEComponent {

  @Input() isShow = signal<boolean>(false);
  enfermedad = input<IEnfermedad>();

  closed() {
    this.isShow.update(valueOld => false);
  }
}
