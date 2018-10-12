import { Component } from '@angular/core';

@Component({
    selector: 'app-verify-dropdown',
    styleUrls: ['./verify-dropdown.component.scss'],
    templateUrl: './verify-dropdown.component.html'
})
export class VerifyDropdownComponent {
  public disabledSwitch = true;
  public disabledOption = true;
  public readonlySwitch = true;
  public alternateSwitch = true;
  public filterSwitch = true;
  public selectAllSwitch = true;
  public twoWayBinding = '0';
  public multipleBinding: any = '[]';
  public placeholderTest = 'Placeholder';
  public openClosed = 'closed';
  public initialBinding = '1';

  get bindCheck0(): boolean {
    return this.twoWayBinding === '0';
  }
  set bindCheck0(val: boolean) {
    this.twoWayBinding = '0';
  }

  get bindCheck1(): boolean {
    return this.twoWayBinding === '1';
  }
  set bindCheck1(val: boolean) {
    this.twoWayBinding = '1';
  }

  get bindCheckM0(): boolean {
    return this.multipleBinding.indexOf(0) !== -1;
  }
  set bindCheckM0(val: boolean) {
    const index = this.multipleBinding.indexOf(0);
    if (index === -1) {
      this.multipleBinding = this.multipleBinding.concat(0);
    } else {
      const newArr = this.multipleBinding.slice();
      newArr.splice(index, 1);
      this.multipleBinding = newArr;
    }
  }

  get bindCheckM1(): boolean {
    return this.multipleBinding.indexOf(1) !== -1;
  }
  set bindCheckM1(val: boolean) {
    const index = this.multipleBinding.indexOf(1);
    if (index === -1) {
      this.multipleBinding = this.multipleBinding.concat(1);
    } else {
      const newArr = this.multipleBinding.slice();
      newArr.splice(index, 1);
      this.multipleBinding = newArr;
    }
  }

  constructor() { }

  public openDropdown() {
    this.openClosed = 'open';
    console.log('opened');
  }
  public closeDropdown() {
    this.openClosed = 'closed';
    console.log('closed');
  }
}
