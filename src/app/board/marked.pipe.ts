import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as marked from 'marked';

@Pipe({
  name: 'marked',
})
export class MarkedPipe implements PipeTransform {
  renderer!: marked.Renderer;

  constructor(private sanitizer: DomSanitizer) {
    this.renderer = new marked.Renderer();
    const linkRenderer = this.renderer.link;
    this.renderer.link = (href, title, text) => {
      const html = linkRenderer.call(this.renderer, href, title, text);
      return html.replace(/^<a /, '<a target="_blank" rel="nofollow" ');
    };
  }

  transform(value: any): any {
    if (value && value.length > 0) {
      return this.sanitizer.bypassSecurityTrustHtml(
        marked(value, { renderer: this.renderer, gfm: true, breaks: true })
      );
    }
    return value;
  }
}
