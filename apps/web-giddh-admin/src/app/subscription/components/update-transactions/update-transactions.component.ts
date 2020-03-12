import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IOption } from '../../../theme/ng-select/ng-select';
import { UserService } from '../../../services/user.service';
import { PAGINATION_COUNT } from '../../../modules/modules/api-modules/subscription';

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
    public updateTransactions: any = {};

    constructor(private userService: UserService) { }

    ngOnInit() {
        if(this.subscriptionId) {
            this.getAllUserData();
        } else {
            this.closePopup();
        }
    }

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
}