import { readFile } from 'fs/promises';

/**
 * Function for loading a whole JSON array from a file into the memory.
 *
 * Production version shouldn't read all of the file immediately in case we'd be dealing with a big sets of data.
 */
 export async function loadJSONArray<T>(path: string): Promise<T[]> {
  try {
    const contents = await readFile(path, 'utf-8');

    // Nice to have: Manually parse each entry to ensure their validity
    const data = JSON.parse(contents);

    let values: T[];

    if (Array.isArray(data)) {
      values = data;
    } else {
      values = [data];
    }

    return values;
  } catch (err) {
    // Idea: use a logger to store the error's details
    throw new Error('Could not load the specified file');
  }
}