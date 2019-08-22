import { Component, OnInit, TemplateRef } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-suscription-container',
  templateUrl: './suscription-container.component.html',
  styleUrls: ['./suscription-container.component.scss']
})
export class SuscriptionContainerComponent implements OnInit {
  modalRef: BsModalRef;
  private destroyed$: Observable<any>;
  public subscriptionData = [];
  constructor(private store: Store<AppState>, private adminActions: AdminActions, private modalService: BsModalService,
    private subscriptionService: SubscriptionService) {
    subscriptionService.getAllSubscriptions().subscribe(res => {
      if (res.status === 'success') {
        this.subscriptionData = res.body.results;
      }
    });
  }



  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'edit-subscriber' })
    );
  }


  public rightToggle: boolean = false;
  public RightSlide() {
    this.rightToggle = !this.rightToggle;
  }

  ngOnInit() {
  }

}