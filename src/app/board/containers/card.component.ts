import { Component, Input, OnInit } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardPageActions } from '../actions';
import { Card } from '../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id!: string;
  data$!: Observable<Card>;

  dueHover = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store
      .select(fromBoard.selectAllCards)
      .pipe(map((cards) => cards.find((card) => card.id === this.id)!));
  }

  getDueClass(card: Card) {
    if (card.dueComplete) {
      return 'is-due-complete';
    }
    if (new Date() > new Date(card.due!)) {
      return 'is-due-overdue';
    }
    if (new Date().getTime() + 86400000 > new Date(card.due!).getTime()) {
      return 'is-due-soon';
    }
    return '';
  }

  toggleDue(card: Card) {
    this.store.dispatch(
      BoardPageActions.toggleDue({
        cardId: card.id,
      })
    );
  }

  dueMouseEnter(event: MouseEvent) {
    this.dueHover = true;
  }

  dueMouseLeave(event: MouseEvent) {
    this.dueHover = false;
  }
}
