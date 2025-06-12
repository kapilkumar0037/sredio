import { Component, inject } from '@angular/core';
import { DashboardConstants } from '../../constants/general.constants';
import { Dashboard } from '../../services/dashboard';
import { Observable } from 'rxjs';
import { IActiveIntegrations } from '../../models/general.models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-active-integrations',
  imports: [AsyncPipe],
  templateUrl: './active-integrations.html',
  styleUrl: './active-integrations.scss'
})
export class ActiveIntegrations {
  dashboardService = inject(Dashboard);
  integrations$: Observable<IActiveIntegrations[]> = this.dashboardService.getActiveIntegrations()
}
