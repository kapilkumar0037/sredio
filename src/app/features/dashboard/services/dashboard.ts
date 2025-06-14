import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api-service';
import { empty, forkJoin, map, Observable } from 'rxjs';
import { IActiveIntegrations, IEmployee, IEmployeeHours, ISummary, IEmployeeTimesheets, IProject } from '../models/general.models';
import { ActiveIntegrations } from '../components/active-integrations/active-integrations';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  apiService = inject(ApiService);
  employees: IEmployee[] = [];
  employeeHours: IEmployeeHours[] = [];
  employeeTimesheets: IEmployeeTimesheets[] = [];
  projects: IProject[] = [];
  employeeSummary: ISummary = {
    employeeHours: [],
    employeeTimesheets: [],
    projects: [],
    totalTrackedHours: 0,
    totalExpectedHours: 0,
    totalTrackedPercent: 0,
    totalSredHoursExpected: 0,
    totalSredHoursTracked: 0,
    totalSredTrackedPercent: 0,
    expctedTimesheets: 0,
    trackedTimesheets: 0,
    timesheetTrackedPercent: 0,
    totalProjectAllocation: 0,
    totalProjectConsumed: 0,
    projectConsumedPercent: 0
  }

  getEmployeeHours(): Observable<IEmployeeHours[]> {
    return this.apiService.employeeHours.get();
  }
  getEmployeeTimesheets(): Observable<IEmployeeTimesheets[]> {
    return this.apiService.employeeTimesheets.get();
  }
  getEmployees(): Observable<IEmployee[]> {
    return this.apiService.employees.get();
  }
  getProjects(): Observable<IProject[]> {
    return this.apiService.projects.get();
  }
  getActiveIntegrations(): Observable<IActiveIntegrations[]> {
    return this.apiService.activeIntegrations.get();
  }

  getDashboardData(): Observable<any> {
    return forkJoin({
      employees: this.getEmployees(),
      employeeHours: this.getEmployeeHours(),
      employeeTimesheets: this.getEmployeeTimesheets(),
      projects: this.getProjects(),
    }).pipe(
      map(({ employees, employeeHours, employeeTimesheets, projects }) => {
        this.employees = employees;
        this.employeeHours = employeeHours;
        this.employeeTimesheets = employeeTimesheets;
        this.projects = projects;
        return {
          employees: this.employees,
          employeeHours: this.employeeHours,
          employeeTimesheets: this.employeeTimesheets,
          projects: this.projects
        };
      }))
  }

  getSummary(year: number | string, month?: number | string,  empId?: number | string): ISummary {
    if(Number(month) > 0 && Number(empId) > 0){
      this.employeeSummary.employeeHours = this.employeeHours.filter(eh => eh.year === year && eh.month === month && eh.employeeId===empId);
      this.employeeSummary.employeeTimesheets = this.employeeTimesheets.filter(et => et.year === year && et.month === month  && et.employeeId===empId);
      this.employeeSummary.projects = this.projects.filter(p => p.year === year && p.month === month);
    }
    else  if(Number(month) < 0 && Number(empId) > 0){
      this.employeeSummary.employeeHours = this.employeeHours.filter(eh => eh.year === year  && eh.employeeId===empId);
      this.employeeSummary.employeeTimesheets = this.employeeTimesheets.filter(et => et.year === year && et.employeeId===empId);
      this.employeeSummary.projects = this.projects.filter(p => p.year === year);
    }
    else if (Number(month) > 0 && Number(empId) < 0) {
      this.employeeSummary.employeeHours = this.employeeHours.filter(eh => eh.year === year && eh.month === month);
      this.employeeSummary.employeeTimesheets = this.employeeTimesheets.filter(et => et.year === year && et.month === month);
      this.employeeSummary.projects = this.projects.filter(p => p.year === year && p.month === month);
    } else {
      this.employeeSummary.employeeHours = this.employeeHours.filter(eh => eh.year === year);
      this.employeeSummary.employeeTimesheets = this.employeeTimesheets.filter(et => et.year === year);
      this.employeeSummary.projects = this.projects.filter(p => p.year === year);
    }

    this.employeeSummary.totalTrackedHours = this.employeeSummary.employeeHours.reduce((sum, eh) => sum + eh.regularHours + eh.sredHours, 0);
    this.employeeSummary.totalExpectedHours = this.employeeSummary.employeeHours.reduce((sum, eh) => sum + eh.totalExpectedHours + eh.expectedSredHours, 0);
    this.employeeSummary.totalTrackedPercent = Math.round(this.employeeSummary.totalTrackedHours / this.employeeSummary.totalExpectedHours * 100);
    this.employeeSummary.totalSredHoursExpected = this.employeeSummary.employeeHours.reduce((sum, et) => sum + et.expectedSredHours, 0);
    this.employeeSummary.totalSredHoursTracked = this.employeeSummary.employeeHours.reduce((sum, et) => sum + et.sredHours, 0);
    this.employeeSummary.totalSredTrackedPercent = Math.round(this.employeeSummary.totalSredHoursTracked / this.employeeSummary.totalSredHoursExpected * 100);

    this.employeeSummary.expctedTimesheets = this.employeeSummary.employeeTimesheets.reduce((sum, et) => sum + et.expectedTimesheet, 0);
    this.employeeSummary.trackedTimesheets = this.employeeSummary.employeeTimesheets.reduce((sum, et) => sum + et.trackedTimesheet, 0);
    this.employeeSummary.timesheetTrackedPercent = Math.round(this.employeeSummary.trackedTimesheets / this.employeeSummary.expctedTimesheets * 100);

    this.employeeSummary.totalProjectAllocation = this.employeeSummary.projects.reduce((sum, et) => sum + et.hoursAllocated, 0);
    this.employeeSummary.totalProjectConsumed = this.employeeSummary.projects.reduce((sum, et) => sum + et.hoursConsumed, 0);
    this.employeeSummary.projectConsumedPercent = Math.round(this.employeeSummary.totalProjectConsumed / this.employeeSummary.totalProjectAllocation * 100);

    return this.employeeSummary;
  }

}
