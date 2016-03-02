import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveTag(tree, props, config) {
  // create a result tree
  var res = { 
    type: 'tag', 
    name: tree.name,
  };

  // when attributes array is defined, 
  // flatten it into a standard object 
  if (tree.attrs) {
    res.attrs = resolveAttributes(tree.attrs, props, config);
  }

  // when children is defined create a frame
  // with tree attributes extended into properties
  // and children as the frame context
  if (tree.children) {
    var frame = createFrame(tree.children, { 
      '@attrs': Object.assign({}, props['@attrs'], res.attrs)
    });

    // resolve the frame into tag/text
    res.children = resolveTree(frame, props, config);
  }

  return res;
}