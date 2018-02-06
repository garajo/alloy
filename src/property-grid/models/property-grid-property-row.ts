/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */

// This class defines the fields that define a property row in the alloyPropertyGrid
export class AlloyPropertyGridPropertyRow {
    // Description is used to populate a future "Description" area
    // at the bottom of the apg.  See the K design guidelines for
    // property grids.
    public description: string;

    // ErrorMessages are messages known prior to creating/updating the property row.
    // The source of error messages might be
    //  --a server in a client/server architecture.
    //  --any processing that occurs prior to the property row being created/updated.
    // The default value is an empty string.
    public errorMessages: string [];

    // Values are options known prior to creating/updating the dropdown for the property row.
    // The available values for the drop down are only known after the id
    // is used to access the actual propertyDefinition.
    // The default value is an empty string.
    public values: string [];

    // ReadOnly indicates that this property should be readonly
    // and not editable.
    // The default value is false.
    public readOnly: boolean;

    constructor(
        // Name is the text displayed in the name column, on the left side of the agp.
        // Corner cases allow for name to be non unique.
        public name: string,

        // TypeName is used by the agp to select the correct editor.
        // An editor matching this typeName MUST be identified by the client.
        public typeName: string,

        // Value is the initial value shown in the renderer, prior to editing.
        // For example, in the case of a dropdown, it is the selected value
        // The available values for the drop down are only known after the id
        // is used to access the actual propertyDefinition.
        // It is of type any to handle typical string representation, as well as booleans, ....
        public value: any,

        // id:  A unique identifer for this property.
        public id: string) {
            // Set some defaults
            this.errorMessages = [];
            this.values = [];
            this.readOnly = false;
    };
}
