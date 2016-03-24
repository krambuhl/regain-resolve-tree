import assign from 'object-assign';
import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';
import mergeAttributes from './mergeAttributes'

export default function resolveTag(tree, props, config) {
  var transforms = config.transforms.get();
  var res = { 
    type: 'tag', 
    name: tree.name
  };

  // when attributes is defined, 
  if (tree.attrs) {
    res.attrs = resolveAttributes(tree.attrs, props, config);
  }
  
  if (tree.configAttrs) {
    res.attrs = mergeAttributes(res.attrs, tree.configAttrs)
  }

  // unalias tree tagName as tree.name
  if (res.attrs && res.attrs.tagName) {
    res.name = res.attrs.tagName;
    delete res.attrs.tagName;
  }

  // when children is defined create a frame
  // with tree attributes extended into properties
  // and children as the frame context
  if (tree.children) {
    var frame = createFrame(tree.children, { 
      '@attrs': assign({}, props['@attrs'], res.attrs)
    });

    // resolve the frame into tag/text
    res.children = resolveTree(frame, props, config);
  }

  console.log(res.name, tree)

  // run transforms on each tree
  return Object.keys(transforms).reduce((copy, name) => {
    return transforms[name](copy, props);
  }, res);
}