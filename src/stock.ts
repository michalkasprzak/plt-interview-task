import { normalize } from 'path';

import appConfig from './config';
import * as transactions from './transactions';
import { loadJSONArray } from './utils';

export interface InventoryItem {
  sku: string;
  stock: number;
}

interface AvailableStock {
  sku: string;
  qty: number;
}

export async function checkAvailability(sku: string): Promise<AvailableStock> {

  if (sku.length === 0) {
    throw new TypeError('SKU cannot be an empty string');
  }

  let stockItems;

  try {
    stockItems = await loadJSONArray<InventoryItem>(appConfig.stockSource);
  } catch (err) {
    throw new Error('Stock JSON file is either missing or corrupted');
  }

  const initialStock: InventoryItem = stockItems.find(item => item.sku === sku) || { sku, stock: 0 };

  let transactionsSummary;

  try {
    transactionsSummary = await transactions.getSummaryByItem(sku);
  } catch (err) {
    throw new Error('Unable to retrieve transactions history');
  }

  if (initialStock.stock === 0 && transactionsSummary.actions === 0) {
    throw new Error('Product with the given SKU was not found');
  }

  return {
    sku,
    qty: initialStock.stock - transactionsSummary.qty
  };

}