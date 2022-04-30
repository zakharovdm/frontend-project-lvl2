import _ from 'lodash';

const compareData = (data1, data2) => {
  const keys = Object.keys({ ...data1, ...data2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', name: key, children: compareData(value1, value2) };
    }

    if (!_.has(data1, key)) {
      return { type: 'added', name: key, value: value2 };
    }

    if (!_.has(data2, key)) {
      return { type: 'remove', name: key, value: value1 };
    }

    if (!_.isEqual(value1, value2)) {
      return {
        type: 'changed', name: key, value1, value2,
      };
    }

    return { type: 'unchanged', name: key, value: value1 };
  });
};

export default compareData;
