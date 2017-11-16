import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlloyNotificationIcon } from './notification-icon';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        AlloyNotificationIcon
    ],
    declarations: [
        AlloyNotificationIcon
    ]
})
export class AlloyNotificationIconModule { }

export * from './notification-icon';
