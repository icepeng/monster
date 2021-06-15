import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardPageActions } from '../actions';
import { Card, List } from '../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('title') titleEl!: ElementRef;
  @Input() id!: string;
  data$!: Observable<List>;
  cards$!: Observable<Card[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store
      .select(fromBoard.selectAllLists)
      .pipe(map((lists) => lists.find((list) => list.id === this.id)!));

    this.cards$ = this.store.select(fromBoard.selectAllCards).pipe(
      map((cards) =>
        cards
          .filter((card) => card.listId === this.id)
          .sort((a, b) => a.index - b.index)
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

  focusTitle() {
    this.titleEl.nativeElement.focus();
  }

  onTitleFocus() {
    this.titleEl.nativeElement.select();
  }

  updateTitle(list: List, title: string) {
    if (list.title === title) {
      return;
    }
    this.store.dispatch(
      BoardPageActions.editListTitle({ listId: list.id, title })
    );
  }

  keydownTitle(event: KeyboardEvent, list: List) {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter') {
      target.blur();
      return;
    }
    if (event.key === 'Escape') {
      this.titleEl.nativeElement.value = list.title;
      target.blur();
      return;
    }
  }

  deleteList(id: string) {
    this.store.dispatch(BoardPageActions.deleteList({ id }));
  }
}
