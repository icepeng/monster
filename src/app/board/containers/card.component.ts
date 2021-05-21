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

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store
      .select(fromBoard.selectAllCards)
      .pipe(map((cards) => cards.find((card) => card.id === this.id)!));
  }

  isOverdue(card: Card) {
    return (new Date() > new Date(card.due!) && !card.dueComplete) ? 'is-due-overdue' : 'is-due-complete';
  }

  toggleDue(card: Card) {
    this.store.dispatch(
      BoardPageActions.toggleDue({
        cardId: card.id,
      })
    );
  }
}
