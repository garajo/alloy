/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PropertyType } from './assets/propertyType';

import { DataService } from './editors/services/data.service';
import { EditorService } from './editors/services/editor.service';

import {
    AlloyContextMenuComponent,
    AlloyPropertyGridGroupRow,
    AlloyPropertyGridPropertyRow,
    IPropertyGridOption,
    PropertyGridOption } from '@keysight/alloy';

import { EnumerationUtility } from './editors/services/enumeration.utility';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'client-property-editor',
    templateUrl: './property-editor.component.html'
})

export class PropertyEditorComponent implements OnInit, OnDestroy {
    public pgDescriptionText: { name: string, description: string } = { name: '', description: '' };
    public testStepName: Observable<string>;
    // tslint:disable-next-line:no-any
    public rowData:         (AlloyPropertyGridGroupRow | AlloyPropertyGridPropertyRow) [] = [];
    public internalRowData: (AlloyPropertyGridGroupRow | AlloyPropertyGridPropertyRow) [] = [];

    // tslint:disable:no-input-rename no-any
    public editors: any[] = [];
    public validators: any[] = [];
    public validatorMessages: any[] = [];
    // tslint:enable:no-input-rename no-any

    public gridOption: IPropertyGridOption = new PropertyGridOption('', '');

    // tslint:disable-next-line:member-ordering
    private subscription: ISubscription;

    // ~ Custom contextmenu items ~
    private contextMenuData: any;
    @ViewChild('propertyContextMenu') public propertyContextMenu: AlloyContextMenuComponent;

    constructor(private editorService: EditorService,
                private dataService: DataService) {
        this.updateEditors();
        this.updateValidators()
        this.updateValidatorMessages();
    }

    public ngOnInit(): void {
        // set layout configuration
        this.setGridOption();

        // get logic tree and add option into logic tree
        this.subscription = this.dataService.getData()
            .concatMap((data: any) => {
                this.internalRowData = data;
                return this.dataService.getOption();
            })
            .subscribe((data: any) => {
                const payload = [PropertyType.Enum, EnumerationUtility.getOptions(data, PropertyType.Enum.toString())];
                EnumerationUtility.addOptions(this.internalRowData, payload);
                this.rowData = this.internalRowData;
            },
            (err: string) => console.log(err));
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }

    private updateEditors(): void {
        this.editors = this.editorService.getEditors();
    }

    private updateValidators(): void {
        this.validators = this.editorService.getValidators();
    }

    private updateValidatorMessages(): void {
        this.validatorMessages = this.editorService.getValidatorMessages();
    }


    // tslint:disable-next-line:no-any
    public onUpdate(packedParams: any): void {
        const [id, value] = packedParams;
        console.log('onUpdate in Property Component: ' + id + ' : ' + value);
        // const data = payload;
    }

    private setGridOption(): void {
        // set the property grid's width and height
        // tslint:disable-next-line:prefer-const
        let option = new PropertyGridOption('400px', '800px');
        // set the each columns width
        const columns = [
            { key: 'name', width: 200 },
            { key: 'value', width: 200 }
        ];
        option.setColumns(columns);

        // inject into gridOption input
        this.gridOption = option;
    }

    public onContextMenuPress(event: any): void {
        this.contextMenuData = event.item;
        console.log('Do something with the selected data...', this.contextMenuData);
    }
}
