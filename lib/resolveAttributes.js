import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';

export default function resolveAttributes(attrs, props, config) {
  if (Array.isArray(attrs)) {
    return attrs.reduce((list, attr) => {
      var t = resolveTree(attr, props, config);
      list[t.name] = t.data;
      return list;
    }, {});
  }

  return attrs;
}