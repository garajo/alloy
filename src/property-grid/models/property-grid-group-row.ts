/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { AlloyPropertyGridPropertyRow } from './property-grid-property-row';

// This class defines the fields that define a groupRow row in the alloyPropertyGrid.
// Note that since a groupRow has a collection of childRows you can think of a groupRow
// as a node/row in the tree, that expands to N child node/rows.
// I stayed with the "row" name since that matches ag-grid terminology
// even though we are dealing with a "tree" and it's nodes.

export class AlloyPropertyGridGroupRow {
    // Collapsed indicates the starting state for this group.
    // When false (default) --the group is shown as expanded.
    // when true            --the group is shown as collapsed.
    public collapsed: boolean;

    // Description is used to populate a future "Description" area
    // at the bottom of the apg.  See the K design guidelines for
    // property grids.
    public description: string;

    constructor(
        // Name is the text displayed in the name column, on the left side of the agp.
        // Currently there is no need to "lookup" rows by group.
        // If in the future we do need to lookup rows by group, then you should
        // create an id property that will be unique.  This will maintain parallelism with the
        // PropRow class (which has both a non unique name property, and a unique Id property);
        public name: string,

        // A group row typical has a a children property, which is an array
        // Members of the children array are either another GroupRow, or a PropRow
        // There is a corner case where a GroupRow may have no children.
        public children: (AlloyPropertyGridGroupRow | AlloyPropertyGridPropertyRow) []) {
            this.collapsed = false;
            this.description = '';
    }
}




