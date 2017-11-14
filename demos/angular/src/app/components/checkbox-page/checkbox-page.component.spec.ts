import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownsPageComponent } from './checkbox.component';

describe('DropdownsPageComponent', () => {
  let component: DropdownsPageComponent;
  let fixture: ComponentFixture<DropdownsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
