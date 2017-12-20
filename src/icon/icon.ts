import {
    Attribute,
    Component,
    Directive,
    ElementRef,
    Input,    
    Renderer
} from '@angular/core';

@Directive({
    selector: 'alloy-icon',
    host: {
      'role': 'span'
    }
  })
  export class AlloyIcon {

    // class name of the icon for styling 
    private _class: string = '';

    private _renderer: Renderer;    
    
    private _elementRef: ElementRef;

    /** @hidden */
    setElementClass(className: string, styling: boolean) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, styling);
    }

    /** @hidden */
    setElementAttribute(attributeName: string, styling: string) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, attributeName, styling);
    }

    constructor(
        @Attribute('alloy-icon') alloyIcon: string,
        elementRef: ElementRef,
        renderer: Renderer,
      ) {
        this._elementRef = elementRef;
        this._renderer = renderer;
      }
  
      @Input()
      set class(value: string) { 
        this._class = value;
        this.setElementClass(this._class, true);
      }
      get class(): string {
        return this._class;
      }

  }