import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { ToolbarComponent } from './containers/toolbar.component';



@NgModule({
  declarations: [
    NotFoundPageComponent,
    ToolbarComponent
  ],
  exports: [
    ToolbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
