import { NavigationEnd, NavigationStart, Router } from '@angular/router';
/**
 * Angular 2 decorators and services
 */
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from './store/roots';
import { ReplaySubject } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'body',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <noscript *ngIf="isProdMode && !isElectron">
      <iframe [src]="tagManagerUrl"
              height="0" width="0" style="display:none;visibility:hidden"></iframe>
    </noscript>
    <div id="loader-1" *ngIf="!IAmLoaded" class="giddh-spinner vertical-center-spinner"></div>
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
// tslint:disable-next-line:no-empty

  public sideMenu: { isopen: boolean } = {isopen: true};
  public companyMenu: { isopen: boolean } = {isopen: false};
  public isProdMode: boolean = false;
  public isElectron: boolean = false;
  public tagManagerUrl: SafeUrl;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public sidebarStatusChange(event) {
    this.sideMenu.isopen = event;
  }

  public sideBarStateChange(event: boolean) {
    this.sideMenu.isopen = event;

  }

  public IAmLoaded: boolean = false;
  private newVersionAvailableForWebApp: boolean = false;

  constructor(private store: Store<AppState>,
              private router: Router,
              private _cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer
              // private comapnyActions: CompanyActions, 
              // private activatedRoute: ActivatedRoute, 
              // private location: Location
  ) {
    this.IAmLoaded = true;
  }


  public ngOnInit() {
  }

  public ngAfterViewInit() {
    this._cdr.detectChanges();
    this.router.events.subscribe((evt) => {

      if ((evt instanceof NavigationStart) && this.newVersionAvailableForWebApp && !isElectron) {
        // need to save last state
        const redirectState = this.getLastStateFromUrl(evt.url);
        localStorage.setItem('lastState', redirectState);
        return window.location.reload(true);
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    const lastState = localStorage.getItem('lastState');

    if (lastState) {
      localStorage.removeItem('lastState');
      return this.router.navigate([lastState]);
    }

    if (location.href.includes('returnUrl')) {
      let tUrl = location.href.split('returnUrl=');
      if (tUrl[1]) {
        if (!isElectron) {
          this.router.navigate([tUrl[1]]);
        }
      }
    }
  }

  private getLastStateFromUrl(url: string): string {
    if (url) {
      if (url.includes('/pages/')) {
        return url.substr(url.lastIndexOf('/') + 1, url.length);
      } else if (url.includes('/ledger/') || url.includes('/invoice/')) {
        return url;
      }
    }
    return 'home';
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
