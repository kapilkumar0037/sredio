import { Component, input } from '@angular/core';
import { BarChartModule, Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { IChartSeriesGroupedRecord } from '../../models/general.models';

@Component({
  selector: 'app-bar-chart-stacked',
  imports: [BarChartModule],
  templateUrl: './bar-chart-stacked.html',
  styleUrl: './bar-chart-stacked.scss'
})
export class BarChartStacked {
  view = input<[number, number]>([700, 245]);
  barChartData = input<IChartSeriesGroupedRecord[]>([]);
  colors = input<string[]>([ '#C7B42C', '#2f51a9','#A10A28','#5AA454',  '#AAAAAA']);
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Below;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel = input('');
  showYAxisLabel: boolean = true;
  yAxisLabel= input('');
  legendTitle: string = 'Years';
  animations: boolean = true;
  showDataLabel: boolean = true;


  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: this.colors()
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
