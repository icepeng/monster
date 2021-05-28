import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBoard from '@monster/board/reducers';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardPageActions } from '../actions';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  @ViewChild('title') title!: ElementRef;

  card$ = combineLatest([
    this.store.select(fromBoard.selectCardEntities),
    this.route.paramMap,
  ]).pipe(
    map(([cardEntities, paramMap]) => cardEntities[paramMap.get('cardId')!])
  );

  listName$ = combineLatest([
    this.card$,
    this.store.select(fromBoard.selectListEntities),
  ]).pipe(map(([card, listEntities]) => listEntities[card!.listId]!.title));

  comments$ = combineLatest([
    this.card$,
    this.store.select(fromBoard.selectAllComments),
  ]).pipe(
    map(([card, comments]) =>
      comments.filter((comment) => comment.cardId === card!.id)
    )
  );

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  updateTitle(card: Card, title: string) {
    if (card.title === title) {
      return;
    }
    this.store.dispatch(CardPageActions.editTitle({ id: card.id, title }));
  }

  keydownTitle(event: KeyboardEvent, card: Card) {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter') {
      target.blur();
      return;
    }
    if (event.key === 'Escape') {
      this.title.nativeElement.value = card.title;
      target.blur();
      return;
    }
  }
}
