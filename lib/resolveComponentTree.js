import assign from 'object-assign';
import { createFrame } from 'rogain-utils';

export default function resolveComponentTree(component, tree, props, config) {
  var locals = { };

  if (tree.attrs) {
    console.log('compdata:', tree.attrs)
    component.componentAttrs = tree.attrs;

    if (Object.keys(tree.attrs).length > 0) {
      locals['@attrs'] = assign({}, props['@attrs'], tree.attrs);
    }
  }

  // when component defines children attach to locals
  if (tree.children) {
    locals['@children'] = tree.children;
  }

  // create from with component as context
  // and pass locals into next context
  return createFrame(component, locals);  
}
