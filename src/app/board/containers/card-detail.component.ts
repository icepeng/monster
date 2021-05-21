import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBoard from '@monster/board/reducers';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  card$ = this.store.select(fromBoard.selectSelectedCard);
  listName$ = combineLatest([
    this.card$,
    this.store.select(fromBoard.selectListEntities),
  ]).pipe(map(([card, listEntities]) => listEntities[card!.listId]!.title));

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
