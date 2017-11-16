import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationIconPageComponent } from './notification-icon-page.component';

describe('NotificationIconPageComponent', () => {
  let component: NotificationIconPageComponent;
  let fixture: ComponentFixture<NotificationIconPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationIconPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationIconPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
