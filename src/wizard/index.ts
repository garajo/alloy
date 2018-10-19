import { NgModule } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { ErrorStateMatcher } from '@angular/material';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { AlloyStepLabel } from './step-label.directive';
import { AlloyStepper, AlloyHorizontalStepper, AlloyVerticalStepper, AlloyStep } from './stepper.component';
import { AlloyStepHeader } from './step-header.component';
import { AlloyDirectivesModule } from '../directives/index';
import { AlloyWizard } from './wizard.component';

@NgModule({
    imports: [
        CommonModule,
        PortalModule,
        CdkStepperModule,
        AlloyDirectivesModule
      ],
      exports: [
        AlloyHorizontalStepper,
        AlloyVerticalStepper,
        AlloyStep,
        AlloyStepLabel,
        AlloyStepper,
        AlloyStepHeader,
        AlloyWizard
      ],
      declarations: [
        AlloyHorizontalStepper,
        AlloyVerticalStepper,
        AlloyStep,
        AlloyStepLabel,
        AlloyStepper,
        AlloyStepHeader,
        AlloyWizard
      ],
    providers: [FocusMonitor, ErrorStateMatcher],
})
export class AlloyWizardModule { }

export * from './wizard.component';
export * from './stepper.component';
export * from './step-header.component';
export * from './step-label.directive'
export * from './stepper-animation';
