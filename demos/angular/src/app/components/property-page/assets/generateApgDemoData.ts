/*
 * Copyright Keysight Technologies 2017. All rights reserved.
 */
import { CityType } from './cityType';
import { AlloyPropertyGridGroupRow, AlloyPropertyGridPropertyRow } from '@keysight/alloy';
import { PropertyType } from './propertyType';

export class GenerateApgDemoData {
    public static doIt(): (AlloyPropertyGridGroupRow | AlloyPropertyGridPropertyRow) [] {
        const rowData: (AlloyPropertyGridGroupRow | AlloyPropertyGridPropertyRow) [] = [];

            // tslint:disable-next-line:max-line-length
            const prop1  = new AlloyPropertyGridPropertyRow('NonValidatedString', PropertyType.StringWithNoValidation.toString(), 'aBC12e45*#', '1');
            rowData.push(prop1);

            const group2 = new AlloyPropertyGridGroupRow('Group2', []);
                // tslint:disable-next-line:max-line-length
                const prop2_1  = new AlloyPropertyGridPropertyRow('ValidatedStringNoZ', PropertyType.ShortStringWithNoZ.toString(), 'a1b2', '2_1');
                group2.children.push(prop2_1);

                // tslint:disable-next-line:max-line-length
                const prop2_2 = new AlloyPropertyGridPropertyRow('MyCity', PropertyType.Enum.toString(), CityType.Loveland.toString(), '2_2');
                group2.children.push(prop2_2);

                const prop2_3 = new AlloyPropertyGridPropertyRow('MyBoolean', PropertyType.Boolean.toString(), true, '2_3');
                group2.children.push(prop2_3);

            rowData.push(group2);

            const group3 = new AlloyPropertyGridGroupRow('InitiallyCollapsedGroup', []);
            group3.collapsed = true;
            rowData.push(group3);

                const group3_2 = new AlloyPropertyGridGroupRow('EmptyGroup', []);
                // Note group3B has no children
                group3_2.description = 'This group is intentionally empty';
                group3.children.push(group3_2);

                const group3_3 = new AlloyPropertyGridGroupRow('ChildGroup', []);
                group3.children.push(group3_3);

                    // Note an id of a different shape, they do not have to follow a pattern, but MUST be unique.
                    // tslint:disable-next-line:max-line-length
                    const prop3_3_1 = new AlloyPropertyGridPropertyRow('ValidatedAndExternalErrors', PropertyType.ShortStringWithNoZ.toString(), 'Value3_3_1', 'SomeOtherId');
                    prop3_3_1.errorMessages.push('Some external error message.')
                    prop3_3_1.errorMessages.push('Some other external error message.')
                    prop3_3_1.description = 'Prop 3_3_1 description';
                    group3_3.children.push(prop3_3_1);

                    // tslint:disable-next-line:max-line-length
                    const prop3_3_2 = new AlloyPropertyGridPropertyRow('ReadOnlyString', PropertyType.ShortStringWithNoZ.toString(), 'No Read', '3_3_2');
                    prop3_3_2.readOnly = true;
                    group3_3.children.push(prop3_3_2);

                    // tslint:disable-next-line:max-line-length
                    const prop3_3_3 = new AlloyPropertyGridPropertyRow('NonValidatedString#2', PropertyType.StringWithNoValidation.toString(), 'Fred',  '3_3_3');
                    group3_3.children.push(prop3_3_3);

        // console.log (JSON.stringify(rowData));
        return rowData;
    }
}
