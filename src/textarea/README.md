# Alloy Textarea

`<alloy-textarea>` is used to add alloy textarea.

Alloy textarea has all the attributes defined for a regular textarea element. Following is the
list of the attributes:
[autocapitalize]
[autocomplete]
[autofocus]
[cols]
[disabled]
[form]
[height]
[maxlength]
[minlength]
[name]
[placeholder]
[readonly]
[required]
[spellcheck]
[type]
[rows]
[value]
[width]
[wrap]

All the attributes can be binded to variables like the follwing example. 
Defining the dimensions of the textarea can be done either by setting values for 
"rows" and "cols" attributes or "height" and "Width" attributes. If both set of attributes are assigned with values, "height" and "width" values will apply.

*my-comp.html*
```html
<alloy-textarea
    [rows]="rows" [cols]="cols"
    [height]="height" [width]="width"
    [resize]="resize"
    [dirname]="dirname"
    [form]="form"
    [maxlength]="maxlength"
    [minlength]="minlength"
    [name]="name"
    [placeholder]="placeholder"
    [wrap]="wrap"
    [type]="type"
    [value]="value"
    [autofocus]="true" 
    [disabled]="disabled" 
    [readonly]="readonly"
    [required]="required"
    [spellcheck]="spellcheck">
</alloy-textarea>
```

Following are the description for all the attributes applicable for textarea.
Referenc: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea

autofocus
    This Boolean attribute lets you specify that a form control should have input focus when the page loads, unless the user overrides it, for example by typing in a different control. Only one form-associated element in a document can have this attribute specified. 

cols
    The visible width of the text control, in average character widths. If it is specified, it must be a positive integer. If it is not specified, the default value is 20 (HTML5).

disabled
    This Boolean attribute indicates that the user cannot interact with the control. (If this attribute is not specified, the control inherits its setting from the containing element, for example <fieldset>; if there is no containing element with the disabled attribute set, then the control is enabled.)

form
    The form element that the <textarea> element is associated with (its "form owner"). The value of the attribute must be the ID of a form element in the same document. If this attribute is not specified, the <textarea> element must be a descendant of a form element. This attribute enables you to place <textarea> elements anywhere within a document, not just as descendants of their form elements.

height
    Sets the height of the textarea in px.

maxlength
    The maximum number of characters (Unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters.

minlength
    The minimum number of characters (Unicode code points) required that the user should enter.

name
    The name of the control.

placeholder
    A hint to the user of what can be entered in the control. Carriage returns or line-feeds within the placeholder text must be treated as line breaks when rendering the hint.

readonly
    This Boolean attribute indicates that the user cannot modify the value of the control. Unlike the disabled attribute, the readonly attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.

required
    This attribute specifies that the user must fill in a value before submitting a form.
    
rows
    The number of visible text lines for the control.

spellcheck
    Setting the value of this attribute to true indicates that the element needs to have its spelling and grammar checked. The value default indicates that the element is to act according to a default behavior, possibly based on the parent element's own spellcheck value. The value false indicates that the element should not be checked.

type
    Returns the type of the form element the text area is.

value
    Sets or returns the contents of a text area.

width
    Sets the width of the textarea in px.

wrap
    Indicates how the control wraps text. Possible values are:
    "hard": The browser automatically inserts line breaks (CR+LF) so that each line has no more than the width of the control; the cols attribute must be specified.
    "soft": The browser ensures that all line breaks in the value consist of a CR+LF pair, but does not insert any additional line breaks.
    "off":  Like soft but changes appearance to white-space: pre so line segments exceeding cols are not wrapped and area becomes horizontally scrollable.
    If this attribute is not specified, soft is its default value.