import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { normalizeDataset } from './aggregate';
import type { PollDataset } from './types';

export async function readPollDataset(): Promise<PollDataset> {
  try {
    const content = await readFile(path.join(process.cwd(), 'public/dados/pesquisas.json'), 'utf8');
    return normalizeDataset(JSON.parse(content));
  } catch {
    return normalizeDataset({ coverageNote: 'Estamos verificando os resultados e os registros das pesquisas antes de incluí-los.' });
  }
}
