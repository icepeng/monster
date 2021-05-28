import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Comment } from '../models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements OnInit {
  @Input() data!: Comment

  constructor() { }

  ngOnInit(): void {
  }

}
