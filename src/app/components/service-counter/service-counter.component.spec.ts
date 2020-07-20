import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { CounterService } from '../../services/counter.service';
import { click, expectText, setFieldValue } from '../../spec-helpers/element.spec-helper';
import { ServiceCounterComponent } from './service-counter.component';

const count = 123;
const newCount = 456;

type PartialCounterService = Pick<CounterService, keyof CounterService>;

const mockCounterService: PartialCounterService = {
  getCount(): Observable<number> {
    return of(count);
  },
  increment(): void {},
  decrement(): void {},
  reset(): void {},
};

describe('ServiceCounterComponent', () => {
  let fixture: ComponentFixture<ServiceCounterComponent>;

  beforeEach(async(() => {
    spyOn(mockCounterService, 'getCount').and.callThrough();
    spyOn(mockCounterService, 'increment');
    spyOn(mockCounterService, 'decrement');
    spyOn(mockCounterService, 'reset');

    TestBed.configureTestingModule({
      declarations: [ServiceCounterComponent],
      providers: [{ provide: CounterService, useValue: mockCounterService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceCounterComponent);
    fixture.detectChanges();
  });

  it('shows the count', () => {
    expectText(fixture, 'count', String(count));
    expect(mockCounterService.getCount).toHaveBeenCalled();
  });

  it('increments the count', () => {
    click(fixture, 'increment-button');
    expect(mockCounterService.increment).toHaveBeenCalled();
  });

  it('decrements the count', () => {
    click(fixture, 'decrement-button');
    expect(mockCounterService.decrement).toHaveBeenCalled();
  });

  it('resets the count', () => {
    setFieldValue(fixture, 'reset-input', String(newCount));
    click(fixture, 'reset-button');
    expect(mockCounterService.reset).toHaveBeenCalledWith(newCount);
  });
});