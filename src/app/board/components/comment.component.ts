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
  content = new FormControl('', [Validators.required])

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  deleteComment() {
    this.delete.emit(this.data.id);
  }

  editComment() {
    this.edit.emit({id: this.data.id, content: this.content.value});
    this.blurEdit();
  }

  focusEdit() {
    this.isEdit = true;
    this.changeDetector.detectChanges();
      this.content.setValue(this.data.content);
      this.formEl.nativeElement.select();
  }

  blurEdit() {
    this.isEdit = false;
  }

  keydownForm(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter') {
      this.editComment();
      return;
    }
    if (event.key === 'Escape') {
      this.blurEdit();
      return;
    }
  }
}
