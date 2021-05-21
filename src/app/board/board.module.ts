import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as fromBoard from '@monster/board/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BoardRoutingModule } from './board-routing.module';
import { CardLabelComponent } from './components/card-label.component';
import { BoardPageComponent } from './containers/board-page.component';
import { CardAddComponent } from './containers/card-add.component';
import { CardDetailComponent } from './containers/card-detail.component';
import { CardComponent } from './containers/card.component';
import { ListAddComponent } from './containers/list-add.component';
import { ListComponent } from './containers/list.component';
import { BoardEffects } from './effects/board.effects';

@NgModule({
  declarations: [
    BoardPageComponent,
    ListComponent,
    CardComponent,
    ListAddComponent,
    CardAddComponent,
    CardLabelComponent,
    CardDetailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    DragDropModule,
    OverlayModule,
    PortalModule,
    BoardRoutingModule,
    StoreModule.forFeature(fromBoard.boardFeatureKey, fromBoard.reducers),
    EffectsModule.forFeature([BoardEffects]),
  ],
})
export class BoardModule {}
