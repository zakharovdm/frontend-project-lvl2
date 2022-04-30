import _ from 'lodash';

const getIndent = (currentDepth, spaceCount = 4) => ' '.repeat(spaceCount * currentDepth - 2);

const formattedValue = (value, treeDepth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const lines = Object
    .entries(value)
    .map(([key, val]) => `${getIndent(treeDepth + 1)}  ${key}: ${formattedValue(val, treeDepth + 1)}`);

  return [
    '{',
    ...lines,
    `${getIndent(treeDepth)}  }`]
    .join('\n');
};

const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getFormattedValue = (value, operator) => `${getIndent(depth)}${operator} ${node.name}: ${formattedValue(value, depth)}\n`;
    switch (node.type) {
      case 'added':
        return getFormattedValue(node.value, '+');
      case 'remove':
        return getFormattedValue(node.value, '-');
      case 'changed':
        return `${getFormattedValue(node.value1, '-')}${getFormattedValue(node.value2, '+')}`;
      case 'unchanged':
        return getFormattedValue(node.value, ' ');
      case 'nested':
        return `${getIndent(depth)}  ${node.name}: {\n${iter(node.children, depth + 1).join('')}${getIndent(depth)}  }\n`;
      default:
        throw new Error(`This type does not exist ${node.type}`);
    }
  });

  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
