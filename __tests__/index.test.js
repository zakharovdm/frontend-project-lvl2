import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('Compare two files, format stylish', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('nestedOutput.txt'));
  expect(genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toEqual(readFile('nestedOutput.txt'));
});

test('Compare two files, format plain', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'plain')).toEqual(readFile('plainOutput.txt'));
});

test('Compare two files, format json', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.yml'), 'json')).toEqual(readFile('jsonOutput.json'));
});
