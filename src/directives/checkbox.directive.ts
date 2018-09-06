import { Directive, HostBinding, ElementRef, Renderer2, Input, Optional, Host } from '@angular/core';
import { LabelWrapperDirective } from './labelWrapper.directive';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyIdentityDirective } from './identity.directive';

@Directive({
    selector: `input [type=checkbox] [alloy]`
})
// TODO: AJM: We should be able to make this onPush for efficiency

export class AlloyCheckboxDirective extends LabelWrapperDirective {
    @HostBinding('class.alloy-check') true;

    /** *Experimental* Checkbox size */
    private _size;
    /**
     * Returns the current size of the checkbox *box*.
     */
    get size() { return this._size; }
    /**
     * Sets the current checkbox size.  Note: currently only applies to the box itself, not the labels.
     */
    @Input() set size(value: number) {
        (value <= 0 || !value) ? this._size = 14 : this._size = value;
        this.reconstructor();
    }

    constructor(
        protected el: ElementRef,
        protected renderer: Renderer2,
        protected focusMonitor: FocusMonitor,
        @Host() @Optional() protected identityDirective: AlloyIdentityDirective) {
            super(el, renderer, focusMonitor, identityDirective);

            this.renderer.addClass(this.labelElement, 'alloy-check-wrapper');
    }

    /**
     * Handles constructing the DOM for the checkbox based on changes to the features (img, text) or style
     */
    reconstructor() {
        // AJM: This is experimental.  We attempt to proportionately scale font/icon/check
        if (this.size) {
            this.renderer.setStyle(this.styledElement, 'height', this._size + 'px');
            this.renderer.setStyle(this.styledElement, 'width', this._size + 'px');
            this.renderer.setStyle(this.styledElement, 'background-size', this._size + 'px');

            if (this.identityDirective) {
                this.identityDirective.setSize(this._size * 1.143, this._size);
            }
        }
    }
}
