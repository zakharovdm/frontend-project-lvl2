import styllish from './stylish.js';

const formatter = (data, format) => {
  switch (format) {
    case 'stylish':
      return styllish(data);
    default:
      throw new Error(`${format} not supported`);
  }
};

export default formatter;
