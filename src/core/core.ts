import {NgModule} from '@angular/core';

import { AlloyOptionModule } from './option/index';

@NgModule({
  imports: [
    AlloyOptionModule,
  ],
  exports: [
    AlloyOptionModule,
  ],
})
export class AlloyCoreModule {}

export * from './option/index';
