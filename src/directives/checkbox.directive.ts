import { Directive, HostBinding, ElementRef, Renderer2, Input, HostListener, AfterViewInit, OnDestroy, Optional, Host } from '@angular/core';
import { ErrorDirective } from './error.directive';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyIdentityDirective } from './identity.directive';

@Directive({
    selector: `input [type=checkbox] [alloy]`
})
// TODO: AJM: We should be able to make this onPush for efficiency

// TODO: AJM We could remove this as an extension if ErrorDirective can be a daisy-chained,
// see ErrorDirective for more details, this still allows us to detect error capability:
// if (widget instanceof ErrorDirective) widget.error = errorState;
// The benefit is that bindings can automatically populate error state.
export class AlloyCheckboxDirective extends ErrorDirective implements AfterViewInit, OnDestroy {
    // There are currently four modes: checkbox, toggle, toolbar, switch.
    // Checkbox is the default, but last in trumps if someone sets multiple (which is an erroneous state)

    // TODO: AJM: We can drastically clean this up with an enum
    // Default mode
    private check = true;
    @HostBinding('class.alloy-check') @Input('check')
    get isCheckmark() { return this.check; }
    set isCheckmark(value: any) {
        this.resetPriorClasses();
        this.check = value !== false;
    }

    private switch = false;
    @HostBinding('class.alloy-button-switch') @Input('switch')
    set isSwitchButton(value: any) {
        throw new Error('Not implemented yet.');    // TODO:
        // this.resetPriorClasses();
        // this.switch = value !== false;
    }
    get isSwitchButton() { return this.switch; }

    // If readonly or disabled we disable interation.  Value doesn't matter to add it, null removes it
    @HostBinding('attr.disabled') get disabledAttribute() { return this.isDisabled === true || this.isReadonly ? '' : null; }

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

    /**
     * Used only to 'disable' readonly checkboxes.
     */
    private isReadonly = false;
    /**
     * Sets the readonly state of the checkbox.  This effectively sets 'disabled' and applies
     * subtle styling as checkbox only has state; it doesn't have a 'value' to make readonly.
     */
    @Input() set readonly(value: any) {
        this.isReadonly = value;
        // If we have a label wrapper style the whole thing
        if (this.isReadonly) {
            this.renderer.addClass(this.labelElement, 'readonly');
        } else {
            this.renderer.removeClass(this.labelElement, 'readonly');
        }
    }
    /**
     * Returns the current readonly state of the checkbox.
     */
    get readonly() { return this.isReadonly; }

    /**
     * Disabled state.
     */
    private isDisabled = false;
    /**
     * Sets the disabled state of the checkbox.
     */
    @Input() set disabled(value: any) {
        this.isDisabled = value;
        // If we have a label wrapper style the whole thing
        if (this.isDisabled) {
            this.renderer.addClass(this.labelElement, 'disabled');
        } else {
            this.renderer.removeClass(this.labelElement, 'disabled');
        }
    }
    /**
     * Returns the disabled state.
     */
    get disabled() { return this.isDisabled; }

    /**
     * Element wrapper for the checkbox (label)
     */
    private labelElement: ElementRef;

    /**
     * Element holding the styling for the 'checkbox' (span)
     */
    private styledElement: any;

    // label AND input fire when the box itself is clicked.  Let label handle things.
    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
    }

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private focusMonitor: FocusMonitor,
        @Host() @Optional() private identityDirective: AlloyIdentityDirective) {
        super();

        // We'll apply the classes to the parent (label) instead
        let originalClasses = this.el.nativeElement.className as string;
        let originalStyle = this.el.nativeElement.attributes['style'];

        // If we don't have a label wrapper, create one
        this.labelElement = this.renderer.parentNode(el.nativeElement);
        if (!(this.labelElement instanceof HTMLLabelElement)) {
            const label = this.renderer.createElement('label');

            // Inject wrapper then move native element (input) within it.
            this.renderer.insertBefore(this.labelElement, label, this.el.nativeElement);
            this.renderer.removeChild(this.labelElement, this.el.nativeElement);
            this.renderer.appendChild(label, this.el.nativeElement);
            this.labelElement = label;
            this.styleWrapper();

            // apply each of the classes to the parent, and remove them from the input
            // ex: `column`: we want this to apply to the outermost element, label, not the inner input
            // ex: 'margin-right:...': we want this to apply to the label not change space between box and label
            // Is there ever a case we want to apply a class to the input?
            if (originalClasses) {
                originalClasses.split(' ').forEach(element => {
                    this.renderer.addClass(this.labelElement, element);
                    this.renderer.removeClass(this.el.nativeElement, element);
                });
            }

            if (originalStyle) {
                this.renderer.setAttribute(this.labelElement, originalStyle.name, originalStyle.value);
                this.renderer.removeAttribute(this.el.nativeElement, originalStyle.name);   // Don't want these applied to the box
            }
        }

        // We must add the span because that's what actually gets the check styling
        this.styledElement = this.renderer.createElement('span');
        this.renderer.appendChild(this.labelElement, this.styledElement);

        // Since we're injecting a parent we need to supply it to the identity directive for it's injections to behave properly
        if (this.identityDirective) {
            this.identityDirective.assignTo(this.labelElement);
        }
    }

    /**
     * Handles constructing the DOM for the checkbox based on changes to the features (img, text) or style
     */
    reconstructor() {
        // AJM: This is experimental.  We attempt to proportionately scale font/icon/check
        if (this.size) {
            if (this.isCheckmark) {
                this.renderer.setStyle(this.styledElement, 'height', this._size + 'px');
                this.renderer.setStyle(this.styledElement, 'width', this._size + 'px');
                this.renderer.setStyle(this.styledElement, 'background-size', this._size + 'px');
            }

            if (this.identityDirective) {
                this.identityDirective.setSize(this._size * 1.143, this._size);
            }
        }
    }

    ngAfterViewInit() {
        this.focusMonitor.monitor(this.el.nativeElement, this.renderer, false);
    }

    ngOnDestroy() {
        this.focusMonitor.stopMonitoring(this.el.nativeElement);
    }

    onError(errorState: boolean, errorMessage: string) {
        // AJM: The title change is destructive, we could store/restore if needed
        if (errorState) {
            if (errorMessage) {
                this.renderer.setAttribute(this.labelElement, 'title', errorMessage);
            }
            this.renderer.addClass(this.labelElement, 'has-error');
            this.renderer.addClass(this.el.nativeElement, 'has-error');
        } else {
            this.renderer.removeAttribute(this.labelElement, 'title');
            this.renderer.removeClass(this.labelElement, 'has-error');
            this.renderer.removeClass(this.el.nativeElement, 'has-error');
        }
    }

    /**
     * Due to 'program' bug in focusMonitor we reroute programmatic as 'keyboard' to allow focus ring
     */
    focus(): void {
        this.focusMonitor.focusVia(this.el.nativeElement, 'keyboard');
    }

    // These methods manage syncing the styling of the host and the label wrapper
    styleWrapper() {
        if (this.isCheckmark) {
            this.renderer.addClass(this.labelElement, 'alloy-check-wrapper');
        } else if (this.isSwitchButton) {
            this.renderer.addClass(this.labelElement, 'alloy-switch-wrapper');
        }
    }

    resetPriorClasses() {
        this.check = false;
        this.switch = false;

        this.renderer.removeClass(this.labelElement, 'alloy-check-wrapper');
        this.renderer.removeClass(this.labelElement, 'alloy-switch-wrapper');
    }
}
