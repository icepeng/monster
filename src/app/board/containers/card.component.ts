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
  @Input() card!: Card;
  labels$!: Observable<Label[]>;
  labelExpand$!: Observable<boolean>;

  dueHover = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.labels$ = combineLatest([
      this.store.select(fromBoard.selectAllCardLabels),
      this.store.select(fromBoard.selectLabelEntities),
    ]).pipe(
      map(([cardLabels, labelEntities]) =>
        cardLabels
          .filter((x) => x.cardId === this.card.id)
          .map((x) => labelEntities[x.labelId]!)
      )
    );

    this.labelExpand$ = this.store.select(fromBoard.selectLabelExpand);
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
