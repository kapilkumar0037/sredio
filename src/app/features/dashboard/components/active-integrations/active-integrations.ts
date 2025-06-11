import { Component } from '@angular/core';
import { DashboardConstants } from '../../constants/general.constants';

@Component({
  selector: 'app-active-integrations',
  imports: [],
  templateUrl: './active-integrations.html',
  styleUrl: './active-integrations.scss'
})
export class ActiveIntegrations {
  integrations = DashboardConstants.ActiveIntegrations;
}
