import { Component } from '@angular/core';
import { BarChartModule, Color, ColorHelper, LegendComponent, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BarChartModule,],
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss'
})
export class BarChart {
  view: [number, number] = [700, 250];
  groupedBarData = [
    {
      name: 'Product A',
      series: [
        { name: '2020', value: 300 },
        { name: '2021', value: 400 }
      ]
    },
    {
      name: 'Product B',
      series: [
        { name: '2020', value: 270 },
        { name: '2021', value: 350 }
      ]
    },
    {
      name: 'Product C',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product D',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product E',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product F',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product G',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product H',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product I',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
  ];



  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Population';
  legendTitle: string = 'Years';

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  }
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  colorHelper = new ColorHelper(this.colorScheme, ScaleType.Ordinal, this.groupedBarData[0].series.map(d => d.name), null);

  getColor(name: string): string {
    return this.colorHelper.getColor(name);
  }

}
