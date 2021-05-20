import { Component, Input, OnInit } from '@angular/core';
import * as fromBoard from '@monster/board/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    this.cardIds$ = this.store
      .select(fromBoard.selectAllCards)
      .pipe(
        map((cards) =>
          cards.filter((card) => card.listId === this.id).map((card) => card.id)
        )
      );
  }
}
