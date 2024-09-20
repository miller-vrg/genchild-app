import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareagroupComponent } from './textareagroup.component';

describe('TextareagroupComponent', () => {
  let component: TextareagroupComponent;
  let fixture: ComponentFixture<TextareagroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareagroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextareagroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
