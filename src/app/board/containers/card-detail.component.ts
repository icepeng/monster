import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromBoard from '@monster/board/reducers';
import { combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { BoardPageActions, CardPageActions } from '../actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Card } from '../models';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.scss'],
})
export class CardDetailComponent implements OnInit {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('descriptionArea') descriptionArea!: ElementRef;

  card$ = combineLatest([
    this.store.select(fromBoard.selectCardEntities),
    this.route.paramMap,
  ]).pipe(
    map(([cardEntities, paramMap]) => cardEntities[paramMap.get('cardId')!]),
    filter((card) => !!card)
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

  labels$ = combineLatest([
    this.store.select(fromBoard.selectAllCardLabels),
    this.store.select(fromBoard.selectLabelEntities),
    this.card$,
  ]).pipe(
    map(([cardLabels, labelEntities, card]) =>
      cardLabels
        .filter((x) => x.cardId === card!.id)
        .map((x) => labelEntities[x.labelId]!)
    )
  );

  showLabels$ = this.labels$.pipe(map((labels) => labels.length > 0));
  showDue$ = this.card$.pipe(map((card) => !!card!.due));
  showDueYear$ = this.card$.pipe(
    map(
      (card) =>
        !!card!.due &&
        new Date().getFullYear() !== new Date(card!.due!).getFullYear()
    )
  );

  editing = false;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

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

  toggleDue(card: Card) {
    this.store.dispatch(
      BoardPageActions.toggleCardDue({
        cardId: card.id,
      })
    );
  }

  focusDescription() {
    this.editing = true;
    this.changeDetector.detectChanges();
    this.descriptionArea.nativeElement.select();
  }

  saveDescription(card: Card, description: string) {
    this.editing = false;
    this.store.dispatch(
      CardPageActions.editDescription({
        cardId: card.id,
        description: description,
      })
    );
  }

  cancelDescription() {
    this.editing = false;
  }

  editComment(form: { id: string; content: string }) {
    this.store.dispatch(
      CardPageActions.editComment({ id: form.id, content: form.content })
    );
  }

  deleteComment(id: string) {
    this.store.dispatch(CardPageActions.deleteComment({ id }));
  }

  deleteCard(id: string) {
    this.store.dispatch(CardPageActions.deleteCard({ id }));
    this.router.navigate(['../']);
  }
}
