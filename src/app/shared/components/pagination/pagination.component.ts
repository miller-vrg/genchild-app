import { Component, input, output } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  pages =  input<number[]>([]);
  actual =  input<number>(1);
  pageCount =  input<number>(1);
  isNext =  input<boolean>(false);
  isPrev =  input<boolean>(false);
  eventPage = output<number>();

  prev() {
    this.eventPage.emit((this.actual() - 1) === 0 ? 1 : this.actual() - 1 );
  }
  next() {
    const size = this.pages().length;
    this.eventPage.emit((this.actual() + 1 ) > size ? size : this.actual() + 1)
  }

}
