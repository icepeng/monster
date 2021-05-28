import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: 'textarea[appAutoResize]',
})
export class AutoResizeDirective implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  constructor(public element: ElementRef) {}

  ngOnInit() {
    this.adjust();
  }

  adjust() {
    const target = this.element.nativeElement as HTMLTextAreaElement;
    const boxSizing = target.style.boxSizing;
    target.style.boxSizing = 'initial';
    target.style.height = '0px';
    target.style.height = target.scrollHeight + 'px';
    target.style.boxSizing = boxSizing;
  }
}