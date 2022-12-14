import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from './card/card.component';
import {NextCardComponent} from './next-card/next-card.component';
import {ExplosionDirective} from './explosion/explosion.directive';
import {NumberFormComponent} from './number-form/number-form.component';

@NgModule({
  declarations: [
    CardComponent,
    NextCardComponent,
    ExplosionDirective,
    NumberFormComponent,
  ],
  exports: [

    CardComponent,
    NextCardComponent,
    ExplosionDirective,
    NumberFormComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UiComponentsModule { }
