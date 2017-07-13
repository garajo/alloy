import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'alloy,[alloy]',
    template: '<ng-content></ng-content>',
    styleUrls: ['./style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlloyStyle {
    constructor() {
    }
}
