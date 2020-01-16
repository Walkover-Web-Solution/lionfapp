export const SUBSCRIPTION_API = {
    GET_SUBSCRIPTION: 'v2/admin/subscriptions/all',
    GET_USER_SUBSCRIPTION: 'v2/admin/subscriptions/all-by-user?sortBy=:sortBy&sortType=:sortType&page=:page&count=:count',
    GET_SUBSCRIPTION_TOTAL: 'v2/admin/subscription-total',
    GET_ALL_COMPANIES_BY_SUBSCRIPTION_ID: 'v2/admin/subscription/companies?subscriptionId=:subscriptionId',
    GET_AUDIT_LOGS: 'v2/admin/audit-logs?subscriptionId=:subscriptionId',
    UPDATE_SUBSCRIPTION: 'v2/admin/subscription?subscriptionId=:subscriptionId'
};
