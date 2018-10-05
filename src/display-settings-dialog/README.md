# Alloy Display Settings Dialog

`<alloy-display-settings-dialog>` is a component for common display setttings, supports color theme switching etc.

It is built extending the `alloy-dialog`

### Creating a Display Settings Dialog

1. Import Alloy Dialog Service and ALLOY_DIALOG_DATA.

```ts
import { AlloyDialogService, ALLOY_DIALOG_DATA } from './../dialog/index';
```

2. Inject `ALLOY_DIALOG_DATA: IAlloyDialogData` and use the configuration settings from the configuration file in the template - your custom data etc.

```ts
  constructor(private alloyDialogService: AlloyDialogService,
              @Inject(ALLOY_DIALOG_DATA) public data: IAlloyDialogData,
              private alloyThemingService: AlloyThemingService) {
  }
```

3. Call `closeDialog(id: string, data: any)` method on the injected dialogRef. `id` is the dialog's id. `data` is an optional parameter to emit back to dialog opener.
```ts
this.alloyDialogService.closeDialog(this.data.dialogRef.id);
```


