import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardPageActions } from '../actions';

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.component.html',
  styleUrls: ['./card.component.scss', './card-add.component.scss']
})
export class CardAddComponent implements OnInit {
  @Input() listId!: string;

  isOpen = false;

  formGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store) {}

  ngOnInit(): void {}

  open() {
    this.formGroup.reset({ title: '' });
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  addCard() {
    this.store.dispatch(
      BoardPageActions.addCard({
        listId: this.listId,
        title: this.formGroup.value.title,
      })
    );
    this.isOpen = false;
  }
}
