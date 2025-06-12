import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../shared/services/api-service';
import { Observable } from 'rxjs';
import { IActiveIntegrations, IEmployee } from '../models/general.models';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {
  apiService = inject(ApiService);

  getEmployeeHours() {
    return this.apiService.employeeHours.get();
  }
  getEmployeeTimesheets() {
    return this.apiService.employeeTimesheets.get();
  }
  getEmployees() : Observable<IEmployee[]> {
    return this.apiService.employees.get();
  }
  getProjects() {
    return this.apiService.projects.get();
  }
  getActiveIntegrations():  Observable<IActiveIntegrations[]> {
    return this.apiService.activeIntegrations.get();
  }
}
