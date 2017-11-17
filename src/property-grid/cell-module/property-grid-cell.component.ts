/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import {
    Component,
    ComponentFactoryResolver,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewContainerRef,
    OnDestroy
} from '@angular/core';

import { AlloyPropertyGridMessageService } from '../services/property-grid-message.service';
import { ValidatorFn } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'alloy-property-grid-cell',
    template: ''
})
export class AlloyPropertyGridCellComponent implements OnInit, OnDestroy {
    // tslint:disable:no-any
    @Input() public componentType: any;
    @Input() public params: any;
    @Output() public updateDataEvent = new EventEmitter<any>();
    // tslint:enable:no-any

    @Input() public validators: ValidatorFn[];
    @Input() public validatorMessages: { [key: string]: string };

    // tslint:disable-next-line:no-any
    public reference: any;
    // tslint:disable-next-line:member-ordering
    private subscription: ISubscription;

    constructor(private viewContainerRef: ViewContainerRef,
                private cfr: ComponentFactoryResolver,
                private messageService: AlloyPropertyGridMessageService) {
        this.subscription = this.messageService.getMessage()
            .subscribe((newParams) => {
                // console.log('subscribe data: ' + newParams.value);
                // tslint:disable-next-line:no-unused-variable
                const [params, isKeyEnter] = newParams;
                this.params = params;
                this.updateDataEvent.emit(newParams);
            });
    }

    public ngOnInit(): void  {
        if (this.componentType) {
            const compFactory = this.cfr.resolveComponentFactory(this.componentType);
            const reference  = this.viewContainerRef.createComponent(compFactory);
            const dynamicComponent = reference.instance;
            // tslint:disable-next-line:no-any
            (dynamicComponent as any).params = this.params;
            // tslint:disable-next-line:no-any
            (dynamicComponent as any).setValidator(this.validators, this.validatorMessages);
        }
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
}
