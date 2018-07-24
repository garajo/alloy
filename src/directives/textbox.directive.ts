import {
    Directive, HostBinding
} from '@angular/core';
import { ErrorDirective } from './error.directive';

@Directive({
    selector: `
        input [type=date] [alloy],
        input [type=datetime-local] [alloy],
        input [type=email] [alloy],
        input [type=month] [alloy],
        input [type=number] [alloy],
        input [type=password] [alloy],
        input [type=tel] [alloy],
        input [type=text] [alloy],
        input [type=time] [alloy],
        input [type=url] [alloy],
        input [type=week] [alloy],
        `
})
// TODO: AJM We could remove this as an extension if ErrorDirective can be a daisy-chained,
// see ErrorDirective for more details, this still allows us to detect error capability:
// if (widget instanceof ErrorDirective) widget.error = errorState;
// The benefit is that bindings can automatically populate error state.
export class AlloyTextboxDirective extends ErrorDirective {
    @HostBinding('class.alloy-text') true;
    @HostBinding('class.has-error') get errorIcon() { return this.error; };
    @HostBinding('title') get title() { return this.errorMessage; };
}
