const COMMON_URL_FOR_ACCOUNT = 'company/:companyUniqueName/accounts/:accountUniqueName';
const COMMON_URL_FOR_ACCOUNT_V2 = 'v2/company/:companyUniqueName/accounts/:accountUniqueName';

export const ACCOUNTS_API_V2 = {
  GET: COMMON_URL_FOR_ACCOUNT_V2,
  UPDATE: 'v2/company/:companyUniqueName/groups/:groupUniqueName/accounts/:accountUniqueName',
  CREATE: 'v2/company/:companyUniqueName/groups/:groupUniqueName/accounts'
};

export const ACCOUNTS_API = {
  CREATE: 'company/:companyUniqueName/groups/:groupUniqueName/accounts',
};
