# Alloy About Box

`<alloy-about-box>` is a component for adding an About Box Dialog that provides information about the application. 
It is often accessed from the Help Menu.

It is built extending the `alloy-dialog`

### Creating an About Box

1. Import Alloy Dialog Service and ALLOY_DIALOG_DATA.
```ts
import { AlloyDialogService, ALLOY_DIALOG_DATA } from './../dialog/index';
```

2. Inject `ALLOY_DIALOG_DATA: IAlloyDialogData` and use the configuration settings from the configuration file in the template - application name, version, icon etc.
```ts
    constructor(private alloyDialogService: AlloyDialogService,
                @Inject(ALLOY_DIALOG_DATA) public data: IAlloyDialogData) {
        this.appName = this.data.content.appName;
        this.content = this.data.content.content;
        this.copyright = this.data.content.copyright;
        this.icon = this.data.content.icon;
        this.version = this.data.content.version;
    }
```

3. Call `closeDialog(id: string, data: any)` method on the injected dialogRef. `id` is the dialog's id. `data` is an optional parameter to emit back to dialog opener.
```ts
this.alloyDialogService.closeDialog(this.data.dialogRef.id);
```