import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: `[label], [icon], [image]`
})
/**
 * This directive adds a universal identity to an element consisting of an optional icon (or image) and/or label.
 * The icon is always to the left of the text.  These attributes can be added to any content node to inject a child div
 * representing the icon and a child span representing the label.  If the host is not a content node or is itself involved in
 * DOM injection, then the host can `assignTo` an alternative parent of the injected elements.
 */
export class AlloyIdentityDirective {

    private renderer: Renderer2;
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
     * Returns the current label if one exists.
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
     * Element to inject icon and label into.  Either @Host or the target of `assignTo`.
     */
    private parentElement: any;

    /**
     * Element holding the text label if labelString exists.
     */
    private labelTextNode: ElementRef;

    /**
     * Text node wrapper. CSS cannot reference a text node directly, so we need this wrapper to apply styling.
     */
    private labelSpan: ElementRef;

    /**
     * Element holding the image label if imageSource exists.
     */
    private iconElement: ElementRef;

    constructor(
        elementRef: ElementRef,
        renderer: Renderer2,
      ) {
        this.parentElement = elementRef.nativeElement;
        this.renderer = renderer;
        this.createLabel();
        this.reconstructor();
    }

    /**
     * Handles constructing the DOM for the identity based on changes to the features (icon or label)
     */
    reconstructor() {
        if (this.iconClass || this.imageSource) {
            if (!this.iconElement) {
                this.iconElement = this.renderer.createElement('div');
                this.renderer.insertBefore(this.parentElement, this.iconElement, this.labelSpan);
            }

            if (this.imageSource) {
                this.renderer.setStyle(this.iconElement, 'background', `url(${this.imageSource})`);
            }

            if (this.iconClass) {
                // prior class removal handled by setter
                this.renderer.addClass(this.iconElement, this.iconClass);
            }
        } else if (this.iconElement) {
            this.renderer.removeChild(this.parentElement, this.iconElement);
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

    createLabel() {
        // TODO: AJM: We can probably make this entirely dynamic (ie: no guaranteed span).
        // We must add this span to style the text in relation to siblings
        this.labelSpan = this.renderer.createElement('span');
        this.renderer.appendChild(this.parentElement, this.labelSpan);
    }

    setSize(iconSize: number, fontSize: number) {
        if (this.iconElement) {
            this.renderer.setStyle(this.iconElement, 'height', iconSize + 'px');
            this.renderer.setStyle(this.iconElement, 'width', iconSize + 'px');
            this.renderer.setStyle(this.iconElement, 'background-size', iconSize + 'px');
        }
        this.renderer.setStyle(this.parentElement, 'font-size', fontSize + 'px');
    }

    /**
     * If the @Host is not the desired host then the icon and label injections can be
     * assigned to a different host [parentNativeElement].
     * @param parentNativeElement Parent that will have the icon and label injected
     */
    assignTo(parentNativeElement: any) {
        // Cleanup prior DOM injections if needed
        if (this.labelSpan) {
            this.renderer.removeChild(this.parentElement, this.labelSpan);
        }

        if (this.iconElement) {
            this.renderer.removeChild(this.parentElement, this.iconElement);
        }

        // Setup directive for new parent
        this.parentElement = parentNativeElement;
        this.createLabel();
        this.reconstructor();
    }
}
