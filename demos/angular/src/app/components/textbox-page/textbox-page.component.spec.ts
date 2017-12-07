import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxPageComponent } from './textbox-page.component';

describe('InputboxPageComponent', () => {
  let component: TextboxPageComponent;
  let fixture: ComponentFixture<TextboxPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
