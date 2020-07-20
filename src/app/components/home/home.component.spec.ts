import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { findComponent } from '../../spec-helpers/element.spec-helper';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('independent counter', () => {
    it('renders an independent counter', () => {
      const el = findComponent(fixture, 'app-counter');
      expect(el).toBeTruthy();
    });

    it('passes a start count', () => {
      const el = findComponent(fixture, 'app-counter');
      expect(el.properties.startCount).toBe(5);
    });

    it('listens for count changes', () => {
      spyOn(console, 'log');
      const el = findComponent(fixture, 'app-counter');
      const count = 5;
      el.triggerEventHandler('countChange', 5);
      expect(console.log).toHaveBeenCalledWith(
        'countChange event from CounterComponent',
        count,
      );
    });
  });

  it('renders a service counter', () => {
    const el = findComponent(fixture, 'app-service-counter');
    expect(el).toBeTruthy();
  });

  it('renders a NgRx counter', () => {
    const el = findComponent(fixture, 'app-ngrx-counter');
    expect(el).toBeTruthy();
  });
});