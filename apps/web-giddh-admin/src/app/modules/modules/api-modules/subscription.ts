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
}

export class StatusModel {
    trial: boolean;
    expired: boolean;
    active: boolean
}
export class AdvanceSearchRequestSubscriptions {
    signUpOnFrom?: string;
    signUpOnTo?: string;
    startedAtFrom?: string;
    balance?: string;
    expiry?: string;
    startedAtBefore?: string;
    startedAtTo?: string;
    subscriptionId?: string;
    status?: string[];
    planName?: string;
    userName?: string;
    email?: string;
    mobile?: string;
    planUniqueName?: string[];

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
    companyName: string = '';
    subscriptionId: string = '';
    planUniqueNames: string[] = [];
    userName: string = '';
    status: string[] = []; // "trial","expired"
}