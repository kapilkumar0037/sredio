import { Component, input } from '@angular/core';
import { Color, LegendPosition, PieChartModule, ScaleType } from '@swimlane/ngx-charts';
import { IChartSeriesRecord } from '../../models/general.models';

@Component({
  selector: 'app-advance-pie-chart',
  imports: [PieChartModule],
  templateUrl: './advance-pie-chart.component.html',
  styleUrl: './advance-pie-chart.component.scss'
})
export class AdvancePieChartComponent {
  pieChartData = input<IChartSeriesRecord[]>([]);
  percent = input<number>(0);
  view: [number, number] = [700, 245];

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
    domain: ['#664d03','#2f51a9','#5AA454', '#A10A28', '#C7B42C',]
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
