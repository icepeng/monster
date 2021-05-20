import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardRoutingModule } from './board-routing.module';
import { BoardPageComponent } from './containers/board-page.component';
import { CardComponent } from './containers/card.component';
import { ListComponent } from './containers/list.component';
import { BoardEffects } from './effects/board.effects';

@NgModule({
  declarations: [BoardPageComponent, ListComponent, CardComponent],
  imports: [
    CommonModule,
    BoardRoutingModule,
    StoreModule.forFeature(fromBoard.boardFeatureKey, fromBoard.reducers),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardModule {}
