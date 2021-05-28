import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CardPageActions } from '../actions';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent implements OnInit {
  isFocused = false;

  content = new FormControl('', [Validators.required])

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {}

  focus() {
    this.isFocused = true;
  }

  blur() {
    this.isFocused = false;
  }

  textAreaChange(e: Event) {
    const target = e.target as HTMLElement;
    target.style.height = '0px';
    target.style.height = target.scrollHeight + 'px';
  }

  addComment() {
    this.store.dispatch(
      CardPageActions.addComment({
        cardId: this.route.snapshot.params.cardId,
        content: this.content.value,
      })
    );
    this.content.reset('');
    this.isFocused = false;
  }
}
