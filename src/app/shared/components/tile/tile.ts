import { Component, input } from '@angular/core';
import { CircleProgress } from '../circle-progress/circle-progress';
import { IAction, ISummaryTile } from '../../models/general.models';

@Component({
  selector: 'app-tile',
  imports: [CircleProgress],
  templateUrl: './tile.html',
  styleUrl: './tile.scss'
})
export class Tile {
  tileInput = input<ISummaryTile>();
  progress = input(0);
}
