const reformat = (data) => {
  const result = data.map((node) => {
    switch (node.type) {
      case 'added':
        return `+ ${node.name}: ${node.value}`;
      case 'remove':
        return `- ${node.name}: ${node.value}`;
      case 'changed':
        return `- ${node.name}: ${node.value1}\n+ ${node.name}: ${node.value2}`;
      case 'unchanged':
        return `  ${node.name}: ${node.value}`;
      default:
        throw new Error(`This type does not exist ${node.type}`);
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default reformat;
