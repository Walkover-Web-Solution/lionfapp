import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';

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
  public onclick(id: string) {
    this.openExpanList = id;
    this.expandList = !this.expandList;
  }

  constructor(private userService: UserService) {
    userService.getAllSubscriptionsByUser().subscribe(res => {
      this.userSubscriptionData = this.filterResponse(res.body.results);
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
