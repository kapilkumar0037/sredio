import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './api';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get employees() {
    return new Api(this.http, `${BASE_URL}/employees`);
  }

  get employeeHours() {
    return new Api(this.http, `${BASE_URL}/employeeHours`);
  }

  get employeeTimesheets() {
    return new Api(this.http, `${BASE_URL}/employeeTimesheets`);
  }

  get projects() {
    return new Api(this.http, `${BASE_URL}/projects`);
  }
  
  get activeIntegrations() {
    return new Api(this.http, `${BASE_URL}/activeIntegrations`);
  }
}
