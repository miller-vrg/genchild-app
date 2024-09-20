import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'desplegable',
  templateUrl: './desplegable.component.html',
  styleUrls: ['./desplegable.component.scss']
})
export class DesplegableComponent implements OnInit {
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() data = signal<any>({});
  @Input() options: { value: string, name: string }[] = [];
  selectedValue: string = '';

  ngOnInit(): void {
    if (this.options && this.options.length ) this.data()[this.name] =  this.options[0].value;
  }

}
