import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from '@monster/core/containers/not-found-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/board/1', pathMatch: 'full' },
  {
    path: 'board',
    loadChildren: () =>
      import('@monster/board/board.module').then((m) => m.BoardModule),
    // canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
