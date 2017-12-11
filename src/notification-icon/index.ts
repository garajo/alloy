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

// those specific export names help to remove Consumer side's "ng build --aot=true" warning errors
// export * from './notification-icon';
export { AlloyNotificationIcon } from './notification-icon';
