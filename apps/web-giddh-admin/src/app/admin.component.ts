import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  template: `
    <div id="main">
      <giddh-loader></giddh-loader>
      <app-header></app-header>
    </div>`
})
export class AdminComponent implements AfterViewInit, OnInit, OnDestroy {

  constructor() {
  }

  public ngOnInit() {
    // this.store.dispatch(this.comapnyActions.RefreshCompanies());
  }

  public ngAfterViewInit() {
    
  }

  public sidebarStatusChange() {

  }

  public ngOnDestroy(): void {

  }
}
