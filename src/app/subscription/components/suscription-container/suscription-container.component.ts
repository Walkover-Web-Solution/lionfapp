import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-suscription-container',
  templateUrl: './suscription-container.component.html',
  styleUrls: ['./suscription-container.component.scss']
})
export class SuscriptionContainerComponent implements OnInit {
  private destroyed$: Observable<any>;
  public subscriptionData = [];
  constructor(private store: Store<AppState>, private adminActions: AdminActions,
    private subscriptionService: SubscriptionService) {
    subscriptionService.getAllSubscriptions().subscribe(res => {
      this.subscriptionData = res.body.results;
    });
    this.store.dispatch(this.adminActions.getSubscription());

  }

  public rightToggle: boolean = false;
  public RightSlide() {
    this.rightToggle = !this.rightToggle;
  }

  ngOnInit() {
  }

}