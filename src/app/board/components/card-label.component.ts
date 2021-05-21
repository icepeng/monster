import { Component, Input, OnInit } from '@angular/core';
import { Label } from '../models';

@Component({
  selector: 'app-card-label',
  templateUrl: './card-label.component.html',
  styleUrls: ['./card-label.component.scss'],
})
export class CardLabelComponent implements OnInit {
  @Input() label!: Label;
  @Input() expand!: boolean | null;

  constructor() {}

  ngOnInit(): void {}
}
