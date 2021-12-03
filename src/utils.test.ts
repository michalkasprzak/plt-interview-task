import * as fs from 'fs/promises';
import { tmpdir } from 'os';

import * as utils from './utils';

interface Data {
  id: number;
  name: string;
}

const testData: Data[] = [
  {
    id: 0,
    name: 'item 1'
  },
  {
    id: 1,
    name: 'item 2'
  },
  {
    id: 2,
    name: 'item 3'
  },
  {
    id: 3,
    name: 'item 4'
  }
];

describe('loadJSONArray', () => {
  it('should throw an error for a non-existing file', async () => {
    const tmpFile = tmpdir() + '/plt-' + Math.floor(Math.random() * 100) + '.json';

    await expect(utils.loadJSONArray(tmpFile)).rejects.toThrow('Could not load');
  });

  it('should read and parse a set of known data', async () => {
    const tmpFile = tmpdir() + '/plt-' + Math.floor(Math.random() * 100) + '.json';

    const handle = await fs.open(tmpFile, 'w');

    await fs.writeFile(handle, JSON.stringify(testData));
    await handle.close();

    const result = await utils.loadJSONArray<Data>(tmpFile);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(4);

    await fs.unlink(tmpFile);
  });

  it('should return array with one element for a JSON object', async () => {
    const tmpFile = tmpdir() + '/plt-' + Math.floor(Math.random() * 100) + '.json';

    const handle = await fs.open(tmpFile, 'w');

    await fs.writeFile(handle, JSON.stringify({id:0}));
    await handle.close();

    const result = await utils.loadJSONArray<Data>(tmpFile);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(1);

    await fs.unlink(tmpFile);
  });
});