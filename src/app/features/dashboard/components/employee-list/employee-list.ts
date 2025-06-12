import { Component, inject } from '@angular/core';
import { IEmployee } from '../../models/general.models';
import { Observable } from 'rxjs';
import { Dashboard } from '../../services/dashboard';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  imports: [AsyncPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeList {
  dashboardService = inject(Dashboard);
  employeeList$: Observable<IEmployee[]> = this.dashboardService.getEmployees();
}
