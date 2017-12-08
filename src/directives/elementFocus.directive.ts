import { Directive, ElementRef, Renderer, AfterViewChecked } from '@angular/core';
@Directive({
    selector: '[elementFocus]'
})

export class ElementFocusDirective implements AfterViewChecked {
    constructor(private _el: ElementRef, private renderer: Renderer) {
    }

   ngAfterViewChecked() {
        this.renderer.invokeElementMethod(this._el.nativeElement, 'focus');
    }
}
