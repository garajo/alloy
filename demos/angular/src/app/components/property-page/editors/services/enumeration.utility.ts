/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
// EnumerationUtility.addOptions(this.internalRowData, payload);
export class EnumerationUtility {
    // update tree model by payload data
    // tslint:disable-next-line:no-any function-name
    public static addOptions(parent: any, payload: any): boolean {
        const [ typeName, options] = payload;
        if (parent) {
            // check to see if parent is the element right away
            if (parent.typeName) {
                if (parent.typeName === typeName) {
                    parent.values = options;
                    return true;
                }
            }
            // check the parent's children
            if (parent.children) {
                // using for loop instead of forEach so I can break out if we find it
                for (const child of parent.children) {
                    // Should be not return, It needs to scan all siblings
                    this.addOptions(child, payload);
                }
            }
            // check the rest of the elements in the parent
            for (const element of parent) {
                if (element.typeName) {
                    if (element.typeName === typeName) {
                        element.values = options;
                        return true;
                    }
                }
                if (element && element.children) {
                    // using for loop instead of forEach so I can break out if we find it
                    for (const child of element.children) {
                        if (this.addOptions(child, payload)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;  // if we get here, we didn't find it
    }

    // tslint:disable-next-line:no-any function-name
    public static getOptions(parent: any, typeName: string): string[] {
        // tslint:disable-next-line:prefer-const
        let foundOptions: string[] = [];
        if (parent) {
            for (const element of parent) {
                if (element.typeName) {
                    if (element.typeName === typeName) {
                        foundOptions = element.options;
                    }
                }
            }
        }
        return foundOptions;
    }
}
