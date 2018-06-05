# Alloy Display Settings Dialog

`<alloy-display-settings-dialog>` is a component for common display setttings, supports color theme switching etc.

### Creating a Display Settings Dialog

Because the AlloyDisplaySettingsDialog is a dialog, it is added by adding a dialog to the ts file. The component is not directly added to the html file.

*my-comp.ts*
```ts
dialog: MatDialog;
dialogRef: MatDialogRef<AlloyDisplaySettingsDialog>;
this.dialogRef = this.dialog.open(AlloyDisplaySettingsDialog, {height: '300px', width: '550px', disableClose: true});
```


### Setting the About Box title

The title will be displayed at the top of the About Box dialog. You can set this value by setting the 'title' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.title = 'title';
```


