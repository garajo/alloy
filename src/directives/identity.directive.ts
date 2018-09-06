import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

const LABEL_CLASS_NAME = 'alloyLabel';
const ICON_CLASS_NAME = 'alloyIcon';
@Directive({
    selector: `[alloyLabel], [alloyIcon], [alloyImage]`
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
    @Input(LABEL_CLASS_NAME) set label(value: string) {
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
    @Input('alloyImage') set image(value: string) {
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
    @Input(ICON_CLASS_NAME) set icon(value: string) {
        this.iconClass = value;
        this.reconstructor();
    }
    /**
     * Returns the current checkbox image label if one exists.
     */
    get icon() { return this.iconClass; }

    /**
     * Represents the order of the label/icon
     */
    private flip = false;
    /**
     * Set true if you want the label to precede the icon
     */
    @Input('alloyFlip') set isFlipped(value: boolean) {
        this.flip = value !== false;
        this.reconstructor();
    }
    /**
     * Returns true if the label/icon order is reversed
     */
    get isFlipped() { return this.flip; }

    /**
     * Element to inject icon and label into.  Either @Host or the target of `assignTo`.
     */
    private parentElement: any;

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
        this.reconstructor();
    }

    /**
     * Handles constructing the DOM for the identity based on changes to the features (icon or label)
     */
    reconstructor() {
        // Cleanup old versions
        if (this.labelSpan) {
            this.renderer.removeChild(this.parentElement, this.labelSpan);
            this.labelSpan = null;
        }

        if (this.iconElement) {
            this.renderer.removeChild(this.parentElement, this.iconElement);
            this.iconElement = null;
        }

        // Construct the label (span)
        if (this.label) {
            this.labelSpan = this.renderer.createElement('span');
            this.renderer.addClass(this.labelSpan, LABEL_CLASS_NAME);
            this.renderer.appendChild(this.parentElement, this.labelSpan);
            const labelTextNode = this.renderer.createText(this.labelString);
            this.renderer.appendChild(this.labelSpan, labelTextNode);
        }

        // Construct the icon (div)
        if (this.iconClass || this.imageSource) {
            if (!this.iconElement) {
                this.iconElement = this.renderer.createElement('div');
                if (this.isFlipped) {
                    this.renderer.appendChild(this.parentElement, this.iconElement);
                } else {
                    this.renderer.insertBefore(this.parentElement, this.iconElement, this.labelSpan);
                    this.renderer.addClass(this.iconElement, ICON_CLASS_NAME);
                }
            }

            if (this.imageSource) {
                this.renderer.setStyle(this.iconElement, 'background', `url(${this.imageSource}) no-repeat`);
            }

            if (this.iconClass) {
                // addClass, removeClass don't support spaces (two classes), so we add it as an attribute as a whole.
                // TODO: split the input by space and add each class
                this.renderer.setAttribute(this.iconElement, 'class', ICON_CLASS_NAME + ' ' + this.iconClass);
            }
        } else if (this.iconElement) {
            this.renderer.removeChild(this.parentElement, this.iconElement);
            this.iconElement = null;
        }
    }

    setSize(iconSize: number, fontSize: number) {
        if (this.iconElement) {
            this.renderer.setStyle(this.iconElement, 'height', iconSize + 'px');
            this.renderer.setStyle(this.iconElement, 'width', iconSize + 'px');
            this.renderer.setStyle(this.iconElement, 'background-size', iconSize + 'px');
        }
        if (this.labelSpan) {
            this.renderer.setStyle(this.labelSpan, 'font-size', fontSize + 'px');
        }
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
        this.reconstructor();
    }
}
