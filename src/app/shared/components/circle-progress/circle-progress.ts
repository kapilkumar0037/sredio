import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  imports: [NgClass],
  templateUrl: './circle-progress.html',
  styleUrl: './circle-progress.scss'
})
export class CircleProgress {
  percent = input(40);
  strokeWidth=input(5);
  strokeClass = input('text-primary');
  size= input(50);

  get radius() {
    return (this.size() - this.strokeWidth()) / 2;
  }

  get circumference() {
    return 2 * Math.PI * this.radius;
  }

  get dashOffset() {
    return this.circumference - (this.percent() / 100) * this.circumference;
  }

  get center() {
    return this.size() / 2;
  }
}
