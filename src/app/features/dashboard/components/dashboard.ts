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
import { AdvancePieChartComponent } from '../../../shared/components/advance-pie-chart/advance-pie-chart.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [BsDropdownModule, Tile,
    ActiveIntegrations, FormsModule,
    PieChart, BarChartStacked,
    Dropdown, AdvancePieChartComponent, NgClass],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  tiles: ISummaryTile[] = DashboardConstants.SummaryTiles;
  dashboardService = inject(DashboardService);
  summary!: ISummary;
  selectedYear: IDropdownItem = CommonUtility.getYear(new Date().getFullYear());
  selectedMonth: IDropdownItem = CommonUtility.getMonth(-1); //new Date().getMonth() + 1
  yearDropdownItems = SharedConstants.YearDropdownItems;
  monthDropdownItems = SharedConstants.MonthDropdownItems;
  employeeDropdownItems: IDropdownItem[] = [];
  selectedEmployee: IDropdownItem = { label: 'All', value: -1 };
  sredVsRegular: IChartSeriesRecord[] = [];
  pieChartPercent: number = 0;
  projectsBarChartData: IChartSeriesGroupedRecord[] = [];
  hoursBarChartData: IChartSeriesGroupedRecord[] = [];
  hoursPieChartData: IChartSeriesRecord[] = [];
  isTimesheetSummaryEnabled = false;
  projectBarColors: string[] = ['#5AA454','#2f51a9','#C7B42C', '#A10A28' ];

  ngOnInit() {
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.employeeDropdownItems = this.getEmployeeDropdownItems(data.employees);
      this.fetchSummaries();
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

  timesheetSwitchChange() {
    if (this.isTimesheetSummaryEnabled) {
      this.getTimesheetsChartsData();
    } else {
      this.getHoursChartsData();
    }
  }

  fetchSummaries() {
    this.summary = this.dashboardService.getSummary(this.selectedYear.value, this.selectedMonth.value, +this.selectedEmployee.value);
    this.setSummaryTileValues();
    this.getPieChartData();
    this.getProjectBarChartData();
    if (this.isTimesheetSummaryEnabled) {
      this.getTimesheetsChartsData();
    } else {
      this.getHoursChartsData();
    }
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
    this.projectsBarChartData = result;
  }

  getHoursChartsData() {
    const result: IChartSeriesGroupedRecord[] = [];
    SharedConstants.MonthDropdownItems.forEach((month) => {
      if (Number(month.value) > -1) {
        const employeeHours = this.summary.employeeHours.filter((x) => x.month === month.value);
        const totalExpectedHours = employeeHours.reduce((sum, et) => sum + et.totalExpectedHours, 0);

        const sredtracked = employeeHours.reduce((sum, et) => sum + et.sredHours, 0);
        const regulartracked = employeeHours.reduce((sum, et) => sum + et.regularHours, 0);
        const series = [
          { name: 'SRED', value: sredtracked },
          { name: 'Regular', value: regulartracked },
          { name: 'Missing', value: totalExpectedHours - (sredtracked + regulartracked) },
        ];
        if (month.value === this.selectedMonth.value) {
          this.hoursPieChartData = series;
        }
        result.push({
          name: CommonUtility.getMonth(Number(month.value)).label, series: series
        })
      }

    })
    this.hoursBarChartData = result;
  }
  getTimesheetsChartsData() {
    const result: IChartSeriesGroupedRecord[] = [];
    SharedConstants.MonthDropdownItems.forEach((month) => {
      if (Number(month.value) > -1) {
        const employeeTimesheets = this.summary.employeeTimesheets.filter((x) => x.month === month.value);
        const trackedTimesheets = employeeTimesheets.reduce((sum, et) => sum + et.trackedTimesheet, 0);
        const missing = employeeTimesheets.reduce((sum, et) => sum + et.missingTimesheet, 0);
        const series = [
          { name: 'Tracked', value: trackedTimesheets },
          { name: 'Missing', value: missing },
        ];
        if (month.value === this.selectedMonth.value) {
          this.hoursPieChartData = series;
        }
        result.push({
          name: CommonUtility.getMonth(Number(month.value)).label, series: series
        })
      }
    })
    this.hoursBarChartData = result;
  }
}
