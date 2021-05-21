import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BoardPageActions } from '../actions';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list.component.scss', './list-add.component.scss'],
})
export class ListAddComponent implements OnInit {
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

  addList() {
    this.store.dispatch(
      BoardPageActions.addList({
        title: this.formGroup.value.title,
      })
    );
    this.isOpen = false;
  }
}
