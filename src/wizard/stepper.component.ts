// tslint:disable-next-line:max-line-length
import { Directive, ViewChildren, QueryList, ContentChildren, ViewEncapsulation, ChangeDetectionStrategy, Component, ElementRef, ContentChild, Inject, forwardRef, SkipSelf, TemplateRef, OnInit, EventEmitter, Output } from '@angular/core';

import { CdkStepper, CdkStep } from '@angular/cdk/stepper';
import { alloyStepperAnimations } from './stepper-animation';
import { AlloyStepHeader } from './step-header.component';
import { FormGroupDirective, FormControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';
import { AlloyStepLabel } from './step-label.directive';


@Component({
    moduleId: module.id,
    selector: 'alloy-step',
    templateUrl: 'step.component.html',
    providers: [{provide: ErrorStateMatcher, useExisting: AlloyStep}],
    encapsulation: ViewEncapsulation.None,
    exportAs: 'alloyStep',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlloyStep extends CdkStep implements ErrorStateMatcher, OnInit {

    /** Content for step label given by `<ng-template alloyStepLabel>`. */
    @ContentChild(AlloyStepLabel) stepLabel: AlloyStepLabel;

    /** @breaking-change 8.0.0 remove the `?` after `stepperOptions` */
    constructor(@Inject(forwardRef(() => AlloyStepper)) stepper: AlloyStepper,
                @SkipSelf() private _errorStateMatcher: ErrorStateMatcher) {
      super(stepper);
    }

    ngOnInit(): void {
      if (!this.label) {    // Wizard uses label to bundle the data blob
        throw new Error('[alloy-step] requires [label].');
      }
    }

    /** Custom error state matcher that additionally checks for validity of interacted form. */
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const originalErrorState = this._errorStateMatcher.isErrorState(control, form);

      // Custom error state checks for the validity of form that is not submitted or touched
      // since user can trigger a form change by calling for another step without directly
      // interacting with the current form.
      const customErrorState = !!(control && control.invalid && this.interacted);

      return originalErrorState || customErrorState;
    }
}

@Directive({
    selector: '[alloyStepper]'
})
export class AlloyStepper extends CdkStepper {
    /** The list of step headers of the steps in the stepper. */
    @ViewChildren(AlloyStepHeader, {read: ElementRef}) _stepHeader: QueryList<ElementRef>;

    /** Steps that the stepper holds. */
    @ContentChildren(AlloyStep) _steps: QueryList<AlloyStep>;

    @Output() onFinish: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

    get currentContentId(): string {
        return this._getStepContentId(this.selectedIndex);
    }

    get currentStep(): AlloyStep {
        const step = this._steps.toArray()[this.selectedIndex];
        step.interacted = true;     // Set it to interacted, so 'valid' is the only blocker for advancing steps
        return step;
    }

    get currentContent(): TemplateRef<any> {
        return this.currentStep.content;
    }

    get isCurrentValid(): boolean {
      return this.currentStep &&
      (!this.currentStep.stepControl ||   // assume no form = valid
      this.currentStep.stepControl.valid);
    }

    get numSteps(): number {
        return this._steps.length;
    }
}

@Component({
    moduleId: module.id,
    selector: 'alloy-horizontal-stepper',
    exportAs: 'alloyHorizontalStepper',
    templateUrl: 'stepper-horizontal.html',
    inputs: ['selectedIndex'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'class': 'alloy-stepper-horizontal',
        '[class.alloy-stepper-label-position-end]': 'labelPosition == "end"',
        '[class.alloy-stepper-label-position-bottom]': 'labelPosition == "bottom"',
        'aria-orientation': 'horizontal',
        'role': 'tablist',
    },
    animations: [alloyStepperAnimations.horizontalStepTransition],
    providers: [{ provide: AlloyStepper, useExisting: AlloyHorizontalStepper }],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlloyHorizontalStepper extends AlloyStepper { }

@Component({
    moduleId: module.id,
    selector: 'alloy-vertical-stepper',
    exportAs: 'alloyVerticalStepper',
    templateUrl: 'stepper-vertical.html',
    inputs: ['selectedIndex'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
        'class': 'alloy-stepper-vertical',
        'aria-orientation': 'vertical',
        'role': 'tablist',
    },
    animations: [alloyStepperAnimations.verticalStepTransition],
    providers: [{ provide: AlloyStepper, useExisting: AlloyVerticalStepper }],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlloyVerticalStepper extends AlloyStepper { }

