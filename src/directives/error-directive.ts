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
    @HostBinding('class.has-error') errorState: boolean;
    @Input()
    set error(value: boolean) { this.errorState = value; }
    get error() { return this.errorState; }
}
