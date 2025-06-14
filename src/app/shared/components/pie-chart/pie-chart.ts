import { Component } from '@angular/core';
import { Color, LegendPosition, PieChartModule, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [PieChartModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.scss'
})
export class PieChart {
  single: any[] = [
    {
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    }
  ];
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

  getTotal(): number {
    return this.single.reduce((acc, item) => acc + item.value, 0);
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
