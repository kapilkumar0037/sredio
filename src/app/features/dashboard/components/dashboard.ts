import { Component } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CircleProgress } from '../../../shared/components/circle-progress/circle-progress';
import { Tile } from '../../../shared/components/tile/tile';
import { ISummaryTile } from '../../../shared/models/general.models';
import { DashboardConstants } from '../constants/general.constants';
import { ActiveIntegrations } from './active-integrations/active-integrations';

@Component({
  selector: 'app-dashboard',
  imports: [BsDropdownModule, Tile, ActiveIntegrations],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  tiles: ISummaryTile[] = DashboardConstants.SummaryTiles;
}
