import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Comment } from '../models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements OnInit {
  @Input() data!: Comment
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteComment() {
    this.delete.emit(this.data.id);
  }
}
