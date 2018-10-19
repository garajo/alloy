import {Directive} from '@angular/core';
import {CdkStepLabel} from '@angular/cdk/stepper';

@Directive({
  selector: '[alloyStepLabel]',
})
export class AlloyStepLabel extends CdkStepLabel {}
