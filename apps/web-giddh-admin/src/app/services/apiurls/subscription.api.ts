export const SUBSCRIPTION_API = {
    GET_SUBSCRIPTION: 'v2/admin/subscriptions/all',
    GET_SUBSCRIPTION_BY_POST: 'v2/admin/subscriptions/all?count=:count&page=:page&sortBy=:sortBy&sortType=:sortType',
    GET_USER_SUBSCRIPTION: 'v2/admin/subscriptions/all-by-user?sortBy=:sortBy&sortType=:sortType&page=:page&count=:count',
    GET_SUBSCRIPTION_TOTAL: 'v2/admin/subscription-total',
    GET_ALL_COMPANIES_BY_SUBSCRIPTION_ID: 'v2/admin/subscription/companies?subscriptionId=:subscriptionId',
    GET_AUDIT_LOGS: 'v2/admin/audit-logs',
    UPDATE_SUBSCRIPTION: 'v2/admin/subscription?subscriptionId=:subscriptionId',
    GET_ALL_COMPANIES: 'v2/admin/companies?page=:page',
    GET_ALL_USER_COUNTS: 'v2/admin/collective-userlist'

};
