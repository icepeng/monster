import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './containers/board-page.component';

export const routes: Routes = [
  {
    path: ':id',
    component: BoardPageComponent,
    // canActivate: [BookExistsGuard],
  },
  // {
  //   path: '',
  //   component: CollectionPageComponent,
  //   data: { title: 'Collection' },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
