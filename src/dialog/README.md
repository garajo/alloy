# Alloy Dialog

`<alloy-dialog>` is a fully-featured generic dialog component that is built using angular material dialog.
This base dialog comes with a title bar and can render any cuustom component given as it's content template.
In addition to the material dialog configuration settings, the dialog also offers options to make the dialog draggable and resizable.

## Usage example

In order to use the alloy dialog to create your custom dialog

* Create your custom component for the dialog's content and construct an `AlloyDialogItem`

```ts
export class AlloyDialogItem {
    component: Type<any>;
    content: any;
    constructor(component: Type<any>, content?: any);
}
```
`component` - (Required) The custom component to be injected into the Dialog.

`content` - Custom data to be injected into Dialog which can be retrieved via `IAlloyDialogData` inside injected component.

### Settings
Configuration settings for `AlloyDialogConfig`
* `panelClass: string`     -  (Required) Custom class for overlay pane. Mandatory when draggable is enabled.
* `id?: string`            -  ID for the dialog. If omitted, a unique one will be generated.
* `title: string`          -  (Required) Dialog title informaton.
* `data: AlloyDialogItem`  -  This takes your custom component for the dialog's content and custom data.
* `hasBackdrop?: boolean`  -  Whether the dialog has a backdrop. This property sets the mode of the dialog to either Modal or Modeless.
* `disableClose?: boolean` -  Whether the user can use escape or clicking outside to close a modal.
* `draggable?: boolean`    -  Whether the user can drag the dialog.
* `resizable?: boolean`    -  Whether the user can resize the dialog.
```ts
const CUSTOM_DIALOG_CONFIG: AlloyDialogConfig = {
    panelClass: 'custom-dialog',
    id: 'custom-id',
    title: 'My custom dialog',
    data: new AlloyDialogItem(CustomDialogComponentContent, {
        color: ['red', 'blue'],
        fruits: { a: pear, b: apple }
        ...
        ...
    }),
    hasBackdrop: true, /* Modal dialog. If you need a modeless dialog, set hasBackdrop: false */
    disableClose: true,
    draggable: true,
    resizable: true
};
```

Use `AlloyDialogService` to open the dialog.
```ts
AlloyDialogService.openDialog(CUSTOM_DIALOG_CONFIG);
```

### Obtaining injected data from AlloyDialogItem
Inject `ALLOY_DIALOG_DATA: IAlloyDialogData` in their constructor parameter.
```ts
@Inject(ALLOY_DIALOG_DATA) data: IAlloyDialogData
```

### Obtaining Dialog Reference
1) Directly from `IAlloyDialogData`
```ts
IAlloyDialogData.dialogRef
```

2) Through API `AlloyDialogService.getDialogRefById(id: string)`
```ts
const dialogRef = AlloyDialogService.getDialogRefById('custom-id')
```

### Opening a Dialog
`openDialog(config: AlloyDialogConfig)` opens a dialog with the given config and returns a dialog reference.
```ts
const dialogRef = AlloyDialogService.openDialog(CUSTOM_DIALOG_CONFIG);
```

### Closing a Dialog
Alloy Dialog already handles closing with its own title bar X button. However, AlloyDialogService also provide API to close a dialog.
* `closeDialog(id: string, data: any)` takes in a dialog id and an optional data to be emitted back to the caller component.
```ts
AlloyDialogService.closeDialog('custom-id', 'This is some optional data.');
```

### Dialog Closed callback
Caller component can subscribe to `dialogRef.afterClosed()`. It returns an observable data of the attached injected component.
```ts
dialogRef.afterClosed().subscribe((data: any) => {
    console.log(data); //Prints out 'This is some optional data.'
});
```

* The observable `data` needs to be updated in `dialogRef.beforeClosed()` in the Injected component so that the Caller component can receive the updated data with `dialogRef.afterClosed()`.
```ts
dialogRef.beforeClose().subscribe((data: any) => {
    this.data.content = 'This is some optional data.';
});
```

Note: For a real-time usage example of the dialog, refer about-box component that is built leveraging the `<alloy-dialog>`.
