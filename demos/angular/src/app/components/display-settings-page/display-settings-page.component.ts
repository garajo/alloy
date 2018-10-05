import { Component } from '@angular/core';
import { AlloyDialogService, AlloyDialogConfig, AlloyDialogItem, AlloyDisplaySettingsDialog } from '@keysight/alloy';

@Component({
    selector: 'app-display-settings-page',
    templateUrl: './display-settings-page.component.html'
})
export class DisplaySettingsPageComponent {

    constructor(public dialogService: AlloyDialogService) { }

    openDisplay(event: Event) {
        event.preventDefault();

        const DISPLAY_DIALOG_CONFIG: AlloyDialogConfig = {
            panelClass: 'display-dialog',
            id: 'alloy-display-id',
            title: 'Display Settings',
            data: new AlloyDialogItem(AlloyDisplaySettingsDialog),
            hasBackdrop: true,
            disableClose: true,
            draggable: true, // Optional parameter. Default disabled.
            resizable: true // Optional parameter. Default disabled.
        };

        this.dialogService.openDialog(DISPLAY_DIALOG_CONFIG);
    }

}
