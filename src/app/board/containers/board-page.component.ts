import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardPageActions } from '../actions';
import { Board } from '../models';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  data$!: Observable<Board>;
  listIds$!: Observable<string[]>;

  constructor(private store: Store) {}

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
