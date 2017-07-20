import {NgModule} from '@angular/core';

import { AlloyOptionModule } from './option/index';

@NgModule({
  imports: [
    AlloyOptionModule,
  ],
  declarations: [
  ],
  exports: [
    AlloyOptionModule,
  ],
})
export class MdCoreModule {}

export * from './option/index';
