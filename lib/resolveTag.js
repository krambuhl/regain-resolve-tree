import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveTag(tree, props, config) {
  var res = { type: 'tag', name: tree.tagName };

  if (Array.isArray(tree.attrs)) {
    res.attrs = resolveAttributes(tree.attrs, props, config);
  }

  if (tree.className) {
    res.attrs.class = tree.className;
  }

  if (tree.attrMap) {
    Object.assign(res.attrs, tree.attrMap);
  }

  if (tree.children) {
    var frame = createFrame(tree.children, createDefaultLocals(tree, props));
    res.children = resolveTree(frame, props, config);
  }

  return res;
}