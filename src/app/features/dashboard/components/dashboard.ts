import { Component } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CircleProgress } from '../../../shared/components/circle-progress/circle-progress';

@Component({
  selector: 'app-dashboard',
  imports: [BsDropdownModule, CircleProgress],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

}
