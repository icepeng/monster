import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { CardDetailComponent } from './card-detail.component';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
})
export class CardPageComponent implements OnInit, OnDestroy {
  subscription$!: Subscription;

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

    this.subscription$ = this.route.paramMap
      .pipe(
        map((params) => params.get('cardId')),
        filter((id) => !!id),
        map(() => this.overlay.create(configs)),
        tap((overlayRef) =>
          overlayRef.attach(
            new ComponentPortal(CardDetailComponent, this.viewContainerRef)
          )
        ),
        switchMap((overlayRef) =>
          overlayRef.outsidePointerEvents().pipe(
            filter((e) => e.type === 'click'),
            take(1),
            tap(() => {
              overlayRef.dispose();
              this.router.navigate(['../']);
            })
          )
        )
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }
}
