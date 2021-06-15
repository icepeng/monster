import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CardDetailComponent } from './card-detail.component';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit, OnDestroy {
  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally();

    const configs = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'backdrop',
      positionStrategy,
    });

    this.route.paramMap
      .pipe(
        map((params) => params.get('cardId')),
        filter((id) => !!id),
        take(1)
      )
      .subscribe(() => {
        this.overlayRef = this.overlay.create(configs);
        this.overlayRef.attach(
          new ComponentPortal(CardDetailComponent, this.viewContainerRef)
        );
        this.overlayRef
          .outsidePointerEvents()
          .pipe(
            filter((e) => e.type === 'click'),
            take(1)
          )
          .subscribe(() => this.router.navigate(['../']));
      });
  }

  ngOnDestroy() {
    this.overlayRef.dispose();
  }
}
