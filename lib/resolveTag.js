import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveTag(tree, props, config) {
  var res = { 
    type: 'tag', 
    name: tree.tagName,
  };

  if (tree.attrs) {
    res.attrs = resolveAttributes(tree.attrs, props, config);
  }

  if (tree.className) {
    res.attrs.class = tree.className;
  }

  if (tree.children) {
    var locals = { '@attrs': Object.assign({}, props['@attrs'], res.attrs) };
    res.children = createFrame(tree.children, locals);
  }

  return res;
}