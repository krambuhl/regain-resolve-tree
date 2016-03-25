import assign from 'object-assign';
import set from 'object-path-set';
import get from 'object-path-get';

import { createFrame, findPath } from 'rogain-utils';
import mergeAttributes from './mergeAttributes';

export default function resolveComponentTree(component, tree, props, config) {
  var locals = { };

  if (tree.attrs) {
    if (Object.keys(tree.attrs).length > 0) {
      locals['@attrs'] = assign({}, props['@attrs'], tree.attrs);
    }

    // pass attributes for merging in resolveTag
    component.componentAttrs = tree.attrs;

    // make sure class attribute falls through
    var treeClass = get(tree, 'componentAttrs.class');

    if (treeClass && tree.attrs.class) {
      component.componentAttrs.class += ' ' + treeClass;
    }
  } else if (tree.componentAttrs && tree.componentAttrs.class) {
    component.componentAttrs = { class: tree.componentAttrs.class };
  }

  // when component defines children attach to locals
  if (tree.children) {
    var cpath = findPath(component, { type: 'component', name: 'Children' });
    set(component, cpath + '.children', tree.children);
  }

  // create from with component as context
  // and pass locals into next context
  return createFrame(component, locals);
}
