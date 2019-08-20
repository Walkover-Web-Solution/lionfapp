export class Subscription{
  public userDetails: UserDetails;
  public companies: [];
  public totalTransactions: number;
  public totalCompanies: number;
  public additionalTransactions: number;
  public createdAt: string;
  public expiry: string;
  public subscriptionId: string;
  public balance: number;
  public startedAt: string;
  public planDetails: PlanDetails;
  public additionalCharges: number;
  public status: string;
}

export interface UserDetails {
  name: string,
  uniqueName: any,
  email: any,
  signUpOn: any,
  mobileno: null
}

export interface PlanDetails {
  countries: [],
  uniqueName: any,
  amount: number,
  signUpOn: any,
  ratePerExtraTransaction: number,
  isCommonPlan: boolean,
  transactionLimit: number,
  companiesLimit: number,
  durationUnit: string,
  duration: number,
  name: string
}