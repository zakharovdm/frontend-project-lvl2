import _ from 'lodash';

const formattedValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (_.isObject(value)) {
    return '[complex value]';
  }

  return value;
};

const plain = (innerTree) => {
  const iter = (children, parent) => {
    const formatOutput = children.flatMap((node) => {
      const pathValue = parent ? `${parent}.${node.name}` : `${node.name}`;
      switch (node.type) {
        case 'added':
          return `Property '${pathValue}' was added with value: ${formattedValue(node.value)}`;
        case 'remove':
          return `Property '${pathValue}' was removed`;
        case 'changed':
          return `Property '${pathValue}' was updated. From ${formattedValue(node.value1)} to ${formattedValue(node.value2)}`;
        case 'nested':
          return `${iter(node.value, pathValue)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`This type does not exist ${node.type}`);
      }
    }); return formatOutput.join('\n');
  };
  return iter(innerTree, '');
};

export default plain;
