import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherPageComponent } from './switcher-page.component';

describe('SwicherPageComponent', () => {
  let component: SwitcherPageComponent;
  let fixture: ComponentFixture<SwitcherPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitcherPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitcherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
