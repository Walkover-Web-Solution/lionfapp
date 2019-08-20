import { Component, OnInit, Directive, HostListener, HostBinding } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})




export class HeaderComponent implements OnInit {
  public dropdownSidebar = false;
  public subscriptionSidebar = true;
  public isDropDownOpen = false
  public activeMenu = ""

  public onclick(id: string) {
    this.activeMenu = id;
    this.isDropDownOpen = !this.isDropDownOpen;
  }

  ngOnInit() {
  }

}
