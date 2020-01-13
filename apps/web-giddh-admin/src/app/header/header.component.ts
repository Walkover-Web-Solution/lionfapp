import { Component, OnInit, Directive, HostListener, HostBinding } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { AuthService } from '../theme/ng-social-login-module';
import { GeneralActions } from '../actions/general/general.action';


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
    public onclick(id: string) {
        this.activeMenu = id;
        this.isDropDownOpen = !this.isDropDownOpen;
    }

    constructor(private generalService: GeneralService, private router: Router, private authService: AuthService) {
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

    }
    public setCurrentPageTitle(url) {

    }


    public clearData() {
        localStorage.removeItem('session');
        this.generalService.sessionId = null;
        this.generalService.user = null;
        this.authService.signOut();
        this.router.navigate(['login']);
    }
}
