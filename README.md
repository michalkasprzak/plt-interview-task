# plt-interview-task

## Description
This repository contains a function that calculates the available quantity of an item with the given SKU following the
transactions which happened after the initial stocktaking.

Built and tested with Node.js v17.2.0.

## Usage
To build the code:

```
npm install
npm run build
```

After the build you can start a REPL that allows to check available stock of an item with the selected SKU:

```
npm start
```

## Additional notes
The most important function `checkAvailability(sku: string): Promise<AvailableStock>` is located
in the `src/stock.ts` file.

There are additional premade sets of data (located in the `resources` directory) used while running the tests with Jest,
as in real life usage the production data would change all the time and wouldn't allow testing for particular values.