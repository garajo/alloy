/*
 * Copyright Keysight Technologies, All Rights Reserved
 * Keysight Confidential
 */

import { Component, OnDestroy, ElementRef } from '@angular/core';

import * as Draggabilly from 'draggabilly';

import { DialogUtility } from '../services/dialog-utility.service';
import { MatDialogRef } from '@angular/material';
import { IDialogComponent } from '../models/dialog';

@Component({
    selector: 'dialog-resizer', // tslint:disable-line:component-selector
    templateUrl: 'resizer.component.html',
    host: {
        'class': 'dialog-resizer'
    } // tslint:disable-line:use-host-property-decorator
})
export class ResizerComponent implements OnDestroy {
    public isResizable = false;

    private minWidth: number;
    private minHeight: number;
    private draggie: Draggabilly;
    private panel: HTMLElement;
    private maxWidth: number;
    private maxHeight: number;
    private width: number;
    private height: number;
    private mouseUpHandler: (event: MouseEvent) => void;
    private mouseMoveHandler: (event: MouseEvent) => void;
    private styleMutationObserver: MutationObserver;
    private styleMutationObserverInit: MutationObserverInit;

    constructor(
        private dialogUtility: DialogUtility,
        private selfRef: ElementRef
    ) {
        this.mouseUpHandler = this.onMouseUp.bind(this);
    }

    public ngOnDestroy(): void {
        if (this.draggie) {
            this.draggie.destroy();
        }

        if (this.styleMutationObserver) {
            this.styleMutationObserver.disconnect();
        }
    }

    public attach(dialogRef: MatDialogRef<IDialogComponent>): void {
        const { dialogConfig } = dialogRef.componentInstance;
        const panelClass = '.' + dialogConfig.panelClass;

        if (dialogConfig.draggable) {
            this.draggie = new Draggabilly(panelClass, {
                containment: true,
                handle: '.title-bar'
            });

            this.draggie.on('pointerDown', (event: PointerEvent, pointer: PointerEvent): void => {
                if (this.styleMutationObserver) {
                    this.styleMutationObserver.disconnect();
                }
                this.dialogUtility.notifyFocus(dialogRef);
            });
        }

        if (dialogConfig.resizable && dialogConfig.draggable) {
            this.isResizable = true;
            this.draggie.on('dragEnd', (event: PointerEvent, pointer: PointerEvent): void => {
                this.styleMutationObserver.observe(this.panel, this.styleMutationObserverInit);
            });

            this.panel = this.selfRef.nativeElement.closest(panelClass);
            this.panel.style.position = 'absolute';
            this.panel.style.justifyContent = 'normal';
            this.panel.style.alignItems = 'normal';

            this.minWidth = this.panel.offsetWidth;
            this.minHeight = this.panel.offsetHeight;
            this.maxWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
            this.maxHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
            this.panel.style.left = this.getPx(this.calcCenter(this.maxWidth, this.minWidth));
            this.panel.style.top = this.getPx(this.calcCenter(this.maxHeight, this.minHeight));
            this.panel.style.width = this.getPx(this.minWidth);
            this.panel.style.height = this.getPx(this.minHeight);

            // this style mutation is to check for width height change by code
            this.styleMutationObserverInit = { attributes: true, childList: false, subtree: false };
            this.styleMutationObserver = new MutationObserver(this.onMutation);
            this.styleMutationObserver.observe(this.panel, this.styleMutationObserverInit);
        }
    }

    public onMouseDownN(): void {
        this.mouseDown(this.onMouseMoveN);
    }

    public onMouseDownE(): void {
        this.mouseDown(this.onMouseMoveE);
    }

    public onMouseDownS(): void {
        this.mouseDown(this.onMouseMoveS);
    }

    public onMouseDownW(): void {
        this.mouseDown(this.onMouseMoveW);
    }

    public onMouseDownNE(): void {
        this.mouseDown(this.onMouseMoveNE);
    }

    public onMouseDownSE(): void {
        this.mouseDown(this.onMouseMoveSE);
    }

    public onMouseDownSW(): void {
        this.mouseDown(this.onMouseMoveSW);
    }

    public onMouseDownNW(): void {
        this.mouseDown(this.onMouseMoveNW);
    }

    private onMouseMoveN(event: MouseEvent): void {
        const { newLength, isNew } = this.getNewLength(this.height, this.minHeight, -event.movementY);
        if (isNew) {
            if (event.clientY >= 0) {
                this.panel.style.height =  this.getPx(newLength);
                this.panel.style.top = this.getPx(event.clientY);
            }
        }
        this.height -= event.movementY;
    }

    private onMouseMoveE(event: MouseEvent): void {
        const { newLength, isNew } = this.getNewLength(this.width, this.minWidth, event.movementX);
        if (isNew) {
            const left = parseFloat(this.panel.style.left);
            if (left + newLength <= this.maxWidth) {
                this.panel.style.width =  this.getPx(newLength);
            }
        }
        this.width += event.movementX;
    }

    private onMouseMoveS(event: MouseEvent): void {
        const { newLength, isNew } = this.getNewLength(this.height, this.minHeight, event.movementY);
        if (isNew) {
            const top = parseFloat(this.panel.style.top);
            if (top + newLength <= this.maxHeight) {
                this.panel.style.height = this.getPx(newLength);
            }
        }
        this.height += event.movementY;
    }

    private onMouseMoveW(event: MouseEvent): void {
        const { newLength, isNew } = this.getNewLength(this.width, this.minWidth, -event.movementX);
        if (isNew) {
            if (event.clientX >= 0) {
                this.panel.style.width =  this.getPx(newLength);
                this.panel.style.left = this.getPx(event.clientX);
            }
        }
        this.width -= event.movementX;
    }

    private onMouseMoveNE(event: MouseEvent): void {
        this.onMouseMoveN(event);
        this.onMouseMoveE(event);
    }

    private onMouseMoveSE(event: MouseEvent): void {
        this.onMouseMoveS(event);
        this.onMouseMoveE(event);
    }

    private onMouseMoveSW(event: MouseEvent): void {
        this.onMouseMoveS(event);
        this.onMouseMoveW(event);
    }

    private onMouseMoveNW(event: MouseEvent): void {
        this.onMouseMoveN(event);
        this.onMouseMoveW(event);
    }

    private mouseDown(mouseMoveHandler: (event: MouseEvent) => void): void {
        this.draggie.disable();
        this.styleMutationObserver.disconnect();

        this.maxWidth = Math.min(window.innerWidth, document.documentElement.clientWidth);
        this.maxHeight = Math.min(window.innerHeight, document.documentElement.clientHeight);
        this.height = parseFloat(this.panel.style.height);
        this.width = parseFloat(this.panel.style.width);
        this.mouseMoveHandler = mouseMoveHandler.bind(this);
        window.addEventListener('mouseup', this.mouseUpHandler);
        window.addEventListener('mousemove', this.mouseMoveHandler);
        event.stopPropagation();
    }

    private onMouseUp(event: DragEvent): void {
        this.draggie.enable();
        this.styleMutationObserver.observe(this.panel, this.styleMutationObserverInit);

        window.removeEventListener('mouseup', this.mouseUpHandler);
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        event.stopPropagation();
    }

    private onMutation: MutationCallback = (mutationList: MutationRecord[], observer: MutationObserver): void => {
        const styleMutation = mutationList.find((mutation) => mutation.attributeName === 'style');
        if (styleMutation) {
            this.minWidth = parseFloat(this.panel.style.width);
            this.minHeight = parseFloat(this.panel.style.height);
        }
    }

    private calcCenter(maxLength: number, elementLength: number): number {
        return maxLength / 2 - elementLength / 2; // tslint:disable-line:no-magic-numbers
    }

    private getPx(value: number): string {
        return value + 'px';
    }

    private getNewLength(length: number, minimum: number, movement: number): { newLength: number; isNew: boolean } {
        let newLength = (length + movement);
        let isNew = true;
        if (newLength < minimum) {
            newLength = minimum;
            isNew = false;
        }
        return { newLength, isNew };
    }
}
