import { Command } from 'commander';
import genDiff from './index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2, { format }) => {
    console.log(genDiff(filepath1, filepath2, format));
  });

export default program;
