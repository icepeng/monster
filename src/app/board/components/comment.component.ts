import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Comment } from '../models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: [
    './comment.component.scss',
    '../containers/add-comment.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements OnInit {
  @ViewChild('form') formEl!: ElementRef;
  @Input() data!: Comment
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  isEdit = false;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  deleteComment() {
    this.delete.emit(this.data.id);
  }

  editComment(content: string) {
    this.edit.emit({id: this.data.id, content: content});
    this.blurEdit();
  }

  focusEdit() {
    this.isEdit = true;
    this.changeDetector.detectChanges();
    this.formEl.nativeElement.select();
  }

  blurEdit() {
    this.isEdit = false;
  }
}
