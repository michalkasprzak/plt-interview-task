import { rename } from 'fs/promises';
import { normalize } from 'path';

import * as transactions from './transactions';

describe('getSummaryByItem', () => {
  it('should fail if the transactions.json file isn\'t available', async () => {
    const transactionsFile = normalize(__dirname + '/../') + 'resources/transactions.json';

    await rename(transactionsFile, transactionsFile + '.tmp');
    await expect(transactions.getSummaryByItem('test')).rejects.toThrow('transactions.json');
    await rename(transactionsFile + '.tmp', transactionsFile);
  });

  it('should fail for an empty SKU', async () => {
    await expect(transactions.getSummaryByItem('')).rejects.toThrow('empty string');
  });

  it('should return non-zero values for a known SKU', async () => {

    const result = await transactions.getSummaryByItem('KED089097/68/09');

    expect(result.actions).not.toEqual(0);
    expect(result.qty).not.toEqual(0);
  });

  it('should return zero values for an unknown SKU', async () => {
    await expect(transactions.getSummaryByItem('random-string')).resolves.toMatchObject({
      actions: 0,
      qty: 0
    });
  });
});