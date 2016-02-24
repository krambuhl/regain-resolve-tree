import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveTag(tree, props, config) {
  var res = { 
    type: 'tag', 
    name: tree.tagName,
    attrs: tree.attrs || {}
  };

  if (tree.className) {
    res.attrs.class = tree.className;
  }

  if (tree.attrMap) {
    Object.assign(res.attrs, tree.attrMap);
  }

  if (tree.children) {
    var locals = createDefaultLocals(tree, props);
    var frame = createFrame(tree.children, locals);
    res.children = resolveTree(frame, props, config);
  }

  return res;
}