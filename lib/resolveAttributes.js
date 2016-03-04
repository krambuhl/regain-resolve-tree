import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';

export default function resolveAttributes(attrs, props, config) {
  return attrs.reduce((list, attr) => {
    var t = resolveTree(attr, props, config);
    if (t.name === 'class' && list.class) {
      list[t.name] += ' ' + t.data;
    } else {
      list[t.name] = t.data;
    }

    return list;
  }, {});

  return attrs;
}