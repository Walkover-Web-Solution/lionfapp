/** Pagination count limit */
export const PAGINATION_COUNT = 50;
export class CommonPaginatedRequest {
    public from?: string;
    public to?: string;
    public count?: any;
    public page?: any;
    public sortType?: string;
    public sortBy?: string;
    public id?: string;
}

export class SubscriberList {
    page: number;
    count: number;
    totalPages: number;
    totalItems: number;
    results: Result[];
    size: number;
    fromDate?: any;
    toDate?: any;
    openingBalance: OpeningBalance;
    closingBalance: OpeningBalance;
    debitTotal: number;
    creditTotal: number;
}

export class OpeningBalance {
    amount: number;
    type: string;
}

export class Result {
    companies?: any;
    companiesWithTransactions?: any;
    totalTransactions: number;
    userDetails: UserDetails;
    totalCompanies: number;
    additionalTransactions: number;
    createdAt: string;
    subscriptionId: string;
    balance: number;
    startedAt: string;
    companyTotalTransactions?: any;
    planDetails: PlanDetails;
    additionalCharges?: any;
    expiry: string;
    status: string;
}

export class PlanDetails {
    countries: any[];
    uniqueName: string;
    amount: number;
    createdAt: string;
    transactionLimit: number;
    ratePerExtraTransaction: number;
    isCommonPlan: boolean;
    companiesLimit: number;
    durationUnit: string;
    duration: number;
    name: string;
}

export class UserDetails {
    name: string;
    uniqueName: string;
    email: string;
    signUpOn: string;
    mobileno?: any;
}

export class TotalSubscribers {
    total: number;
    inactive: number;
    active: number;
    trial: number
    expired?: number
    totalUser?: number
}

export class TotalUsersCount {
    totalUser: number;
    paidUsers: number;
    trialUsers: number;
    expiredUsers: number
}
export class StatusModel {
    trial: boolean;
    expired: boolean;
    active: boolean
}

export class AdvanceSearchFromTo {
    from: any;
    to: any;
    operation?: string;
    days?: string;
    constructor() {
        this.from = '';
        this.to = '';
        this.operation = '';
        this.days = '';
    }
}

export class AdvanceSearchRequestSubscriptions {
    signUpOnFrom?: string;
    signUpOnTo?: string;
    startedAtFrom?: string;
    remainingTxn?: string;
    expiryFilter?: AdvanceSearchFromTo;
    subscribeOn?: AdvanceSearchFromTo;
    startedAtBefore?: string;
    startedAtTo?: string;
    subscriptionId?: string;
    status?: string[];
    planName?: string;
    userName?: string;
    email?: string;
    mobile?: string;
    planUniqueNames?: string[];
    remainingTxnOpn?: string;
}
export class UpdateSubscriptionModel {
    public planUniqueName?: string;
    public status?: string; // active || inactive || expired

}
export class AuditLogsRequest {
    entity: string; // for type like subscription plan etc.
    sort?: string;
    from?: string;
    to?: string;
    page?: any;
    count?: any;
    entityIdentifier: string;  // For ID of subscription or plan or etc.
}

/*
 * request body for get all companies
*/
export class GetAllCompaniesRequest {
    startedAtFrom: string;
    companyName: string;
    subscriptionId: string;
    planUniqueNames: string[];
    userName: string;
    status: string[]; // "trial","expired"
    expiryFilter?: AdvanceSearchFromTo;
    subscribeOn?: AdvanceSearchFromTo;
    remainingTxnOpn?: string;
    remainingTxn?: string;
    transactionLimitOperation?: string;
    transactionLimit?: string;
    additionalChargesOperation?: string;
    additionalCharges?: string;
    lastCompanyAccess?: AdvanceSearchFromTo;
    lastEntryAccess?: AdvanceSearchFromTo;

    constructor() {
        this.startedAtFrom = '';
        this.companyName = '';
        this.planUniqueNames = [];
        this.userName = '';
        this.status = [];
        this.subscriptionId = '';
        this.expiryFilter = new AdvanceSearchFromTo();
        this.subscribeOn = new AdvanceSearchFromTo();
        this.remainingTxnOpn = '';
        this.remainingTxn = '';
        this.transactionLimitOperation = '';
        this.transactionLimit = '';
        this.additionalCharges = '';
        this.additionalChargesOperation = '';
        this.lastCompanyAccess = new AdvanceSearchFromTo();
        this.lastEntryAccess = new AdvanceSearchFromTo();
    }
}

export class CompanyAdvanceSearchRequestSubscriptions {
    expiryFilter?: AdvanceSearchFromTo;
    subscribeOn?: AdvanceSearchFromTo;
    remainingTxnOpn?: string;
    remainingTxn?: string;
    transactionLimitOperation?: string;
    transactionLimit?: string;
    additionalChargesOperation?: string;
    additionalCharges?: string;
}