export class CommonPaginatedRequest {
    public from?: string;
    public to?: string;
    public count?: number;
    public page?: number;
    public sortType?: string;
    public sortBy?: string;
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
}
export class AdvanceSearchRequestSubscriptions {
    signUpOnFrom: string;
    signUpOnTo: string;
    startedAtFrom: string;
    balance: string;
    expiry: string;
    // subscriptionId: string;
    // status: string;
    // planName: string;
    // userName: string;
    // email: string;
    // mobile: string;
}
export interface AdvanceSearchRequest {
    // signUpOnFrom: string;
    // signUpOnTo: string;
    // startedAtFrom: string;
    // startedAtTo: string;
    // balance: string;
    // expiry: string;
    startedAtTo: string;
    subscriptionId: string;
    status: string;
    planName: string;
    userName: string;
    email: string;
    mobile: string;
}