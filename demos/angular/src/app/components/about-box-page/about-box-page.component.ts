import { Component, OnInit } from '@angular/core';
import { AlloyDialogService, AlloyDialogConfig, AlloyDialogItem, AlloyAboutBox, AlloyDialogRef } from '@keysight/alloy';

@Component({
    selector: 'app-about-box-page',
    templateUrl: './about-box-page.component.html'
})
export class AboutBoxPageComponent implements OnInit {

    appName = 'Demo App';
    copyright = 'Keysight Technologies 2017';
    title = 'About Demo App';
    version = '1.0.0';
    iconSrc = '../../assets/SignalStudioPro.png';
    content = 'Portions of this software are licensed by third parties.'

    constructor(public dialogService: AlloyDialogService) { }

    ngOnInit() {
    }

    openAbout(event: Event) {
        event.preventDefault();

        const ABOUT_DIALOG_CONFIG: AlloyDialogConfig = {
            panelClass: 'about-dialog',
            id: 'alloy-about-id',
            title: this.title,
            data: new AlloyDialogItem(AlloyAboutBox, {
                appName: this.appName,
                content: this.content,
                copyright: this.copyright,
                icon: this.iconSrc,
                version: this.version,
            }),
            hasBackdrop: true,
            disableClose: true,
            draggable: true, // Optional parameter. Default disabled.
            resizable: true // Optional parameter. Default disabled.
        };

        // Open dialog - Returns a dialog reference
        const dialogRef: AlloyDialogRef = this.dialogService.openDialog(ABOUT_DIALOG_CONFIG);

        // Dialog closed callback - Returns an observable data
        dialogRef.afterClosed().subscribe((data: any) => {
            console.log('About dialog closed. Received data:', data);
        });
    }
}
