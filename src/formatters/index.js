import styllish from './stylish.js';
import plain from './plain.js';

const formatter = (data, format) => {
  switch (format) {
    case 'stylish':
      return styllish(data);
    case 'plain':
      return plain(data);
    default:
      throw new Error(`${format} not supported`);
  }
};

export default formatter;
