import { Component } from '@angular/core';
import { IEmployee } from '../../models/general.models';

@Component({
  selector: 'app-employee-list',
  imports: [],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss'
})
export class EmployeeList {
  employeeList: IEmployee[] = [
    {name: 'Anne', employeeId: 1},
    {name: 'Bob', employeeId: 2},
    {name: 'Charlie', employeeId: 3},
    {name: 'David', employeeId: 4},
    {name: 'Eve', employeeId: 5},
    {name: 'Frank', employeeId: 6},
    {name: 'Grace', employeeId: 7},
  ]
}
