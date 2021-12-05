import { normalize } from 'path';

import appConfig from './config';
import { loadJSONArray } from './utils';

interface Transaction {
  sku: string;
  type: TransactionType;
  qty: number;
}

enum TransactionType {
  Order = 'order',
  Refund = 'refund'
}

interface TransactionsSummary {
  actions: number;
  qty: number;
}

/**
 * This function calculates total numbers of actions performed for a given SKU and the total quantity
 * of items sold (refunds are assumed to be returned into the stock)
 */
export async function getSummaryByItem(sku: string): Promise<TransactionsSummary> {

  if (sku.length === 0) {
    throw new TypeError('SKU can\'t be an empty string');
  }

  try {
    const transactions = await loadJSONArray<Transaction>(appConfig.transactionsSource);

    let actions = 0; // Represents the total number of transactions the particular SKU was part of
    let qty = 0; // Final count of items sold

    for (let transaction of transactions) {
      if (transaction.sku === sku) {
        if (transaction.type === TransactionType.Order) {
          actions++;
          qty += transaction.qty;
        }

        if (transaction.type === TransactionType.Refund) {
          actions++;
          qty -= transaction.qty;
        }
      }
    }

    return {actions, qty};
  } catch (err) {
    throw new Error('Transactions JSON file is either missing or corrupted');
  }
}