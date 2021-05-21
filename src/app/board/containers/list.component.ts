import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardPageActions } from '../actions';
import { List } from '../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() id!: string;
  data$!: Observable<List>;
  cardIds$!: Observable<string[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store
      .select(fromBoard.selectAllLists)
      .pipe(map((lists) => lists.find((list) => list.id === this.id)!));

    this.cardIds$ = this.store.select(fromBoard.selectAllCards).pipe(
      map((cards) =>
        cards
          .filter((card) => card.listId === this.id)
          .sort((a, b) => a.index - b.index)
          .map((card) => card.id)
      )
    );
  }

  dropCard(event: CdkDragDrop<List>) {
    this.store.dispatch(
      BoardPageActions.moveCard({
        previousList: event.previousContainer.data.id,
        currentList: event.container.data.id,
        previousIndex: event.previousIndex,
        currentIndex: event.currentIndex,
      })
    );
  }
}
