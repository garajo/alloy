import { Directive, HostBinding, ElementRef, Renderer2, Input, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { ErrorDirective } from './error.directive';
import { FocusMonitor } from '@angular/cdk/a11y';

@Directive({
    selector: `input [type=checkbox] [alloy]`
})
// TODO: AJM: We should be able to make this onPush for efficiency

// TODO: AJM We could remove this as an extension if ErrorDirective can be a daisy-chained,
// see ErrorDirective for more details, this still allows us to detect error capability:
// if (widget instanceof ErrorDirective) widget.error = errorState;
// The benefit is that bindings can automatically populate error state.
export class AlloyCheckboxDirective extends ErrorDirective implements AfterViewInit, OnDestroy {
    @HostBinding('class.alloy-check') true;
    // If readonly or disabled we disable interation.  Value doesn't matter to add it, null removes it
    @HostBinding('attr.disabled') get disabledAttribute() { return this.isDisabled === true || this.isReadonly ? '' : null; }

    /** *Experimental* Checkbox size */
    private _size = 14;
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
     * Current label string if one exists.
     */
    private labelString?: string;
    /**
     * Sets a string label for the checkbox.
     */
    @Input() set label(value: string) {
        this.labelString = value;
        this.reconstructor();
    }
    /**
     * Returns the current checkbox label if one exists.
     */
    get label() { return this.labelString; }

    /**
     * Source of the img label
     */
    private imageSource?: string;
    /**
     * Sets an image 'label' for the checkbox, equivalent of <img src=>
     */
    @Input() set image(value: string) {
        this.imageSource = value;
        this.reconstructor();
    }
    /**
     * Returns the current checkbox image label if one exists.
     */
    get image() { return this.imageSource; }

    /**
     * Class representing the img label
     */
    private iconClass?: string;
    /**
     * Sets an image 'label' for the checkbox, equivalent of <img class="alloy-ic-*">
     */
    @Input() set icon(value: string) {
        // Cleanup an existing class if one exists
        if (this.iconElement) {
            this.renderer.removeClass(this.iconElement, this.iconClass);
        }
        this.iconClass = value;
        this.reconstructor();
    }
    /**
     * Returns the current checkbox image label if one exists.
     */
    get icon() { return this.iconClass; }

    /**
     * Element holding the image label if imageSource exists.
     */
    private iconElement: ElementRef;

    /**
     * Element holding the text label if labelString exists.
     */
    private labelTextNode: ElementRef;

    /**
     * Element wrapper for the checkbox (label)
     */
    private labelElement: ElementRef;

    /**
     * Text node wrapper for the checkbox (label)
     * css cannot reference a text node directly,
     * so we need this wrapper to apply styling.
     */
    private labelSpan: ElementRef;

    /**
     * Element holding the styling for the checkbox (span)
     */
    private checkboxElement: any;

    // label AND input fire when the box itself is clicked.  Let label handle things.
    @HostListener('click', ['$event']) onClick($event) {
        $event.stopPropagation();
    }

    constructor(private el: ElementRef, private renderer: Renderer2, private focusMonitor: FocusMonitor) {
        super();

        // We'll apply the classes to the parent (label) instead
        let originalClasses = this.el.nativeElement.className as string;
        let originalStyle = this.el.nativeElement.attributes['style'];

        // If we don't have a label wrapper, create one
        this.labelElement = this.renderer.parentNode(el.nativeElement);
        if (!(this.labelElement instanceof HTMLLabelElement)) {
            const label = this.renderer.createElement('label');
            this.renderer.addClass(label, 'alloy-check-wrapper');
            this.renderer.insertBefore(this.labelElement, label, this.el.nativeElement);
            this.renderer.removeChild(this.labelElement, this.el.nativeElement);
            this.renderer.appendChild(label, this.el.nativeElement);
            this.labelElement = label;

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
        this.checkboxElement = this.renderer.createElement('span');
        this.renderer.appendChild(this.labelElement, this.checkboxElement);
        // We must add this span to style the text in relation to the checkbox/icon
        this.labelSpan = this.renderer.createElement('span');
        this.renderer.appendChild(this.labelElement, this.labelSpan);
    }

    /**
     * Handles constructing the DOM for the checkbox based on changes to the features (img, text) or style
     */
    reconstructor() {
        // AJM: This is experimental.  We attempt to proportionately scale font/icon/check
        if (this.size) {
            this.renderer.setStyle(this.checkboxElement, 'height', this._size + 'px');
            this.renderer.setStyle(this.checkboxElement, 'width', this._size + 'px');
            this.renderer.setStyle(this.checkboxElement, 'background-size', this._size + 'px');
            if (this.iconElement) {
                let iconSize = this._size * 1.143;
                this.renderer.setStyle(this.iconElement, 'height', iconSize + 'px');
                this.renderer.setStyle(this.iconElement, 'width', iconSize + 'px');
                this.renderer.setStyle(this.iconElement, 'background-size', iconSize + 'px');
            }
            this.renderer.setStyle(this.labelElement, 'font-size', this._size /* * 0.85 */ + 'px');
        }

        if (this.iconClass || this.imageSource) {
            if (!this.iconElement) {
                this.iconElement = this.renderer.createElement('div');
                this.renderer.addClass(this.iconElement, 'has-icon');
                this.renderer.insertBefore(this.labelElement, this.iconElement, this.labelSpan);
            }

            if (this.imageSource) {
                this.renderer.setStyle(this.iconElement, 'background', `url(${this.iconClass})`);
            }

            if (this.iconClass) {
                // prior class removal handled by setter
                this.renderer.addClass(this.iconElement, this.iconClass);
            }
        } else if (this.iconElement) {
            this.renderer.removeChild(this.labelElement, this.iconElement);
            this.iconElement = null;
        }

        if (this.labelTextNode) {
            this.renderer.removeChild(this.labelSpan, this.labelTextNode);
        }

        if (this.labelString) {
            this.labelTextNode = this.renderer.createText(this.labelString);
            this.renderer.appendChild(this.labelSpan, this.labelTextNode);
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
            this.renderer.setAttribute(this.labelElement, 'title', errorMessage);
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
