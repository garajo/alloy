# Alloy Textbox

`<alloy-textbox>` is used to add alloy textbox component.

Alloy textbox has most of the attributes defined for a regular input text element. Following are the
list of the attributes:
[size]
[maxlength]
[placeholder]
[value]
[required]
[pattern]
[disabled]
[readonly]

All the attributes can be bound to variables like in the following example.
*my-comp.html*
```html
<alloy-textbox 
    [size]="width" 
    [maxLength]="maxLength" 
    [placeholder]="placeholder" 
    [defaultValue]="defaultValue" 
    [disabled]="disabledSimple"
    [required]="requiredSimple"
    [readonly]="readonly"
    [pattern]="regexPattern">
</alloy-textbox>
```

size
    Sets the value of the size attribute of the text box component.

maxlength
    The maximum number of characters (Unicode code points) that the user can enter. If this value isn't specified, the user can enter an unlimited number of characters.

placeholder
    A hint to the user of what can be entered in the text box component.

defaultValue	
    Sets the default value of the text box component.

disabled
    This Boolean attribute indicates that the user cannot interact with the text box component. 

required
    This attribute specifies that the user must fill in a value before submitting a form.

readonly
    This Boolean attribute indicates that the user cannot modify the contents of the text box component. Unlike the disabled attribute, the readonly attribute does not prevent the user from clicking or selecting in the control. The value of a read-only control is still submitted with the form.

pattern
    The pattern attribute specifies a regular expression that the the text box component field's value is checked against.
