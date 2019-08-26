import { Component, OnInit, Directive, HostListener, HostBinding } from '@angular/core';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { AuthService } from '../theme/ng-social-login-module';

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
  public onclick(id: string) {
    this.activeMenu = id;
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  constructor(private generalService : GeneralService, private router : Router, private authService : AuthService){
    this.user = this.generalService.user;
    if(this.user){
    let toArray =  this.user.name.split(" ");
    this.shortName =  toArray.length > 1 ? toArray[0].charAt(0) + "" + toArray[1].toString().charAt(0) : toArray[0].charAt(0);
    console.log(this.shortName );
  }
  }
  ngOnInit() {
  }

  public clearData(){
    this.generalService.sessionId = null;
    this.generalService.user = null;
    this.authService.signOut();
    //this.router.navigate(['login']);
  }
}
