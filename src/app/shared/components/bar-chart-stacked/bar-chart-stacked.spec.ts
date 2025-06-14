import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartStacked } from './bar-chart-stacked';

describe('BarChartStacked', () => {
  let component: BarChartStacked;
  let fixture: ComponentFixture<BarChartStacked>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarChartStacked]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarChartStacked);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
