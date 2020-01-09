import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CommonPaginatedRequest, SubscriberList } from '../../../modules/modules/api-modules/subscription';

@Component({
    selector: 'app-suscription-container',
    templateUrl: './suscription-container.component.html',
    styleUrls: ['./suscription-container.component.scss']
})
export class SuscriptionContainerComponent implements OnInit {

  @ViewChild('SubscribersSignupField') public SubscribersSignupField;
  @ViewChild('subscribOnField') public subscribOnField;
  @ViewChild('subscribIdField') public subscribIdField;

    modalRef: BsModalRef;
    modalRefEdit: BsModalRef;

    private destroyed$: Observable<any>;
    public subscriberRes: SubscriberList = new SubscriberList();
    public subscriptionData = [];
    public rightToggle: boolean = false;
    public subscriptionRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public inlineSearch: any='';
    public togglePanelBool: boolean;

    constructor(private store: Store<AppState>, private adminActions: AdminActions,
        private subscriptionService: SubscriptionService, private modalService: BsModalService) {
    }

    openModalWithClass(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
          template,
          Object.assign({}, { class: 'gray modal-lg' })
      );
    }

  openEditModal(editPlan: TemplateRef<any>) {
      this.modalRefEdit = this.modalService.show(
          editPlan,
          Object.assign({}, { class: 'gray modal-lg' })
      );
    }
  
    ngOnInit() {
        this.subscriptionRequest.count = 10;
        this.subscriptionRequest.page = 1;
        this.subscriptionRequest.sortBy = 'ADDITIONAL_TRANSACTIONS';
        this.subscriptionRequest.sortType = 'desc';
        this.getSsubscriptionData();
    }

    public focusOnColumnSearch(inlineSearch) {
      this.inlineSearch = inlineSearch;

      setTimeout(() => {
          if (this.inlineSearch === 'SubscribersSignup') {
              this.SubscribersSignupField.nativeElement.focus();
          }
      }, 200);
  }

    public RightSlide() {
        this.rightToggle = !this.rightToggle;
    }
    public pageChanged(event: any): void {

        this.subscriptionRequest.page = event.page;
        this.getSsubscriptionData();

    }
    public getSsubscriptionData() {
        this.subscriptionService.getAllSubscriptions(this.subscriptionRequest).subscribe(res => {
            if (res.status === 'success') {
                this.subscriberRes = res.body;
                this.subscriptionData = res.body.results;
            }
        });
    }

    public togglePanel() {
      if (this.togglePanelBool) {
          this.togglePanelBool = false;
      } else {
          this.togglePanelBool = true;
      }
  }
  public hidePopup() {
    this.togglePanelBool = false;
  }
  
}