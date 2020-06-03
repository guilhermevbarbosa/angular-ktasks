import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  exports: [
    LayoutModule,
    MatToolbarModule
  ]
})
export class MaterialComponentsModule { }
