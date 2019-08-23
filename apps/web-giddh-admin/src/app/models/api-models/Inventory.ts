import { IPaginatedResponse } from '../interfaces/paginatedResponse.interface';
import { IAccountDetails, IManufacturingDetails, IStockDetail, IStockItem, IStockReport, IStockReportItem, IStocksItem, IStockTransaction, IStockUnit, IStockUnitItem, IStockUnitResponse } from '../interfaces/stocksItem.interface';
import { IOption } from '../../theme/ng-select/ng-select';

export interface INameUniqueName {
  uniqueName: string;
  name: string;
  isActive?: boolean;
}