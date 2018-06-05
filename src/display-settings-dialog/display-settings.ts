import {
  Input,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { AlloyThemingService, AlloyThemes } from '../app/services/index';

import { MatDialogRef} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'alloy-display-settings-dialog',
  templateUrl: './display-settings.html',
  encapsulation: ViewEncapsulation.None
})
export class AlloyDisplaySettingsDialog implements OnInit {

    /** Display settings dialog title */
  private _title = 'Display Settings';
  public isLightTheme: boolean;

  constructor(
    public dialogRef: MatDialogRef<AlloyDisplaySettingsDialog>,
    private alloyThemingService: AlloyThemingService) {
  }

  ngOnInit() {
    // Need to query the Alloy theme service state and match it by setting the radio buttons to the right state
    this.setTheme(this.alloyThemingService.theme);
  }

  /** Display settings title to be shown */
  @Input()
  get title() { return this._title; }
  set title(value: string) {
    this._title = value;
  }

  close() {
    this.dialogRef.close();
  }

  setTheme(theme: AlloyThemes): void {
    // Since the UI is bound to this method need to set whatever theme was selected
    this.alloyThemingService.theme = theme;
    // Update the backing variable so the UI can keep in sync
    theme === AlloyThemes.Light ? this.isLightTheme = true : this.isLightTheme = false;
  }
}
