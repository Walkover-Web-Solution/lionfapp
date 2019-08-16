import { Component, OnInit } from '@angular/core';
import {SubscriptionService} from '../../../services/subscription.service';
import {AppState} from '../../../store';
import {Store} from '@ngrx/store';
import {SubscriptionActions} from '../../../actions/subscription.actions';
import {takeUntil} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-suscription-container',
  templateUrl: './suscription-container.component.html',
  styleUrls: ['./suscription-container.component.scss']
})
export class SuscriptionContainerComponent implements OnInit {
  private destroyed$: Observable<any>;
  public subscriptionData = [];
  constructor(private store: Store<AppState>, private subscriptionActions: SubscriptionActions,
              private subscriptionService: SubscriptionService) {
    subscriptionService.getAllSubscriptions().subscribe(res => {
      this.subscriptionData = res.body.results;
    });
    /*this.store.dispatch(this.subscriptionActions.getSubscription());*/
  }

  ngOnInit() {
  }

}
