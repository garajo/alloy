/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import {
    Component,
    AfterViewInit,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    OnDestroy,
    Renderer2
} from '@angular/core';

import { ContextMenuService } from 'ngx-contextmenu';
import { GridOptions } from 'ag-grid/main';
import { ValidatorFn } from '@angular/forms';

import { AlloyContextMenuComponent } from './../contextmenu/contextmenu';
import { AlloyPropertyGridDynamicControlService } from './services/property-grid-dynamic-control.service';
import { AlloyPropertyGridEditorViewerComponent } from './editors/property-grid-editor-viewer.component';
import { AlloyPropertyGridMessageService } from './services/property-grid-message.service';
import { AlloyPropertyGridOutputService } from './services/property-grid-output.service';
import { AlloyPropertyGridTreeUtility } from './services/property-grid-tree-utility';
import { AlloyPropertyGridTypeService } from './services/property-grid-type.service';
import { AlloyPropertyGridValidatorService } from './services/property-grid-validator.service';
import { IPropertyGridOption } from './models/property-grid-option';
import { ISubscription } from 'rxjs/Subscription';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'alloy-property-grid',
    templateUrl: './property-grid.component.html'
})
export class AlloyPropertyGridComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    // tslint:disable:no-any
    public columnDefs: any[] = [];
    public componentType: any[];
    public gridOptions: GridOptions;
    public pgDescriptionText: { name: string, description: string } = { name: '', description: '' };
    public showGrid: boolean;

    // input
    // tslint:disable-next-line:no-input-rename
    @Input('gridOption')
    private internalGridOption: IPropertyGridOption;
    get gridOption(): IPropertyGridOption {
        return this.internalGridOption;
    }

    @Input('gridOption')
    set gridOption(value: IPropertyGridOption) {
        console.log('gridOption: '.concat(JSON.stringify(value)));
        this.internalGridOption = value;
    }

    // tslint:disable-next-line:no-input-rename no-any
    @Input('nodeModel') // public rowData: any[];
    // tslint:disable:no-any at the beginning
    private internalRowData: any[];
    get rowData(): any[] {
        return this.internalRowData;
    }

    @Input('nodeModel')
    set rowData(value: any[]) {
        // console.log('setter: '.concat(JSON.stringify(value)));
        if (!AlloyPropertyGridTreeUtility.compareTrees(this.internalRowData, value) || AlloyPropertyGridTreeUtility.checkError(value)) {
            this.internalRowData = value;
        }
    }
    // tslint:disable-next-line:no-input-rename no-any
    @Input('styledControls') public styledControls: any[];

    @Input() public validators: ValidatorFn[];

    // tslint:disable-next-line:no-any
    @Input() public validatorMessages: any[];

    // 'enableDescription' can be renamed when implementing grid-search so that this Input parameter will hold
    // both the controls for the property description box and grid-search
    // tslint:disable-next-line:no-input-rename
    @Input('enableDescription') public isDescriptionVisible: boolean;

    // ~ For customizable rowHeight ~
    // Caranu spec says 28px row heights for the content of the "right side" editable properties.
    // Looks like we've determined that 28px is the right height for the ag grid row which accounts for the 24px content height
    // and leaves a little extra space (28-24 = 4px) for 2px padding top and bottom
    // In Swivel, rowHeight is set at 32px for all grids.
    @Input() public rowHeight = 28;

    // ~ For customizable contextmenu ~
    // DO NOT call it 'contextMenu/alloyContextMenu'. It conflicts with ContextMenuDirectives and Component.
    @Input() public contextMenuTemplate: AlloyContextMenuComponent;

    // tslint:disable-next-line:no-any
    @Output() public updateDataEvent = new EventEmitter<any>();

    // events listner
    @HostListener('focusin', ['$event'])
    // tslint:disable-next-line:no-any
    public onFocusIn(event: any): void {
        // console.log('focus in');
    }
    @HostListener('focusout', ['$event'])
    // tslint:disable-next-line:no-any
    public onFocusOut(event: any): void {
        // console.log('focus out');
    }

    @HostListener('document: scroll' , ['$event'])
    // tslint:disable-next-line:no-any
    public onDocumentScroll(event: any): void {
        // console.log('Document on Scroll');
    }
    // tslint:disable-next-line:member-ordering
    private subscription: ISubscription;

    // data model creation
    constructor(private typeService: AlloyPropertyGridTypeService,
        private controlsService: AlloyPropertyGridDynamicControlService,
        private outputService: AlloyPropertyGridOutputService,
        private validatorService: AlloyPropertyGridValidatorService,
        private messageService: AlloyPropertyGridMessageService,
        private contextMenuService: ContextMenuService,
        private renderer: Renderer2) {
        this.showGrid = true;
        this.gridOptions = <GridOptions>{};
        this.isDescriptionVisible = false; // description box by default is not enabled

        // set the options
        this.gridOptions = {
            singleClickEdit: false,
            enableGroupEdit: false,
            enableRangeSelection: false,
            stopEditingWhenGridLosesFocus: false,
            suppressFocusAfterRefresh: false,
            getNodeChildDetails: this.getNodeChildDetails,
            headerHeight: 0,
            animateRows: true,
            // The following function supposedly makes the grid responsive.
            // It was visible in the aggrid gui demo.
            // See https://www.ag-grid.com/javascript-grid-responsiveness/?framework=all#gsc.tab=0
            onGridReady: (() => { this.gridOptions.api.sizeColumnsToFit(); }),

            // change row height for dropdown
            getRowHeight: (params) => {
                return this.rowHeight;
            },

            // Listen for (contextmenu) event on each rows except group
            processRowPostCreate: (params) => {
                const eRow = params.eRow;
                if (eRow && !params.node.group && this.contextMenuTemplate) {
                    this.renderer.listen(eRow, 'contextmenu', (event) => this.onContextMenu(event, params.node.data));
                }
            }
        };

        this.internalRowData = [];
    }

    // Every context menu item emits execute events.
    // The $event object is of the form { event: MouseEvent, item: any },
    // where event is the mouse click event that triggered the execution and item is the current item.
    public onContextMenu($event: MouseEvent, data: any): void {
        this.contextMenuService.show.next({
            contextMenu: this.contextMenuTemplate,
            event: $event,
            item: data
        });
        $event.preventDefault();
        $event.stopPropagation();
    }

    public ngAfterViewInit(): void {
        // empty is OK
    }
    // data model checking
    public ngOnInit(): void {
        // read column information from gridOption
        const nameColumn = this.internalGridOption.getColumns().find(x => x.key === 'name');
        const valueColumn = this.internalGridOption.getColumns().find(x => x.key === 'value');

        // If no width information from client, set the dfault width
        const nameColumnWidth = nameColumn ? nameColumn.width : 200;
        const valueColumnWidth = valueColumn ? valueColumn.width : 200;

        // Since this file is generic to Alloy, and represents a property GRID, think of the
        // left side  (called name)   as handling NAMES  of branches and leaves in the tree       and the
        // right side (called value) as  handling VALUES of              leaves in the tree ONLY.
        this.columnDefs = [
            {
                headerName: 'Name',
                field: 'name',
                // According to this page, percents are NOT allowed:
                // https://www.ag-grid.com/javascript-grid-column-properties/#gsc.tab=0
                // We may want to allow for dynamic calculation of this, but that runs the
                // risk of having of the name column drastically changing size as data changes.
                // Perhaps a better approach would be to calculate the width based on depth of group
                // The code below assumes a depth of 1.
                width: nameColumnWidth,
                editable: false,
                cellRenderer: 'group',
                cellRendererParams: {
                    suppressCount: true,
                    padding: 20 // Hand adjust to approximate the 12 px inset I see in the Alloy demo
                    // innerRenderer: this.getSimpleCellRenderer() // this allows us to dim the text of the label column
                },
                colSpan: (params) => {
                    // an undefined typeName indicates a group node, which should span 2 columns
                    if (!params.node.data.typeName) {
                        // tslint:disable-next-line:no-magic-numbers
                        return 2;
                    } else {
                        return 1;
                    }
                }
            },
            {
                headerName: 'Value',
                field: 'value',
                // The width was hand adjusted to allow the error icon to show.
                width: valueColumnWidth,
                // cellStyle: { 'text-align': 'left' },
                editable: true,
                cellEditorFramework: AlloyPropertyGridEditorViewerComponent,
                cellRendererFramework: AlloyPropertyGridEditorViewerComponent,
                // dynamic cell's div height calculation
                cellStyle: (params) => {
                    if (params.node.data &&
                        params.node.data.typeName === 'Enum' &&
                        params.node.data.values) {
                        // each drop item has 40 pxcel, plus top item and extra gap height has 40(=32+8) pixel
                        const heightString = String(params.node.data.values.length * 40 + 40) + 'px';
                        return { height: heightString };
                    } else {
                        return null;
                    }
                }
            }
        ];

        // receive changed value with payload from AlloyPropertyGridEditorViewerComponent via outputService
        this.subscription = this.outputService.getOutput()
            .subscribe((packedPayload) => {
                // tslint:disable-next-line:no-unused-variable
                const [payload, params, isKeyEnter] = packedPayload;
                // tslint:disable-next-line:no-unused-variable
                const [control, isLandingEnterKey, isSupportCellEditing] = this.controlsService.getControl(params.node.data.typeName);
                if (payload && payload.length > 0) {
                    // update only changed property's value
                    AlloyPropertyGridTreeUtility.updateData(this.internalRowData, payload);
                    // stop updated cell editing
                    // the Alloy Dropbox do not support Ag-Grid's stopEditing() API call
                    // If call, you get this critical error.
                    // ObjectUnsubscribedError: object unsubscribed at new ObjectUnsubscribedError EventEmitter.Subject.next
                    if (isSupportCellEditing) {
                        this.gridOptions.api.stopEditing(true);
                    }
                    this.updateDataEvent.emit(payload);
                }
                if (isKeyEnter) {
                    // move focus to next hopping cell
                    this.handleNextFocus(packedPayload, isSupportCellEditing);
                }
            });
    }

    public ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = undefined;
        }
    }
    // unused for now, so commented out
    // this is tricky, so I wanted to save the technique
    // private getSimpleCellRenderer() {
    //     // tslint:disable-next-line:no-unused-expression
    //     class SimpleCellRenderer {
    //         eGui: any;
    //         init(params) {
    //             const tempDiv = document.createElement('div');
    //             if (!params.node.group && params.node.data.readOnly) {
    //               tempDiv.innerHTML =
    //               '<span class="ag-cell-readonly">' +
    //               params.value +
    //               '</span>';
    //             } else {
    //               tempDiv.innerHTML =
    //               '<span>' + params.value + '</span>';
    //             }
    //             this.eGui = tempDiv.firstChild;
    //         }
    //         getGui() {
    //             return this.eGui;
    //         }
    //     };
    //     return SimpleCellRenderer;
    // }

    // tslint:disable-next-line:no-any
    public ngOnChanges(changes: any): void {
        const changedProperty = changes;

        if (changedProperty && changedProperty.branch && changedProperty.branch.currentValue) {
            // this.updateProperties(changedProperty.branch.currentValue);
            this.internalRowData = changedProperty.branch.currentValue;
            this.typeService.setRowData(this.internalRowData);
        }

        if (this.styledControls) {
            this.controlsService.setControls(this.styledControls);
        }

        if (this.validators) {
            this.validatorService.setValidator(this.validators, this.validatorMessages);
        }
    }

    // cell click event listner
    // tslint:disable-next-line:no-any
    public onCellClicked($event: any): void {
        // const keys = Object.keys( $event.data );
        if ($event.colDef.field !== 'value') {
            // Try to edit the Value column
            this.gridOptions.api.setFocusedCell($event.rowIndex, 'value');
            this.gridOptions.api.startEditingCell({
                rowIndex: $event.rowIndex,
                colKey: 'value'
            });
        }
        // test
        // console.log('getRowStyle() : ' + this.gridOptions.getRowStyle());

        // // I need it in the future
        // console.log('onCellClicked: '.concat($event.rowIndex).concat(' ').concat(($event.colDef.field)));
        // console.log('key: '.concat($event.column.colId));
        // console.log('value: '.concat($event.data[$event.column.colId]));
        // // tslint:disable-next-line:valid-typeof
        // console.log('data type: '.concat(typeof($event.data[$event.column.colId])));
        // console.log('Is Array: '.concat(Array.isArray($event.data[$event.column.colId]).valueOf.toString()));
        // if (Array.isArray($event.data[$event.column.colId])) {
        //     // tslint:disable-next-line:valid-typeof
        //     console.log('array data type: '.concat(typeof($event.data[$event.column.colId][0])));
        // }

        // switch (typeof($event.data[$event.column.colId])) {
        //     case 'boolean':
        //         // tslint:disable-next-line:no-magic-numbers
        //         this.typeService.sendType(this.componentType[0]);
        //     break;
        //     case 'string':
        //         this.typeService.sendType(this.componentType[2]);
        //     break;
        //     default:
        //         this.typeService.sendType(this.componentType[1]);
        //     break;
        // }
        //    event.stopImmediatePropagation();
    }

    // tslint:disable-next-line:no-any
    public onCellValueChanged($event: any): void {
        // console.log('onCellValueChanged: '.concat($event.data[$event.column.colId]));
    }

    // tslint:disable-next-line:no-any
    public onCellEditingStopped($event: any): void {
        // console.log('onCellEditingStopped: '.concat($event.data[$event.column.colId]));
    }

    // This event handler, send a event to Textfiled for Showing editor cursor
    public onCellEditingStarted($event: any): void {
        this.messageService.publishEditCell();
    }

    // row click event listner (mouseClick event only)
    // tslint:disable-next-line:no-any
    public onRowClicked($event: any): void {
        // I need it in the future
        // console.log('onRowClicked: '.concat($event.node.data.typeName));
        // console.log('title: '.concat($event.node.data.title));
    }

    // Fix _pgDescriptionText when user tried to do a copy from <Inputbox A>
    // and paste into <Inputbox B>, _pgDescriptionText do not get updated
    // Problem is caused by user actions not performing a rowClick(mouseClick event). Instead its a mouseDown event.
    public onCellFocused($event: any): void {
        if (this.isDescriptionVisible) {
            const rowData = this.gridOptions.api.getDisplayedRowAtIndex($event.rowIndex);
            if (rowData && rowData.hasOwnProperty('data')) {
                this.pgDescriptionText = rowData.data;
            }
        }
    }

    // tslint:disable-next-line:no-any
    public onRowDoubleClicked($event: any): void {

        // This code implements a double click to expand/contract rows.
        // While this is NOT the alloy behavior, it is the VS2015/outlook behavior
        // I could not figure out how to get a single click to open a ROW with out it
        // interfering with the click on the expand/contract icon.
        // Also note that it only works on a double click inside the name column, and
        // does not work on a double click inside the value column.
        // That feature MAY be possible via the aggrid groupUseEntireRow feature, but that is
        // only available in the (expensive) enterprise version.

        // See https://stackoverflow.com/questions/40083804/ag-grid-expand-row for related discussion.

        // If it is expanded, then contract, and vice versa.
        $event.node.expanded = $event.node.expanded ? false : true;
        this.gridOptions.api.onGroupExpandedOrCollapsed($event.rowIndex);
    }

    // customer render by name type
    // tslint:disable-next-line:no-any
    public customEditorComponent(params: any): any {
        // const data = params.node.data;
        // const skills = [];
        // I need it in the future
        // console.log('params.node.data.content: '.concat(params.node.data.content));
    }

    // See https://www.ag-grid.com/javascript-grid-tree/#gsc.tab=0 for
    // a description on what is going on here.
    // tslint:disable-next-line:no-any
    public getNodeChildDetails(rowItem: any): any {
        if (rowItem.children) {
            return {
                group: true,
                expanded: true,
                // provide ag-Grid with the children of this group
                children: rowItem.children,
                // the key is used by the default group cellRenderer
                key: rowItem.group
            };
        } else {
            // tslint:disable-next-line:no-null-keyword
            return null;
        }
    }

    // tslint:disable-next-line:no-any
    public getStyles(): any {
        let styles = {
            'width': this.internalGridOption ? this.internalGridOption.width : '400px',
            'height': this.internalGridOption ? this.internalGridOption.height : '600px'
        };
        return styles;
    }

    // tslint:disable-next-line:no-any
    private handleNextFocus(packedPayload: any, isSupportCellEditing: boolean): void {
        // tslint:disable-next-line:no-unused-variable
        const [payload, params, isKeyEnter] = packedPayload;
        const nextDisplayedRow = this.controlsService.getNextEditableRowIndex(this.gridOptions.api, params.rowIndex);

        if (nextDisplayedRow !== params.rowIndex && isSupportCellEditing) {
            // move focus and start editing mode
            this.gridOptions.api.setFocusedCell(nextDisplayedRow, 'value');
            this.gridOptions.api.startEditingCell({
                rowIndex: nextDisplayedRow,
                colKey: 'value'
            });
        }
    }

    // Available to parent component for description clearing with @ViewChild
    public clearDescriptionBox(): void {
        // Reset description box when enabled
        if (this.isDescriptionVisible) {
            this.pgDescriptionText = { name: '', description: '' };
        }
    }
}
