import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const genDiff = (fileName1, fileName2) => {
  const file1 = readFile(fileName1);
  const file2 = readFile(fileName2);
};

export default genDiff;
