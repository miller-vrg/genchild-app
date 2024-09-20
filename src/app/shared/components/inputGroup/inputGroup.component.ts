import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'inputGroup',
  templateUrl: './inputGroup.component.html',
  styleUrl: './inputGroup.component.scss'
})
export class InputGroupComponent {
@Input() placeholder: string='';
@Input() name: string='';
@Input() label: string='';
@Input() type: 'number'| 'text'| 'email'|'password' | 'file'='text';
@Input() data = signal<any>({})
disabled = input<boolean>(false);

onChange(value:string){
  this.data.update( dataOld => ({
    ...this.data(),
    [this.name] : value
  }))
}
}
