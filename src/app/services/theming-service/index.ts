import { NgModule } from '@angular/core';
import { AlloyThemingService } from './theme.service';

// We need to create a module so our theming service can be "imported" by some consuming app,
// set the theming service as a provider and export the module
@NgModule({
    providers: [
        AlloyThemingService
    ]
})
export class AlloyThemingServiceModule { }

// Need to export this so that consuming code can actually import the service and use it
export { AlloyThemingService } from './theme.service';
