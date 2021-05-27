import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBoard from '@monster/board/reducers';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CardPageActions } from '../actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
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

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  updateTitle(id: string, title: string) {
    this.store.dispatch(CardPageActions.editTitle({ id, title }));
  }
}
