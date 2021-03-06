export const SUBSCRIPTION_API = {
    GET_SUBSCRIPTION: 'v2/admin/subscriptions/all',
    GET_SUBSCRIPTION_BY_POST: 'v2/admin/subscriptions/all?count=:count&page=:page&sortBy=:sortBy&sortType=:sortType',
    GET_USER_SUBSCRIPTION: 'v2/admin/subscriptions/all-by-user-v2?sortBy=:sortBy&sortType=:sortType&page=:page&count=:count',
    GET_SUBSCRIPTION_TOTAL: 'v2/admin/subscription-total',
    GET_ALL_COMPANIES_BY_SUBSCRIPTION_ID: 'v2/admin/subscription/companies?subscriptionId=:subscriptionId',
    GET_AUDIT_LOGS: 'v2/admin/audit-logs',
    UPDATE_SUBSCRIPTION: 'v2/admin/subscription?subscriptionId=:subscriptionId',
    GET_ALL_COMPANIES: 'v2/admin/companies?page=:page',
    GET_ALL_USER_COUNTS: 'v2/admin/user-totals',
    GET_ALL_ADMIN_USERS: 'v2/admin/users/admin/all',
    ASSIGN_MANAGER: 'v2/admin/users/assign-manager?userUniqueName=:userUniqueName',
    UPDATE_TRANSACTIONS: 'v2/admin/subscriptions/increase-transactions?subscriptionId=:subscriptionId',
    ASSIGN_PLAN: 'v2/admin/subscriptions',
    EXPORT_SUBSCRIPTIONS: 'v2/admin/subscriptions/all-by-user-v2/export?sortBy=:sortBy&sortType=:sortType',
    GET_COMPANIES_FOOTER: 'v2/admin/companies-footer',
    GET_COMPANIES_PERMISSION:'v2/admin/company-permissions?companyUniqueName=:companyUniqueName'
};
