import { Meta } from '@/shared/types';
import { Component, computed, effect, input, output, signal } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  meta = input<Meta>();
  pages =  computed( () => Array(this.meta()?.pageCount ?? 1).fill(0).map( (_,i) => i + 1 ) );
  actual =  computed( () => this.meta()?.page ?? 1 );
  pageCount =  computed( () => this.meta()?.pageCount ?? 1);
  isNext = computed( () => this.actual() < this.pageCount());
  isPrev =  computed( () => this.actual() > 1 );
  eventPage = output<number>();


  prev() {
    this.eventPage.emit((this.actual() - 1) === 0 ? 1 : this.actual() - 1 );
  }
  next() {
    const size = this.pages().length;
    this.eventPage.emit((this.actual() + 1 ) > size ? size : this.actual() + 1)
  }

}
