# Alloy Checkbox

**`<alloy-checkbox>` <span style="color:red">is now deprecated**<span>.
Instances of `<alloy-checkbox>` should be migrated to the new directive:

## Migration

Deprecated:

```html
<alloy-checkbox label="string" icon="className"></allow-checkbox>
```

becomes:

```html
<input type="checkbox" alloy alloyLabel="string" alloyIcon="className">
```

## Full API

```html
<input type="checkbox" alloy
   [alloyLabel]="string"
   [alloyIcon]="sourceString"
   [disabled]="boolean"
   [checked]="boolean"
   [readonly]="boolean"
   [size]="number"
   [error]="boolean" [errorMessage]="string">
```

`alloyIcon` and `alloyLabel` are attributes of the generic `IdentityDirective` which is supported in many widgets.

### Attributes

* disabled - Same as `input disabled`
* checked  - Same as `input checked="state"`
* size     - Current changes *only* the box size
* error    - Sets the error styling for the checkbox
* errorMessage - sets the `title` (tooltip) for the checkbox *if* `[error]`
* readonly     - does not exist for `input [checkbox]`, this sets `disabled` and slightly different styling

### Label binding

You can bind a label to a dynamic value by adding `[alloyLabel]` binding.

```html
<input type="checkbox" alloy
   [alloyLabel]="string">
```

### Icon binding

You can bind an icon to a dynamic value by adding `[alloyIcon]` binding.

```html
<input type="checkbox" alloy
   [alloyIcon]="className">
```

### Mixed binding

You can bind both a label as well as an icon to the checkbox by adding both `[alloyLabel]` and `[alloyIcon]` bindings.
The icon will appear to the left of the label.
