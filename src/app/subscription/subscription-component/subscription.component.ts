import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AdminActions } from 'src/app/actions/admin.actions';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  constructor(private store: Store<AppState>, private adminActions: AdminActions) { }

  ngOnInit() {
  }

}
