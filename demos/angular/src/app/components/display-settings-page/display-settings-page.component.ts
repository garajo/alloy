import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlloyDisplaySettingsDialog } from '@keysight/alloy';

@Component({
    selector: 'app-display-settings-page',
    templateUrl: './display-settings-page.component.html'
})
export class DisplaySettingsPageComponent implements OnInit {

    dialogRef: MatDialogRef<AlloyDisplaySettingsDialog>;

    constructor(public dialog: MatDialog) { }

    ngOnInit() {

    }


    openAbout(event: Event) {
        event.preventDefault();
        this.dialogRef = this.dialog.open(AlloyDisplaySettingsDialog);
      }


}
