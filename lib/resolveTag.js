import assign from 'object-assign';
import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';
import mergeAttributes from './mergeAttributes';

export default function resolveTag(tree, props, config) {
  // create a result tree
  let res = {
    type: 'tag',
    name: tree.name
  };

  // when attributes array is defined,
  // flatten it into a standard object
  if (tree.attribs) {
    res.attribs = resolveAttributes(tree.attribs, props, config);
  }

  if (tree.componentAttribs) {
    res.attribs = mergeAttributes(res.attribs, tree.componentAttribs);
  }

  // resolve children attributes when defined
  if (res.attribs && res.attribs.tagName) {
    res.name = res.attribs.tagName;
    delete res.attribs.tagName;
  }

  // when children is defined create a frame
  // with tree attributes extended into properties
  // and children as the frame context
  if (tree.children) {
    var frame = createFrame(tree.children, {
      '@attrs': assign({}, props['@attrs'], res.attribs)
    });

    // resolve the frame into tag/text
    res.children = resolveTree(frame, props, config);
  }

  return res;
}
