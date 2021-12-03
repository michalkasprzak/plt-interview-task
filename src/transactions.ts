import { normalize } from 'path';

import { loadJSONArray } from './utils';

interface Transaction {
  sku: string,
  type: TransactionType,
  qty: number
}

enum TransactionType {
  Order = 'order',
  Refund = 'refund'
}

interface TransactionsSummary {
  actions: number,
  qty: number
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
    const transactionsFile = normalize(__dirname + '/../') + 'resources/transactions.json';

    let transactions = await loadJSONArray<Transaction>(transactionsFile);

    let actions = 0;
    let qty = 0;

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
    throw new Error('transactions.json file is either missing or corrupted');
  }
}