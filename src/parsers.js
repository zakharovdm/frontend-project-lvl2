import yaml from 'js-yaml';

const parse = (file, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error(`This format does not exist ${format}`);
  }
};

export default parse;
