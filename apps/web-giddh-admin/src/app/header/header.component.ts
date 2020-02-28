import { Component, OnInit, Directive, HostListener, HostBinding } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { AuthService } from '../theme/ng-social-login-module';
import { GeneralActions } from '../actions/general/general.action';
import { Store, select } from '@ngrx/store';
import { AppState } from '../store';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { CurrentPage } from '../modules/common';
import { SubscriptionService } from '../services/subscription.service';
import { GetAllCompaniesRequest } from '../modules/modules/api-modules/subscription';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
    public dropdownSidebar = false;
    public subscriptionSidebar = true;
    public isDropDownOpen = false;
    public activeMenu = "";
    public user;
    public shortName = "";
    public selectedpageheader;
    public selectedPage: string
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    public getCompanyfilter: GetAllCompaniesRequest = new GetAllCompaniesRequest();
    public onclick(id: string) {
        this.activeMenu = id;
        this.isDropDownOpen = !this.isDropDownOpen;
    }

    constructor(private store: Store<AppState>, private generalService: GeneralService, private _generalActions: GeneralActions, private router: Router, private authService: AuthService, private subscriptionService: SubscriptionService) {
        let session = null;
        if (JSON.parse(localStorage.getItem('session'))) {
            session = JSON.parse(localStorage.getItem('session'));
            this.generalService.user = session.user;
            this.generalService.sessionId = session.session.id;
        }

        this.user = this.generalService.user;
        if (this.user) {
            let toArray = this.user.name.split(" ");
            this.shortName = toArray.length > 1 ? toArray[0].charAt(0) + "" + toArray[1].toString().charAt(0) : toArray[0].charAt(0);
        }
    }

    ngOnInit() {
        this.store.pipe(select(s => s.general.currentPage), takeUntil(this.destroyed$)).subscribe(response => {
            let currentPageResponse = _.clone(response);
            if (currentPageResponse) {
                this.selectedPage = currentPageResponse.currentPageObj.name;
            }
        });
    }

    public clearData() {
        this.generalService.clearUserSession();
    }

    public getCompaniesList() {
        this.subscriptionService.setGetAllCompanyRequestObject(this.getCompanyfilter);
        this.router.navigate(['admin', 'subscription', 'edit']);
    }
}
