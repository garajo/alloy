import { Directive, HostBinding, ElementRef, Renderer2, Input,
    HostListener, AfterViewInit, OnDestroy, Optional, Host, OnInit } from '@angular/core';
import { ErrorDirective } from './error.directive';
import { FocusMonitor } from '@angular/cdk/a11y';
import { AlloyIdentityDirective } from './identity.directive';
import { ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[labelWrapper]'
})
// TODO: AJM We could remove this as an extension if ErrorDirective can be a daisy-chained,
// see ErrorDirective for more details, this still allows us to detect error capability:
// if (widget instanceof ErrorDirective) widget.error = errorState;
// The benefit is that bindings can automatically populate error state.
export class LabelWrapperDirective extends ErrorDirective implements AfterViewInit, OnInit, OnDestroy {

    // If readonly or disabled we disable interation.  Value doesn't matter to add it, null removes it
    @HostBinding('attr.disabled') get disabledAttribute() { return this.isDisabled === true || this.isReadonly ? '' : null; }

    /**
     * Used only to 'disable' readonly
     */
    private isReadonly = false;
    /**
     * Sets the readonly state.  This effectively sets 'disabled' and applies
     * subtle styling as label only has state; it doesn't have a 'value' to make readonly.
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
     * Returns the current readonly state.
     */
    get readonly() { return this.isReadonly; }

    /**
     * Disabled state.
     */
    private isDisabled = false;
    /**
     * Sets the disabled state.
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
     * Element wrapper (label)
     */
    protected labelElement: ElementRef;

    /**
     * Element holding the styling (span)
     */
    protected styledElement: any;

    // label AND input fire when the box itself is clicked.  Let label handle things.
    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
    }

    constructor(
        protected el: ElementRef,
        protected renderer: Renderer2,
        protected focusMonitor: FocusMonitor,
        @Host() @Optional() protected identityDirective: AlloyIdentityDirective) {
        super();

        // We'll apply the classes to the parent (label) instead
        let originalClasses = this.el.nativeElement.className as string;
        let originalStyle = this.el.nativeElement.attributes['style'];

        // If we don't have a label wrapper, create one
        this.labelElement = this.renderer.createElement('label');
        // We must add the span because that's what actually gets the check styling
        this.styledElement = this.renderer.createElement('span');

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

    ngOnInit(): void {
        // Inject wrapper then move native element (input) within it.
        this.renderer.insertBefore(this.renderer.parentNode(this.el.nativeElement), this.labelElement, this.el.nativeElement);
        this.renderer.removeChild(this.renderer.parentNode(this.el.nativeElement), this.el.nativeElement);
        this.renderer.appendChild(this.labelElement, this.el.nativeElement);
        this.renderer.appendChild(this.labelElement, this.styledElement);

        // Since we're injecting a parent we need to supply it to the identity directive for it's injections to behave properly
        if (this.identityDirective) {
            this.identityDirective.assignTo(this.labelElement);
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
}
