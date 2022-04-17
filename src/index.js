import process from 'process';
import path from 'path';
import { readFileSync } from 'fs';
import compareData from './compareData.js';

const render = (data) => {
  console.log(data);
};

const getFilePath = (filename) => path.resolve(process.cwd(), filename);
const readFile = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const genDiff = (fileName1, fileName2) => {
  const file1 = readFile(fileName1);
  const file2 = readFile(fileName2);
  const data1 = JSON.parse(file1);
  const data2 = JSON.parse(file2);
  const diffData = compareData(data1, data2);

  return render(diffData);
};

export default genDiff;
