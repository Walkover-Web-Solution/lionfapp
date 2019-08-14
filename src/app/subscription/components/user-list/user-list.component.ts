import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public expandList = false;
  public openExpanList = '';

  public onclick(id: string) {
    this.openExpanList = id;
    this.expandList = !this.expandList;
  }

  constructor() { }

  ngOnInit() {
  }

}
