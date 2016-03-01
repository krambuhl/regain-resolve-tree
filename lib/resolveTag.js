import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveTag(tree, props, config) {
  var res = { 
    type: 'tag', 
    name: tree.name,
  };

  if (tree.attrs) {
    res.attrs = resolveAttributes(tree.attrs, props, config);
  }

  if (tree.children) {
    var frame = createFrame(tree.children, { 
      '@attrs': Object.assign({}, props['@attrs'], res.attrs)
    });

    res.children = resolveTree(frame, props, config);
  }

  return res;
}