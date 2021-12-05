import { rename } from 'fs/promises';

import appConfig from './config';
import * as stock from './stock';

describe('checkAvailability', () => {
  it('should fail if the SKU is an empty string', async () => {
    await expect(stock.checkAvailability('')).rejects.toThrow('empty string');
  });

  it ('should fail if the stock.json file cannot be read', async () => {
    try {
      await rename(appConfig.stockSource, appConfig.stockSource + '.tmp');
      await expect(stock.checkAvailability('test')).rejects.toThrow('Stock JSON');
    } finally {
      await rename(appConfig.stockSource + '.tmp', appConfig.stockSource);
    }
  });

  it('should throw an error if the SKU does not exist anywhere', async () => {
    await expect(stock.checkAvailability('test')).rejects.toThrow('SKU was not found');
  });

  it('should return a valid value for an item that was found only in the transactions history', async () => {
    const availability = await stock.checkAvailability('test/3');

    expect(availability.sku).toEqual('test/3');
    expect(availability.qty).toEqual(12);
  });
});