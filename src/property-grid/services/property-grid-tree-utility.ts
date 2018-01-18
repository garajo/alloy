/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */

export class AlloyPropertyGridTreeUtility {
    // update tree model by payload data
    // tslint:disable-next-line:no-any function-name
    public static updateData(parent: any, payload: any): boolean {
        const [id, value] = payload;
        if (parent) {
            // check to see if parent is the element right away
            // checking for leaf node, maybe see if it has .children?
            if (parent.id && parent.value) {
                if (parent.id === id) {
                    parent.value = value;
                    return true;
                }
            }
            // // check the parent's children
            if (parent.children) {
                // using for loop instead of forEach so I can break out if we find it
                for (const child of parent.children) {
                    if (this.updateData(child, payload)) {
                        return true;
                    }
                }
            }
            // check the rest of the elements in the parent
            for (const element of parent) {
                if (this.updateData(element, payload)) {
                    return true;
                }
            }
        }
        return false;  // if we get here, we didn't find it
    }

    // if has same two data model, not drawing at all
    // tslint:disable-next-line:no-any function-name
    public static compareTrees(root1: any[], root2: any[]): boolean {
        return JSON.stringify(root1) === JSON.stringify(root2);
    }

    public static checkError(parent: any): boolean {
        // console.log('CheckError ' + JSON.stringify(parent));
        if (parent) {
            // check to see if parent is the element right away
            if (parent.errorMessages && parent.errorMessages.length > 0) {
                return true;
            }

            // check the parent's children
            if (parent.children) {
                // using for loop instead of forEach so I can break out if we find it
                for (const child of parent.children) {
                    if (this.checkError(child)) {
                        return true;
                    }
                }
            }
            // check the rest of the elements in the parent
            for (const element of parent) {
                if (this.checkError(element)) {
                    return true;
                }
            }
        }
        return false;  // if we get here, we didn't find it
    }
}
