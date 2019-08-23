import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminActions } from '../../../actions/admin.actions';
import { UserService } from '../../../services/user.service';
import { AppState } from '../../../store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public expandList = false;
  public openExpanList = '';
  displayMonths = 2;
  navigation = 'select';
  showWeekNumbers = false;
  outsideDays = 'visible';
  public userSubscriptionData = [];
  destroyed$: Observable<any>;
  public onclick(id: string) {
    this.openExpanList = id;
    this.expandList = !this.expandList;
  }

  constructor(private store: Store<AppState>, private adminActions: AdminActions, private userService: UserService) {
    userService.getAllSubscriptionsByUser().subscribe(res => {
      if (res.status === 'success') {
        this.userSubscriptionData = this.filterResponse(res.body.results);
      }
    });
  }

  ngOnInit() {
  }

  private filterResponse(results) {
    const filteredResp = results;
    
    filteredResp.forEach(resp => {
      if (resp.subscriptions.length > 1) {
        let planDetails = resp.subscriptions[0].planDetails;
        resp.subscriptions.forEach(subs => {
            if (planDetails.uniqueName !== subs.planDetails.uniqueName) {
              planDetails.name = 'Multiple';
              return;
            }
        });
        const subscriptionsNew = resp.subscriptions[0];
        subscriptionsNew.subscriptionId = 'Multiple';
        subscriptionsNew.planDetails = planDetails;
        resp.subscriptions = [];
        resp.subscriptions.push(subscriptionsNew);
      }
    });
    return filteredResp;
  }
}
