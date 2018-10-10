import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { findEl, getText } from '../spec-helpers/element.spec-helper';
import { IndependentCounterComponent } from './independent-counter.component';

const startCount = 123;
const newCount = 456;

describe('IndependentCounterComponent', () => {
  let component: IndependentCounterComponent;
  let fixture: ComponentFixture<IndependentCounterComponent>;

  function expectCount(count: number) {
    expect(
      getText(fixture, 'count')
    ).toBe(String(count));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentCounterComponent);
    component = fixture.componentInstance;
    component.startCount = startCount;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('shows the start count', () => {
    expectCount(startCount);
  });

  it('increments the count', () => {
    findEl(fixture, 'increment-button').triggerEventHandler('click', null);
    fixture.detectChanges();
    expectCount(startCount + 1);
  });

  it('decrements the count', () => {
    findEl(fixture, 'decrement-button').triggerEventHandler('click', null);
    fixture.detectChanges();
    expectCount(startCount - 1);
  });

  it('resets the count', () => {
    const input = findEl(fixture, 'reset-input');
    input.nativeElement.value = String(newCount);
    findEl(fixture, 'reset-button').triggerEventHandler('click', null);
    fixture.detectChanges();
    expectCount(newCount);
  });
});
