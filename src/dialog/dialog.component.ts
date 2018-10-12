/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */
import { Component, Inject, OnInit, ComponentFactoryResolver, ViewChild,
        HostListener, ElementRef, AfterViewInit, ReflectiveInjector } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogHostDirective } from './directives/dialog-host.directive';
import { DialogUtility } from './services/dialog-utility.service';
import { ResizerComponent } from './resizer/resizer.component';
import { ALLOY_DIALOG_DATA } from './tokens/dialog.token';
import { IDialogComponent } from './models/dialog';

@Component({
    selector: 'alloy-dialog',
    templateUrl: 'dialog.component.html',
    host: { 'class': 'alloy-dialog' } // tslint:disable-line:use-host-property-decorator
    // Needed host: to retrieve the $color-palette
})
export class DialogComponent implements OnInit, AfterViewInit {
    public title: string;
    @ViewChild(DialogHostDirective) private dialogHost: DialogHostDirective;
    @ViewChild(ResizerComponent) private resizer: ResizerComponent;

    constructor(// tslint:disable-next-line:no-any Reason component data could be of any type and could vary.
        @Inject(MAT_DIALOG_DATA) public data: any,
        private componentFactoryResolver: ComponentFactoryResolver,
        private dialogRef: MatDialogRef<IDialogComponent>,
        private dialogUtility: DialogUtility,
        private selfRef: ElementRef) {
    }

    public ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
        this.dialogHost.viewContainerRef.createComponent(componentFactory, 0, this.createInjector());
        this.title = this.dialogRef.componentInstance.dialogConfig.title;
    }

    public ngAfterViewInit(): void {
        if (this.dialogRef.componentInstance.dialogConfig.draggable) {
            setTimeout(() => {
                this.resizer.attach(this.dialogRef);
            });
        }
    }

    @HostListener('mousedown', ['$event'])
    public handleClick(_event: Event): void {
        this.dialogUtility.notifyFocus(this.dialogRef);
    }

    public focus(): void {
        this.selfRef.nativeElement.parentNode.focus();
    }

    public get dialogOverlay(): any { // tslint:disable-line:no-any
        return this.selfRef.nativeElement.parentNode.parentNode.offsetParent;
    }

    public onClose(): void {
        this.dialogUtility.notifyClose({ dialogRef: this.dialogRef, item: this.data });
    }

    private createInjector(): ReflectiveInjector {
        const data = { dialogRef: this.dialogRef, content: this.data.content };
        const reflectiveProvider = ReflectiveInjector.resolve([{ provide: ALLOY_DIALOG_DATA, useValue: data }]);
        return ReflectiveInjector.fromResolvedProviders(reflectiveProvider);
    }
}