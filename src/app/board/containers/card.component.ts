import { Component, Input, OnInit } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardPageActions } from '../actions';
import { Card, Label } from '../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() id!: string;
  data$!: Observable<Card>;
  labels$!: Observable<Label[]>;
  labelExpand$!: Observable<boolean>;

  dueHover = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.data$ = this.store
      .select(fromBoard.selectAllCards)
      .pipe(map((cards) => cards.find((card) => card.id === this.id)!));

    this.labels$ = combineLatest([
      this.store.select(fromBoard.selectAllCardLabels),
      this.store.select(fromBoard.selectLabelEntities),
      this.data$,
    ]).pipe(
      map(([cardLabels, labelEntities, card]) =>
        cardLabels
          .filter((x) => x.cardId === card.id)
          .map((x) => labelEntities[x.labelId]!)
      )
    );

    this.labelExpand$ = this.store.select(fromBoard.selectLabelExpand);
  }

  openCard() {
    this.store.dispatch(BoardPageActions.selectCard({ cardId: this.id }));
  }

  toggleLabelExpand() {
    this.store.dispatch(BoardPageActions.toggleLabelExpand());
  }

  getDueClass(card: Card) {
    if (card.dueComplete) {
      return 'is-due-complete';
    }
    if (new Date().getTime() > new Date(card.due!).getTime() + 86400000 * 1.5) {
      return 'is-due-past';
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
      BoardPageActions.toggleCardDue({
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
