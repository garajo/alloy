/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValidatorFn } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'alloy-property-editor-container',
    template:
    // tslint:disable-next-line:no-multiline-string
    `
        <alloy-property-grid-cell [componentType]='cellComponentType'
            [validators]='validators'
            [validatorMessages]='validatorMessages'
            [params]='params' (updateDataEvent)='onUpdate($event)'></alloy-property-grid-cell>
    `
})
export class AlloyPropertyGridEditorContainerComponent {
    // tslint:disable:no-any
    @Input() public cellComponentType: any;
    @Input() public params: any;
    @Output() public updateDataEvent = new EventEmitter<any>();
    // tslint:enable:no-any

    @Input() public validators: ValidatorFn[];
    @Input() public validatorMessages: { [key: string]: string };

    // tslint:disable-next-line:no-any
    public onUpdate(packedParams: any): void {
        // tslint:disable-next-line:no-unused-variable
        const [newParams, isKeyEnter] = packedParams;
        // console.log('onUpdate in Grid Component: ' + newParams.value);
        if (newParams.node &&
            this.params.node.data &&
            newParams.node.data.id &&
            this.params.node.data.id &&
            newParams.node.data.id === this.params.node.data.id) {
            this.updateDataEvent.emit(packedParams);
        }
    }
}
