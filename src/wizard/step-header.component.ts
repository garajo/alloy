import { ElementRef, Component, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, Input, Renderer2 } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyStepLabel } from './step-label.directive';

@Component({
    moduleId: module.id,
    selector: 'alloy-step-header',
    templateUrl: 'step-header.component.html',
    host: {
      'class': 'alloy-step-header',
      'role': 'tab',
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class AlloyStepHeader implements OnDestroy {
    /** Label of the given step. */
    @Input() label: AlloyStepLabel | string;

    // TODO: Need to coerce the following?

    /** Error message to display when there's an error. */
    @Input() errorMessage: string;

    /** Index of the given step. */
    @Input() index: number;

    /** Whether the given step is selected. */
    @Input() selected: boolean;

    /** Whether the given step label is active. */
    @Input() active: boolean;

    /** Whether the given step is optional. */
    @Input() optional: boolean;

    constructor(
      private focusMonitor: FocusMonitor,
      private element: ElementRef,
      renderer: Renderer2) {
      focusMonitor.monitor(this.element.nativeElement, renderer, true);
    }

    ngOnDestroy() {
      this.focusMonitor.stopMonitoring(this.element.nativeElement);
    }

    /** Returns string label of given step if it is a text label. */
    _stringLabel(): string | null {
      return this.label instanceof AlloyStepLabel ? null : this.label;
    }

    /** Returns MatStepLabel if the label of given step is a template label. */
    _templateLabel(): AlloyStepLabel | null {
      return this.label instanceof AlloyStepLabel ? this.label : null;
    }

    /** Returns the host HTML element. */
    _getHostElement() {
      return this.element.nativeElement;
    }

    focus() {
      this._getHostElement().focus();
    }
  }
