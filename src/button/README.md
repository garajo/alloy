# Alloy Button

`<button alloy>` adds caranu styling to the native element.

The available styles are:

* Standard - This is the implied style. `<button alloy standard>` or  `<button alloy>`
* Default - The button attached to the 'enter' key. `<button alloy default>`
* Quick Access - The button styling for a quick access bar. `<button alloy quickaccess>`
* Toolbar - The button styling for a tool bar. `<button alloy toolbar>`

```html
<button alloy |type| [disabled]="disabled">
</button>
```

`Alloy Button` supports `IdentityDirective` and hence supports the `label` and `icon` attributes.

### Label binding

```html
<button alloy default label="My Label"></button>
```

### Icon binding

```html
<button alloy toolbar icon="my-icon-class"></button>
```

### Mixed binding

```html
<button alloy standard label="My Label" icon="my-icon-class"></button>
```

`Alloy Button` also supports the `ToggleDirective` and hence supports the `(toggle)` event.  $event is a boolean state of the button.
```html
<button alloy standard toggle (toggle)="onToggled($event)" label="My Label"></button>
```
