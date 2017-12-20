import {
    Attribute,
    Component,
    Directive,
    ElementRef,
    Input,    
    Renderer,
} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: `[alloy-button]`,
    templateUrl: './button.html'
})

export class AlloyButton {

    private _renderer: Renderer;    
    
    private _elementRef: ElementRef;

    private _type: string = '';

    /** Whether or not the button is disabled  */
    private _isDisabled = false;

    /** Whether or not the button is clicked */
    private _isClicked = false;

    /** Whether or not the button is hovered on */
    private _isHovered = false;

    /** Whether or not the button is active */
    private _isActive = false;

    /** @hidden */
    setElementClass(className: string, styling: boolean) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, styling);
    }

    /** @hidden */
    setElementAttribute(attributeName: string, styling: string) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, attributeName, styling);
    }

    /**
    * @input {boolean} If true, activates the default button styling.
    */
    @Input()
    set default(val: boolean) {
        this.setType('button-default');
        this.setElementClass(this._type, true);
    }

    /**
    * @input {boolean} If true, activates the standard button styling.
    */
    @Input()
    set standard(val: boolean) {
        this.setType('button-standard');
        this.setElementClass(this._type, true);
    }

    /**
    * @input {boolean} If true, activates the quick-access button styling.
    */
    @Input()
    set quickaccess(val: boolean) {
        this.setType('button-quick-access');
        this.setElementClass(this._type, true);
    }

    /**
    * @input {boolean} If true, activates the toolbar button styling.
    */
    @Input()
    set toolbar(val: boolean) {
        this.setType('button-toolbar');
        this.setElementClass(this._type, true);        
    }

    /** Input boolean to disable the button */
    @Input()
    get disabled() { return this._isDisabled; }
    set disabled(value: boolean) {
        this._isDisabled = value;
        this.setElementAttribute('disabled', value ? 'true' : null);        
    }

    /** Input boolean for hovering over the button */
    @Input()
    get hover() { return this._isHovered; }
    set hover(value: boolean) {
        this._isHovered = value;        
        this.setElementClass('is-hovered', this._isHovered)
    }

    /** Input boolean for active button */
    @Input()
    get active() { return this._isActive; }
    set active(value: boolean) {
        this._isActive = value;        
        this.setElementClass('is-active', this._isActive)
    }

    setType(type: string) : void {
        this._type = type;
    }

    /** Change state of button on click */
    onClick() {
        this._isClicked = !this._isClicked;
    }

    constructor(
        @Attribute('alloy-button') alloyButton: string,
        elementRef: ElementRef,
        renderer: Renderer,
      ) {
        this._elementRef = elementRef;
        this._renderer = renderer;
      }
}
