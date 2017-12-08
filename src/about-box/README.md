# Alloy About Box

`<alloy-about-box>` is a component for adding an About Box Dialog, often accessed from the Help Menu.

### Creating an About Box

Because the AlloyAboutBox is a dialog, it is added by adding a dialog to the ts file. The component is not directly added to the html file.

*my-comp.ts*
```ts
dialog: MatDialog;
dialogRef: MatDialogRef<AlloyAboutBox>;
this.dialogRef = this.dialog.open(AlloyAboutBox, {height: '300px', width: '550px', disableClose: true});
```

### Setting the application name

The application name appears at the top of the dialog box in large letters. You can set this value by setting the 'appName' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.appName = 'Application Name';
```

### Setting the About Box content text

The content text will be displayed in the About Box dialog. You can set this value by setting the 'content' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.content = 'Content text';
```

### Setting the copyright

The copyright will be displayed in the About Box dialog. You can set this value by setting the 'copyright' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.copyright = 'Keysight Technologies 2017';
```


### Setting the application icon

The icon will be displayed in the About Box dialog. You can set this value by setting the 'icon' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.icon = iconSrc.png;
```


### Setting the About Box title

The title will be displayed at the top of the About Box dialog. You can set this value by setting the 'title' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.title = 'title';
```


### Setting the application version

The version will be displayed in the About Box dialog. You can set this value by setting the 'version' variable.

*my-comp.ts*
```ts
dialogRef.componentInstance.version = '1.0.0';
```


