import assign from 'object-assign';
import set from 'object-path-set';

import { createFrame, findPath } from 'rogain-utils';

export default function resolveComponentTree(component, tree, props, config) {
  var locals = { };

  if (tree.attrs) {
    component.componentAttrs = tree.attrs;

    if (Object.keys(tree.attrs).length > 0) {
      locals['@attrs'] = assign({}, props['@attrs'], tree.attrs);
    }
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
