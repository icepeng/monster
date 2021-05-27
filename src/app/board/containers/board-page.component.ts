import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { BoardPageActions } from '../actions';
import { Board } from '../models';
import { CardDetailComponent } from './card-detail.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  data$!: Observable<Board>;
  listIds$!: Observable<string[]>;

  constructor(
    private store: Store,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BoardPageActions.enter());

    this.data$ = this.store.select(fromBoard.selectBoard);

    this.listIds$ = this.store
      .select(fromBoard.selectBoardLists)
      .pipe(
        map((lists) =>
          lists.sort((a, b) => a.index - b.index).map((list) => list.id)
        )
      );

    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'backdrop',
      positionStrategy,
    });

    this.store
      .select(fromBoard.selectSelectedCard)
      .pipe(
        filter((card) => !!card),
        map(() => this.overlay.create(configs)),
        tap((overlayRef) =>
          overlayRef.attach(
            new ComponentPortal(CardDetailComponent, this.viewContainerRef)
          )
        ),
        switchMap((overlayRef) =>
          overlayRef.backdropClick().pipe(
            take(1),
            tap(() => {
              overlayRef.dispose();
              this.store.dispatch(BoardPageActions.unselectCard());
            })
          )
        )
      )
      .subscribe();
  }

  dropList(event: CdkDragDrop<null>) {
    this.store.dispatch(
      BoardPageActions.moveList({
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      })
    );
  }
}
