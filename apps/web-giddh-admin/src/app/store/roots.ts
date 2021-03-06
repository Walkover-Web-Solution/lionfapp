import * as fromSubscriptions from './subscription/subscriptions.reducer';
import * as fromRouter from '@ngrx/router-store';
import * as fromGeneral from './general/general.reducer';
import * as fromHome from './home/home.reducer';
import * as fromPermission from './Permission/permission.reducer';
import * as fromManufacturing from './Manufacturing/manufacturing.reducer';
import * as fromLogin from './authentication/authentication.reducer';
import * as fromCompany from './Company/company.reducer';
import * as fromGroupAndAccounts from './GroupWithAccounts/groupwithaccounts.reducer';
import * as fromInventory from './Inventory/inventory.reducer';
import * as fromSearch from './Search/search.reducer';
import * as fromAuditLogs from './AuditLogs/audit-logs.reducer';
import * as fromFlyAccounts from './header/fly-accounts.reducer';
import * as fromInvoice from './Invoice/invoice.reducer';
import * as fromInvoiceTemp from './Invoice/invoice.template.reducer';
import * as fromTlPl from './tl-pl/tl-pl.reducer';
import * as fromLedger from './Ledger/ledger.reducer';
import * as fromSettings from './Settings/Settings.reducer';
import * as fromSales from './Sales/sales.reducer';
import * as fromInvoicePurchase from './invoice-purchase/invoice-purchase.reducer';
import * as fromDayBook from './Daybook/daybook.reducer';
import * as fromNewVsOldInvoices from './new-vs-old-invoices/new-vs-old-invoices.reducer';
import * as fromUserSession from './General/session.reducer';
import * as fromImportExcel from './import-excel/import-excel.reducer';
import * as fromInventoryInOut from './Inventory-in-out/inventory-in-out.reducer';
import * as fromInventoryBranchTransfer from './InventoryBranchTransfer/InventoryBranchTransfer.reducer';
import * as fromCompanyImportExport from './CompanyImportExport/companyImportExport';
import * as fromReceipt from './Invoice/Receipt/receipt.reducer';
import * as fromEwaybill from './Invoice/ewaybill/eway-bill.reducer';
import * as fromGstReconcile from './GstReconcile/GstReconcile.reducer';
import * as fromGstR from './GstR/GstR.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  subscriptions: fromSubscriptions.SubscriptionsState;
  router: fromRouter.RouterReducerState;
  general: fromGeneral.GeneralState
}

export const reducers: ActionReducerMap<AppState> = {
  subscriptions: fromSubscriptions.SubscriptionsReducer,
  router: fromRouter.routerReducer,
  general: fromGeneral.GeneralReducer
};
