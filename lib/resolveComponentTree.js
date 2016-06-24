import assign from 'object-assign';
import setPath from 'object-path-set';
import getPath from 'object-path-get';
import { createFrame, findPath } from 'rogain-utils';

export default function resolveComponentTree(component, tree, props, config) {
  let locals = { };

  if (tree.attribs) {
    if (Object.keys(tree.attribs).length > 0) {
      locals['@attrs'] = assign({}, props['@attrs'], tree.attribs);
    }

    // pass attributes for merging in resolveTag
    component.componentAttribs = tree.attribs;

    // make sure class attribute falls through
    const treeClass = getPath(tree, 'componentAttribs.class');

    if (treeClass && tree.attribs.class) {
      component.componentAttribs.class += ' ' + treeClass;
    }
  } else if (tree.componentAttribs && tree.componentAttribs.class) {
    component.componentAttribs = { class: tree.componentAttribs.class };
  }

  // replace <Children /> component with content
  if (tree.children) {
    const cpath = findPath(component, { type: 'component', name: 'Children' });
    setPath(component, cpath, tree.children);
  }

  // create from with component as context
  // and pass locals into next context
  return createFrame(component, locals);
}
