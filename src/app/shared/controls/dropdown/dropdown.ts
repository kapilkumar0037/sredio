import { Component, input, output } from '@angular/core';
import { IDropdownItem } from '../../models/general.models';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown',
  imports: [BsDropdownModule, NgClass],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss'
})
export class Dropdown {
  options = input<IDropdownItem[]>([]);
  label = input('');
  selectedOption = input<IDropdownItem>({ label: 'Select', value: '-1' });
  changeEmit = output<IDropdownItem>()

  onValueChange(selected: IDropdownItem){
    this.changeEmit.emit(selected);
  }
}
