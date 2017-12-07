import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaPageComponent } from './textarea-page.component';

describe('TextareaPageComponent', () => {
  let component: TextareaPageComponent;
  let fixture: ComponentFixture<TextareaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
