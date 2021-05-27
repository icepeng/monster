import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './containers/board-page.component';
import { CardPageComponent } from './containers/card-page.component';

export const routes: Routes = [
  {
    path: ':boardId',
    component: BoardPageComponent,
    children: [
      {
        path: ':cardId',
        component: CardPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
