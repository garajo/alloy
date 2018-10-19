import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WizardDemoComponent } from './demo-wizard.component';
import { AlloyDialogItem, AlloyDialogConfig, AlloyDialogRef, AlloyDialogService } from '@keysight/alloy';

@Component({
    selector: 'app-wizard-page',
    templateUrl: './wizard-page.component.html'
})
export class WizardPageComponent {
  constructor(public dialogService: AlloyDialogService) { }

  onHorizontalButton() {
    this.openWizard(false);
  }

  onVerticalButton() {
    this.openWizard(true);
  }

  openWizard(isVertical: boolean) {
    const WIZARD_DIALOG_CONFIG: AlloyDialogConfig = {
      panelClass: 'wizard-dialog',
      id: 'alloy-wizard-id',
      title: 'Measure Corrections Block Wizard',
      data: new AlloyDialogItem(WizardDemoComponent, {
        orientVertical: isVertical
      }),
      hasBackdrop: true,
      disableClose: true,
      draggable: true, // Optional parameter. Default disabled.
      resizable: true   // Optional parameter. Default disabled.
    };

    // Open dialog - Returns a dialog reference
    const dialogRef: AlloyDialogRef = this.dialogService.openDialog(WIZARD_DIALOG_CONFIG);

    // Dialog closed callback - Returns an observable data
    dialogRef.afterClosed().subscribe((data: any) => {
        console.log('Wizard dialog closed. Received data:', data);
    });
  }
}
