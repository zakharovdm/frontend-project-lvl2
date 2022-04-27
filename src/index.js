import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareData from './compareData.js';
import stylish from './formatters/stylish.js';
import parse from './parsers.js';

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const genDiff = (fileName1, fileName2, formatter = stylish) => {
  const file1 = readFile(fileName1);
  const file2 = readFile(fileName2);

  const format1 = path.extname(fileName1);
  const format2 = path.extname(fileName2);

  const data1 = parse(file1, format1);
  const data2 = parse(file2, format2);

  const diffData = compareData(data1, data2);

  return formatter(diffData);
};

export default genDiff;
