// tslint:disable-next-line:max-line-length
import { Component, ViewEncapsulation, ContentChild, Output, EventEmitter, Inject } from '@angular/core';

import { AlloyStepper } from './stepper.component';
import { AlloyDialogService, ALLOY_DIALOG_DATA, IAlloyDialogData } from './../dialog/index';

@Component({
    moduleId: module.id,
    selector: 'alloy-wizard',
    templateUrl: 'wizard.component.html',
    encapsulation: ViewEncapsulation.None,
    exportAs: 'alloyWizard',
    // TODO: Do we want this to push changes?
})
export class AlloyWizard {

    @ContentChild(AlloyStepper) stepper: AlloyStepper;

    @Output() finished: EventEmitter<any> = new EventEmitter<any>();
    @Output() canceled: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private alloyDialogService: AlloyDialogService,
        @Inject(ALLOY_DIALOG_DATA) public data: IAlloyDialogData) {
    }

    onNextClick() {
        this.stepper.next();
    }

    onBackClick() {
        this.stepper.previous();
    }

    onFinishClick() {
      this.stepper.next();
      if (this.stepper.isCurrentValid) {
        const result = {};
        this.stepper._steps.forEach(step => {
            result[step.label] = step.stepControl.value;
        });
        this.data.content.result = result;
        this.finished.emit(result);
        this.alloyDialogService.closeDialog(this.data.dialogRef.id);
      }
    }

    onCancelClick() {
        this.canceled.emit();
        this.alloyDialogService.closeDialog(this.data.dialogRef.id);
  }
}
