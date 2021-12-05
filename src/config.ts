import { normalize } from 'path';

class AppConfig {

  stockSource: string;
  transactionsSource: string;

  constructor() {
    if (process.env.NODE_ENV === 'test') {
      // Use mock data while running tests since the production values may change over time
      this.stockSource = normalize(__dirname + '/../') + 'resources/stock_test.json';
      this.transactionsSource = normalize(__dirname + '/../') + 'resources/transactions_test.json';
    } else {
      this.stockSource = normalize(__dirname + '/../') + 'resources/stock.json';
      this.transactionsSource = normalize(__dirname + '/../') + 'resources/transactions.json';
    }
  }
}

export default new AppConfig();