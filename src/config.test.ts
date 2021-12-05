import appConfig from './config';

test('stockSource should be defined in config', () => {
  expect(typeof appConfig.stockSource).toBe('string');
  expect(appConfig.stockSource.length).toBeGreaterThan(0);
});

test('transactionsSource should be defined in config', () => {
  expect(typeof appConfig.transactionsSource).toBe('string');
  expect(appConfig.transactionsSource.length).toBeGreaterThan(0);
});