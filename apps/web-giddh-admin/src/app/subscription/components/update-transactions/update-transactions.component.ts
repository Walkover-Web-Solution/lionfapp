import { Component, OnInit} from '@angular/core';
import { IOption } from '../../../theme/ng-select/ng-select';
@Component({
    selector: 'app-update-transactions',
    templateUrl: './update-transactions.component.html',
    styleUrls: ['./update-transactions.component.scss']
})
export class UpdateTransactionsComponent implements OnInit {
  
  public createPlanRequest: any = {};
  public durationUnits: IOption[] = [{ label: 'YEAR', value: 'YEAR' }, { label: 'MONTH', value: 'MONTH' }, { label: 'WEEK', value: 'WEEK' }, { label: 'DAY', value: 'DAY' }];

    constructor() { }

    ngOnInit() {
    }
}