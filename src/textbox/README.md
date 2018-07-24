# Alloy Textbox

`<input alloy>` is a directive used to apply caranu styling to an input.

`input` attributes can be bound to variables like in the following example.

```html
<input type="text" alloy
    [size]="number"
    [maxLength]="number"
    [placeholder]="string"
    [value]="string"
    [disabled]="bool"
    [required]="bool"
    [readonly]="bool"
    [error]="bool"
    [pattern]="regexPattern">
```

See https://www.w3schools.com/tags/tag_input.asp for more details.

`error` is actually introduced by the `ErrorDirective` which is part of `alloy`.  It will not be available in
pure HTML apps.  They can use `class="has-error ..."` directly.  More info on `ErrorDirective` is available [here](../directives/error.md).

Notably `checkbox`, `range` (slider) and `radio` are not implemented here.  The supported types are:

```css
        input [type=date] [alloy],
        input [type=datetime-local] [alloy],
        input [type=email] [alloy],
        input [type=month] [alloy],
        input [type=number] [alloy],
        input [type=password] [alloy],
        input [type=tel] [alloy],
        input [type=text] [alloy],
        input [type=time] [alloy],
        input [type=url] [alloy],
        input [type=week] [alloy],
```

# Angular

`app.module.ts`
```ts
  imports: [
    AlloyDirectivesModule
  ]
```

# Migration Notes

## Angular

**`<alloy-textbox>` <span style="color:red">is now deprecated**<span>.
Instances of `<alloy-textbox>` should be migrated to the new directive:

```html
<alloy-textbox defaultValue="whatYouSee"> -> <input type="text" alloy value="whatYouSee">
```

## HTML

Alloy no longer applies styling directly to native `input`.  If you were using
native elements you may get the legacy styling (with all its warts):

```html
<input class="alloy-textbox">
```

or the fixed styling with:

```html
<input class="alloy-text">
```

You can apply the legacy styling universally in your app with "alloy-*textbox*":

```css
input [type="text"],
input [type="number"] {
    @extend .alloy-textbox
}
```

or the fixed styling with "alloy-*text*":

```css
input [type="text"],
input [type="number"] {
    @extend .alloy-text
}
```
