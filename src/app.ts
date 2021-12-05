import * as readline from 'node:readline';

import { checkAvailability } from './stock';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askForSKU() {
  rl.question('Enter SKU: ', async sku => {
    try {
      const availableStock = await checkAvailability(sku);

      console.log(`Available stock for SKU ${availableStock.sku}: ${availableStock.qty}`);
    } catch (err) {
      console.log(`Can't check available stock: ${err}`);
    } finally {
      askForSKU();
    }
  });
}

console.info('Press Ctrl^C to exit');
askForSKU();