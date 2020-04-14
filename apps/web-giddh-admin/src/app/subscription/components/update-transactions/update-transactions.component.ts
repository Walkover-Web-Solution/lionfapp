import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IOption } from '../../../theme/ng-select/ng-select';
import { UserService } from '../../../services/user.service';
import { PAGINATION_COUNT } from '../../../modules/modules/api-modules/subscription';
import { SubscriptionService } from '../../../services/subscription.service';
import { ToasterService } from '../../../services/toaster.service';

@Component({
    selector: 'app-update-transactions',
    templateUrl: './update-transactions.component.html',
    styleUrls: ['./update-transactions.component.scss']
})

export class UpdateTransactionsComponent implements OnInit {
    @Output() public hideUpdateTransactionPopup: EventEmitter<boolean> = new EventEmitter(true);
    @Input() public subscriptionId: string = '';

    public transactionActions: IOption[] = [{ label: 'Add', value: 'add' }, { label: 'Deduct', value: 'deduct' }];
    public getUserListRequest: any = {
        sortBy: '',
        sortType: '',
        count: PAGINATION_COUNT,
        page: 1
    };
    public getUserListPostRequest: any = {};
    public subscribedUsers: any[] = [];
    public updateTransactionsRequest: any = {
        addOnTransactions: '',
        action: 'add'
    };
    public isLoading: boolean = false;

    constructor(private userService: UserService, private subscriptionService: SubscriptionService, private toasty: ToasterService) { }

    /**
     * Initializes the component
     *
     * @memberof UpdateTransactionsComponent
     */
    ngOnInit() {
        if(this.subscriptionId) {
            this.getAllUserData();
        } else {
            this.closePopup();
        }
    }

    /**
     * This will emit the close popup event
     *
     * @memberof UpdateTransactionsComponent
     */
    public closePopup() {
        this.hideUpdateTransactionPopup.emit();
    }

    /**
     * This function is used to get user list
     *
     * @memberof UserListComponent
     */
    public getAllUserData() {
        this.getUserListPostRequest = {subscriptionId: this.subscriptionId};
        this.userService.getAllSubscriptionsByUser(this.getUserListRequest, this.getUserListPostRequest).subscribe(res => {
            if (res.status === 'success' && res.body && res.body.results) {
                this.subscribedUsers = res.body.results;
            } else {
                this.subscribedUsers = [];
            }
        });
    }

    /**
     * This will only allow positive numbers in text field
     *
     * @param {*} event
     * @returns {boolean}
     * @memberof UpdateTransactionsComponent
     */
    public allowPositiveNumbersOnly(event): boolean {
        return event.charCode >= 48;
    }

    /**
     * This will call api to update the transactions
     *
     * @memberof UpdateTransactionsComponent
     */
    public updateTransactions(): void {
        if(!this.isLoading) {
            let addOnTransactions = this.updateTransactionsRequest.addOnTransactions;

            if(this.updateTransactionsRequest.action === "deduct") {
                addOnTransactions = "-" + addOnTransactions;
            }

            this.isLoading = true;
            let body = {addOnTransactions: addOnTransactions};
            this.subscriptionService.updateTransactions(this.subscriptionId, body).subscribe(res => {
                this.isLoading = false;

                if (res.status === 'success') {
                    this.toasty.successToast(res.body);
                    this.closePopup();
                } else {
                    this.toasty.errorToast(res.message);
                }
            });
        }
    }

    /**
     * This will reset the form fields values
     *
     * @memberof UpdateTransactionsComponent
     */
    public resetForm(): void {
        this.updateTransactionsRequest.addOnTransactions = '';
        this.updateTransactionsRequest.action = 'add';
    }
}