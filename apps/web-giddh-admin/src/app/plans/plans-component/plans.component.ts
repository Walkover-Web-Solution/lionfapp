import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../store';
import { AdminActions } from '../../actions/admin.actions';
import { PlansService } from '../../services/plan.service';
import { CommonPaginatedRequest, SubscriberList } from '../../modules/modules/api-modules/subscription';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  private destroyed$: Observable<any>;
  public PlansData = [];
  public getAllPlansRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
  public allPlansRes: SubscriberList = new SubscriberList();
  constructor(private store: Store<AppState>, private adminActions: AdminActions,
    private plansService: PlansService) {

  }


  // public rightToggle: boolean = false;
  public togglePanelBool: boolean;
  // RightSlide() {
  //   this.rightToggle = !this.rightToggle;
  // }

  ngOnInit() {
    this.getAllPlansRequest.count = 10;
    this.getAllPlansRequest.page = 1;
    this.getAllPlansRequest.sortBy = 'TOTAL_AMOUNT';
    this.getAllPlansRequest.sort = 'desc';
    this.getAllPlans();
  }
  public getAllPlans() {
    this.plansService.getAllPlans(this.getAllPlansRequest).subscribe(res => {
      if (res.status === 'success') {
        this.allPlansRes = res.body;
        this.PlansData = res.body.results;
      }
    });
  }
  public pageChanged(event: any): void {
    this.getAllPlansRequest.page = event.page;
    this.getAllPlans();

  }
  public togglePanel() {
    if (this.togglePanelBool) {
      this.togglePanelBool = false;
    } else {
      this.togglePanelBool = true;
    }
  }
}