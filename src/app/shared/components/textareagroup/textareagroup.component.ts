import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'textareaGroup',
  templateUrl: './textareagroup.component.html',
  styleUrl: './textareagroup.component.scss'
})
export class TextareagroupComponent {
  @Input() placeholder: string='';
  @Input() name: string='';
  @Input() label: string='';
  @Input() data = signal<any>({})
  maxHeig = input<string>('')

onChange(value:string){
  this.data.update( dataOld => ({
    ...this.data(),
    [this.name] : value
  }))
}
}

