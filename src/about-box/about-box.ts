import {
    Component,
    ViewEncapsulation,
    Inject
} from '@angular/core';

import { AlloyDialogService, ALLOY_DIALOG_DATA, IAlloyDialogData } from './../dialog/index';

@Component({
    moduleId: module.id,
    selector: 'alloy-about-box',
    templateUrl: './about-box.html',
    encapsulation: ViewEncapsulation.None
})
export class AlloyAboutBox {
    appName: string;
    content: string;
    copyright: string;
    icon: string;
    version: string;

    constructor(private alloyDialogService: AlloyDialogService,
                @Inject(ALLOY_DIALOG_DATA) public data: IAlloyDialogData) {
        this.appName = this.data.content.appName;
        this.content = this.data.content.content;
        this.copyright = this.data.content.copyright;
        this.icon = this.data.content.icon;
        this.version = this.data.content.version;
    }

    close() {
        this.alloyDialogService.closeDialog(this.data.dialogRef.id);
    }
}
