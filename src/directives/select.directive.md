# Select Directive

`AlloySelectDirective` is used to create a custom dropdown for the select element.

## Basic usage:

```html
<select alloy>
    <option value='o1'>Option Label 1</option>
    <option value='o2'>Option Label 2</option>
</select>
```

## Options:

The following can be added to the select element:
* `multiple` to select multiple options
* `filterable` to show a filter search in the dropdown
* `hasSelectAll` to show an option to select all options shown in the dropdown
* `alternateStyle` to style the dropdown according to the caranu alternate style
* `disabled` used to make the dropdown unable to be changed
* `readonly` also used to make the dropdown unchancable but with readonly styling

The following attributes can be added to individual option elements (same as non alloy option elements):
* `disabled` makes the option unclickable
* `selected` to select option when page loads
* `value` used to set the value used to identify options

Example with some attributes:
```html
<select multiple alloy filterable hasSelectAll alternateStyle>
    <option value='o1'>Option 1</option>
    <option value='o2' selected>Selected by default</option>
    <option value='o3' disabled>Disabled option</option>
</select>
```

The select element is always required to have an element selected so if a placeholder is desired it can be added as shown below. This creates a hidden option selected by default with an empty value.

```html
<select alloy placeholder="Placeholder">
    <option value='o1'>Option Label 1</option>
</select>
```

expands to:

```html
<select alloy>
    <option selected hidden value=''>Placeholder</option>
    <option value='o1'>Option Label 1</option>
</select>
```

The value of the dropdown can be binded using `[(ngModel)]`. For `select multiple` this will be an array of strings.

```html
<select alloy [(ngModel)]="var1">
    <option selected value='option1'>Option 1</option>
</select>
<select multiple alloy [(ngModel)]="var2">
    <option selected value='o1'>Option 1</option>
    <option selected value='o2'>Option 2</option>
</select>
```
Will result in `var1='option1'` and `var2=['o1','o2']`

The select directive can be used to apply an icon or label shown in the dropdown button that will not change when different options are selected.
```html
<select alloy alloyIcon="alloy-ic-tools">
    <option>Option 1</option>
</select>
```

`onOpen` and `onClose` output events can be used to detect when the dropdown opens or closes.
```html
<select alloy (onOpen)="openFunc()" (onClose)="closeFunc()">
    <option>Option 1</option>
</select>
```

## Behavior:

When the dropdown opens it will attempt to open below and expand to the right. If there is not enough space it will switch to opening up and/or expanding to the left. If there is not enough room to open in either direction it will open in the directions with the most room and adjust the width/height to fit in the viewport.

If there is no room for the button to expand to fit the content then the content will overflow with elipses instead over overflowing to the next line. Styling can be set for width or max width to force overflow.

Any styling applied to the element is applied to the button that is created to open the dropdown so the behavior of styling will be the same as a button.