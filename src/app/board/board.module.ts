import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromBoard from '@monster/board/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './containers/board-page.component';
import { CardComponent } from './containers/card.component';
import { ListAddComponent } from './containers/list-add.component';
import { ListComponent } from './containers/list.component';
import { BoardEffects } from './effects/board.effects';
import { CardAddComponent } from './containers/card-add.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    ListComponent,
    CardComponent,
    ListAddComponent,
    CardAddComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    BoardRoutingModule,
    StoreModule.forFeature(fromBoard.boardFeatureKey, fromBoard.reducers),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardModule {}
