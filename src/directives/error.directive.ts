import {
    Directive, HostBinding, Input
} from '@angular/core';


// TODO: AJM: This can't be a directive...yet
// https://github.com/angular/angular/issues/8785
// One of the most popular requests, supposedly in Angular 7...if we ever get there
// @Directive({
//     selector: '[error]'
// })
export class ErrorDirective {
    private errorState: boolean;
    @Input()
    set error(value: boolean) {
        this.errorState = value;
        this.onError(this.errorState, this.errorMessage);
    }
    get error() { return this.errorState; }

    private message: string;
    @Input()
    set errorMessage(value: string) {
        this.message = value;
        this.onError(this.errorState, this.errorMessage);
    }
    get errorMessage() { return this.message; }

    /**
     * Called whenever the error state changes
     * @param errorState true if erroneous
     * @param errorMessage descriptor for hte error
     */
    onError(errorState: boolean, errorMessage: string) {}
}
