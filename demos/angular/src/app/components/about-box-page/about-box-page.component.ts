import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AlloyAboutBox } from '@keysight/alloy';

@Component({
    selector: 'app-about-box-page',
    templateUrl: './about-box-page.component.html',
    styleUrls: ['./about-box-page.component.scss']
})
export class AboutBoxPageComponent implements OnInit {

    appName = 'Demo App';
    copyright = 'Keysight Technologies 2017';
    title = 'About Demo App';
    version = '1.0.0';
    iconSrc = '../../assets/SignalStudioPro.png';
    content = 'Portions of this software are licensed by third parties.'

    dialogRef: MatDialogRef<AlloyAboutBox>;

    constructor(public dialog: MatDialog) { }

    ngOnInit() {

    }


    openAbout(event: Event) {
        event.preventDefault();
        this.dialogRef = this.dialog.open(AlloyAboutBox);

        this.dialogRef.componentInstance.appName = this.appName;
        this.dialogRef.componentInstance.content = this.content;
        this.dialogRef.componentInstance.copyright = this.copyright;
        this.dialogRef.componentInstance.icon = this.iconSrc;
        this.dialogRef.componentInstance.title = this.title;
        this.dialogRef.componentInstance.version = this.version;
      }


}
