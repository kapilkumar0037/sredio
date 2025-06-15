import { Component, inject } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CircleProgress } from '../../../shared/components/circle-progress/circle-progress';
import { Tile } from '../../../shared/components/tile/tile';
import { IChartSeriesGroupedRecord, IChartSeriesRecord, IDropdownItem, ISummaryTile } from '../../../shared/models/general.models';
import { DashboardConstants } from '../constants/general.constants';
import { ActiveIntegrations } from './active-integrations/active-integrations';
import { EmployeeList } from './employee-list/employee-list';
import { DashboardService } from '../services/dashboard';
import { IEmployee, ISummary } from '../models/general.models';
import { TilesEnum } from '../enums/general.enums';
import { FormsModule } from '@angular/forms';
import { PieChart } from '../../../shared/components/pie-chart/pie-chart';
import { BarChart } from '../../../shared/components/bar-chart/bar-chart';
import { Dropdown } from '../../../shared/controls/dropdown/dropdown';
import { SharedConstants } from '../../../shared/constants/general.constants';
import { CommonUtility } from '../../../shared/utils/common';
import { BarChartStacked } from '../../../shared/components/bar-chart-stacked/bar-chart-stacked';

@Component({
  selector: 'app-dashboard',
  imports: [BsDropdownModule, Tile, ActiveIntegrations, FormsModule, PieChart, BarChartStacked, Dropdown],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  tiles: ISummaryTile[] = DashboardConstants.SummaryTiles;
  dashboardService = inject(DashboardService);
  summary!: ISummary;
  selectedYear: IDropdownItem = CommonUtility.getYear(new Date().getFullYear());
  selectedMonth: IDropdownItem = CommonUtility.getMonth(new Date().getMonth() + 1);
  yearDropdownItems = SharedConstants.YearDropdownItems;
  monthDropdownItems = SharedConstants.MonthDropdownItems;
  employeeDropdownItems: IDropdownItem[] = [];
  selectedEmployee: IDropdownItem = { label: 'All', value: -1 };
  sredVsRegular: IChartSeriesRecord[] = [];
  pieChartPercent: number = 0;
  projectsBarChartData: IChartSeriesGroupedRecord[] = [];
  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.employeeDropdownItems = this.getEmployeeDropdownItems(data.employees);
      this.fetchSummaries();
      console.log(data);
    });
  }


  changeEmployee(employee: IDropdownItem) {
    this.selectedEmployee = employee;
    this.fetchSummaries();
  }

  changeYear(year: IDropdownItem) {
    this.selectedYear = year;
    this.fetchSummaries();
  }

  monthChanged(_selectedMonth: IDropdownItem) {
    this.selectedMonth = _selectedMonth;
    this.fetchSummaries();
  }
  yearChanged(_selectedYear: IDropdownItem) {
    this.selectedYear = _selectedYear;
    this.fetchSummaries();
  }

  fetchSummaries() {
    this.summary = this.dashboardService.getSummary(this.selectedYear.value, this.selectedMonth.value, +this.selectedEmployee.value);
    this.setSummaryTileValues();
    this.getPieChartData();
    this.getProjectBarChartData();
  }

  getPieChartData() {
    this.sredVsRegular = [
      {
        name: 'SRED Hours',
        value: this.summary.totalSredHoursTracked
      },
      {
        name: 'Regular Hours',
        value: this.summary.totalTrackedHours - this.summary.totalSredHoursTracked
      }
    ]
    this.pieChartPercent = Math.round(this.summary.totalSredHoursTracked / (this.summary.totalTrackedHours - this.summary.totalSredHoursTracked) * 100);
  }

  setSummaryTileValues() {
    this.tiles.forEach(tile => {
      switch (tile.key) {
        case TilesEnum.HOURS:
          tile.progress = this.summary.totalTrackedPercent;
          tile.description = 'Tracked Hours ' + this.summary.totalTrackedHours + '/' + this.summary.totalExpectedHours;
          break;
        case TilesEnum.TIMESHEETS:
          tile.progress = this.summary.timesheetTrackedPercent;
          tile.description = 'Created Timesheets ' + this.summary.trackedTimesheets + '/' + this.summary.expctedTimesheets;
          break;
        case TilesEnum.SRED:
          tile.progress = this.summary.totalSredTrackedPercent;
          tile.description = 'Tracked Hours ' + this.summary.totalSredHoursTracked + '/' + this.summary.totalSredHoursExpected;
          break;
        case TilesEnum.PROJECTHOURS:
          tile.progress = this.summary.projectConsumedPercent;
          tile.description = 'Consumed ' + this.summary.totalProjectConsumed + '/' + this.summary.totalProjectAllocation;
          break;
      }
    });
  }


  getEmployeeDropdownItems(employees: IEmployee[]) {
    return employees.map(employee => ({
      label: employee.name,
      value: employee.id
    }));
  }

  getProjectBarChartData() {
    const result: IChartSeriesGroupedRecord[] = [];
    SharedConstants.projectNames.forEach((pname) => {
      const projectData = this.summary.projects.filter((x) => x.projectName === pname);
      const totalProjectAllocation = projectData.reduce((sum, et) => sum + et.hoursAllocated, 0);
      const totalProjectConsumed = projectData.reduce((sum, et) => sum + et.hoursConsumed, 0);
      result.push({
        name: pname, series: [
          { name: 'Allocated', value: totalProjectAllocation },
          { name: 'Consumed', value: totalProjectConsumed }
        ]
      })
    })
    console.log(result);
    this.projectsBarChartData = result;
  }

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
    {
      name: 'Product J',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
    {
      name: 'Product K',
      series: [
        { name: '2020', value: 250 },
        { name: '2021', value: 300 }
      ]
    },
  ];

}
