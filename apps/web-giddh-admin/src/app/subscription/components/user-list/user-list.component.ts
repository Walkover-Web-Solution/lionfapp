import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AdminActions } from '../../../actions/admin.actions';
import { UserService } from '../../../services/user.service';
import { AppState } from '../../../store';
import { CommonPaginatedRequest, SubscriberList } from '../../../modules/modules/api-modules/subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public expandList = false;
  public openExpanList = '';
  public displayMonths = 2;
  public navigation = 'select';
  public showWeekNumbers = false;
  public outsideDays = 'visible';
  public userSubscriptionData = [];
  public getUserListRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
  public userlistRes: SubscriberList = new SubscriberList();


  destroyed$: Observable<any>;
  public onclick(id: string) {
    this.openExpanList = id;
    this.expandList = !this.expandList;
  }

  constructor(private store: Store<AppState>, private adminActions: AdminActions, private userService: UserService) {

  }

  ngOnInit() {
    this.getUserListRequest.count = 10;
    this.getUserListRequest.page = 1;
    this.getUserListRequest.sortBy = 'User';
    this.getUserListRequest.sortType = 'asc';
    this.getAllUserData();
  }
  public getAllUserData() {
    this.userService.getAllSubscriptionsByUser(this.getUserListRequest).subscribe(res => {
      if (res.status === 'success') {
        this.userlistRes = res.body;
        this.userSubscriptionData = this.filterResponse(res.body.results);
      }
    });
  }
  public pageChanged(event: any): void {

    this.getUserListRequest.page = event.page;
    this.getAllUserData();

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
