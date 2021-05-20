import { Component, OnInit } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
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

    this.listIds$ = this.store.select(fromBoard.selectAllLists).pipe(
      withLatestFrom(this.data$),
      map(([lists, data]) =>
        lists.filter((list) => list.boardId === data.id).map((list) => list.id)
      )
    );
  }
}
