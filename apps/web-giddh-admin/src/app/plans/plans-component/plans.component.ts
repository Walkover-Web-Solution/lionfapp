import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppState } from '../../store';
import { AdminActions } from '../../actions/admin.actions';
import { PlansService } from '../../services/plan.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  private destroyed$: Observable<any>;
  public PlansData = [];
  constructor(private store: Store<AppState>, private adminActions: AdminActions,
    private PlansService: PlansService) {
      PlansService.getAllPlans().subscribe(res => {
      if (res.status === 'success') {
        this.PlansData = res.body.results;
      }
    });
  }

  
  // public rightToggle: boolean = false;
  public togglePanelBool: boolean;
  // RightSlide() {
  //   this.rightToggle = !this.rightToggle;
  // }

  ngOnInit() {
  }
  
  public togglePanel () {
    if (this.togglePanelBool) {
      this.togglePanelBool = false;
    } else {
      this.togglePanelBool = true;
    }
  }
}