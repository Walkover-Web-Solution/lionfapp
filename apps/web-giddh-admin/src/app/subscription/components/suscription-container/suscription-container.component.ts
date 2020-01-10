import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { SubscriptionService } from '../../../services/subscription.service';
import { AppState } from '../../../store';
import { Store, select } from '@ngrx/store';
import { AdminActions } from '../../../actions/admin.actions';
import { takeUntil, take } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { CommonPaginatedRequest, SubscriberList, TotalSubscribers } from '../../../modules/modules/api-modules/subscription';
import { ToasterService } from '../../../services/toaster.service';

@Component({
    selector: 'app-suscription-container',
    templateUrl: './suscription-container.component.html',
    styleUrls: ['./suscription-container.component.scss']
})
export class SuscriptionContainerComponent implements OnInit {

    @ViewChild('SubscribersSignupField') public SubscribersSignupField;
    @ViewChild('subscribOnField') public subscribOnField;
    @ViewChild('subscribIdField') public subscribIdField;

    public modalRef: BsModalRef;
    public modalRefEdit: BsModalRef;
    public subscriptionId: any = '';


    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    public subscriberRes: SubscriberList = new SubscriberList();
    public subscriptionData = [];
    public rightToggle: boolean = false;
    public subscriptionRequest: CommonPaginatedRequest = new CommonPaginatedRequest();
    public inlineSearch: any = '';
    public togglePanelBool: boolean;
    public totalSubscriber: TotalSubscribers

    constructor(private store: Store<AppState>, private adminActions: AdminActions, private toasty: ToasterService,
        private subscriptionService: SubscriptionService, private modalService: BsModalService) {


    }

    public openEditModal(editPlan: TemplateRef<any>) {
        this.modalRefEdit = this.modalService.show(
            editPlan,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }


    public openSubscriptionModal(template: TemplateRef<any>, subscriptionId) {
        this.subscriptionId = subscriptionId;
        this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
        );
    }

    ngOnInit() {
        this.subscriptionRequest.count = 50;
        this.subscriptionRequest.page = 1;
        this.subscriptionRequest.sortBy = 'ADDITIONAL_TRANSACTIONS';
        this.subscriptionRequest.sortType = 'desc';
        this.getSubscriptionData();
        this.getAllSubscriptionTotalData();

        this.store.pipe(select(s => s.subscriptions.allSubscriptions), takeUntil(this.destroyed$)).subscribe(res => {
            console.log('sote component data sub', res);
            if (res) {
                if (res.status === 'success') {
                    this.subscriberRes = res.body;
                    this.subscriptionData = res.body.results;
                } else {
                    this.toasty.errorToast(res.message)
                }
            }
        });
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
        this.getSubscriptionData();

    }
    public getSubscriptionData() {
        this.store.dispatch(this.adminActions.getSubscription(this.subscriptionRequest));

        // this.subscriptionService.getAllSubscriptions(this.subscriptionRequest).subscribe(res => {
        //     if (res.status === 'success') {
        //         this.subscriberRes = res.body;
        //         this.subscriptionData = res.body.results;
        //     } else {
        //         this.toasty.errorToast(res.message)
        //     }
        // });
    }
    public getAllSubscriptionTotalData() {
        this.subscriptionService.getAllTotalSubscriptions().subscribe(res => {
            if (res.status === 'success') {
                this.totalSubscriber = res.body;
            } else {
                this.toasty.errorToast(res.message)
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