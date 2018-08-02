# Alloy Dropdown

`<alloy-dropdown>` is a form control for dropdowning a value from a set of options, similar to the native
`<dropdown>` element. You can read more about dropdowns in the

### Simple dropdown

In your template, create an `alloy-dropdown` element. For each option you'd like in your dropdown, add an
`alloy-option` tag. Note that you can disable items by adding the `disabled` boolean attribute or
binding to it.

*my-comp.html*
```html
<alloy-dropdown placeholder="State">
   <alloy-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</alloy-option>
</alloy-dropdown>
```

### Getting and setting the dropdown value

The dropdown component is set up as a custom value accessor, so you can manipulate the dropdown's value using
any of the form directives from the core `FormsModule` or `ReactiveFormsModule`: `ngModel`, `formControl`, etc.

*my-comp.html*
```html
<alloy-dropdown placeholder="State" [(ngModel)]="myState">
   <alloy-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</alloy-option>
</alloy-dropdown>
```

*my-comp.ts*
```ts
class MyComp {
  myState = 'AZ';
  states = [{code: 'AL', name: 'Alabama'}...];
}
```

### Placeholder binding

You can bind a placeholder to a dynamic value by id adding `[placeholder]` binding.

*my-comp.html*
```html
<alloy-dropdown [placeholder]="placeholder">
   <alloy-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</alloy-option>
</alloy-dropdown>
```

### Resetting the dropdown value

If you want one of your options to reset the dropdown's value, you can omit specifying its value:

*my-comp.html*
```html
<alloy-dropdown placeholder="State">
   <alloy-option>None</alloy-option>
   <alloy-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</alloy-option>
</alloy-dropdown>
```

#### Keyboard interaction: (Not implemented yet)
- <kbd>DOWN_ARROW</kbd>: Focus next option
- <kbd>UP_ARROW</kbd>: Focus previous option
- <kbd>ENTER</kbd> or <kbd>SPACE</kbd>: dropdown focused item

#### Multiple Selection

you can allow user to do multiple selection by adding the `multiple` attribute. Using [selectAllOption], you can add a checkbox at the top of the list to allow toggling of select/deselect all.

*my-comp.html*
```html
<alloy-dropdown multiple>
   <alloy-option *ngFor="let state of states" [selectAllOption]="state.code" [value]="state.code">{{ state.name }}</alloy-option>
### Filtering

You can allow users to do a search on the dropdown by adding `[filterable]` binding.

*my-comp.html*
```html
<alloy-dropdown [filterable]="true">
   <alloy-option *ngFor="let state of states" [value]="state.code">{{ state.name }}</alloy-option>
</alloy-dropdown>
```