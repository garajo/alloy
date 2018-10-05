import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject
} from '@angular/core';

import { AlloyThemingService, AlloyThemes } from '../app/services/index';
import { AlloyDialogService, ALLOY_DIALOG_DATA, IAlloyDialogData } from './../dialog/index';

@Component({
  moduleId: module.id,
  selector: 'alloy-display-settings-dialog',
  templateUrl: './display-settings.html',
  styleUrls: ['./display-settings.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlloyDisplaySettingsDialog implements OnInit {

    /** Display settings dialog title */
  public isLightTheme: boolean;

  constructor(  private alloyDialogService: AlloyDialogService,
                @Inject(ALLOY_DIALOG_DATA) public data: IAlloyDialogData,
                private alloyThemingService: AlloyThemingService) {
  }

  ngOnInit() {
    // Need to query the Alloy theme service state and match it by setting the radio buttons to the right state
    this.setTheme(this.alloyThemingService.theme);
  }

  close() {
    this.alloyDialogService.closeDialog(this.data.dialogRef.id);
  }

  setTheme(theme: AlloyThemes): void {
    // Since the UI is bound to this method need to set whatever theme was selected
    this.alloyThemingService.theme = theme;
    // Update the backing variable so the UI can keep in sync
    this.isLightTheme = theme === AlloyThemes.Light;
  }
}
