import { Component, inject, input } from '@angular/core';
import { Color, LegendPosition, PieChartModule, ScaleType } from '@swimlane/ngx-charts';
import { IChartSeriesRecord } from '../../models/general.models';

@Component({
  selector: 'app-pie-chart',
  imports: [PieChartModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.scss'
})
export class PieChart {
  pieChartData = input<IChartSeriesRecord[]>([]);
  percent = input<number>(0);
  view: [number, number] = [250, 200];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color={
    name: 'cool',
    selectable: true, 
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }

  getPercent(): number {
    return this.pieChartData().reduce((acc, item) => acc + item.value, 0);
  }
 

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
