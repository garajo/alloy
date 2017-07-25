/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlloyOption } from './option';

@NgModule({
    imports: [CommonModule],
    exports: [AlloyOption],
    declarations: [AlloyOption]
})
export class AlloyOptionModule { }

export * from './option';
