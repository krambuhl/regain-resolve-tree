import assign from 'object-assign';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

import resolveComponentHelper from './resolveComponentHelper'; 
import resolveComponentTree from './resolveComponentTree'; 

export default function resolveComponent(tree, props, config) {
  // get name of component, when name is a
  // treeList resolve it into string
  var name = tree.name;
  if (Array.isArray(name)) {
    name = resolveTree(name, props, config).join('');
  }
  
  // find component in configuration
  var comp = config.components.get(name);

  // if component isn't found return an error node
  // TODO: failback to using a standard dom tag in this situation?
  if (!comp) return {
    type: 'error',
    data: '<' + name + ' /> component is not found.'
  };

  // resolve attributes when defined
  if (tree.attrs) {
    tree.attrs = resolveAttributes(tree.attrs, props, config);
  }

  var res;
  if (typeof comp === 'function') {
    // if component is a function, run it as a helper
    // with tree tree and props as arguments
    res = resolveComponentHelper(comp, tree, props);
  } else {
    // otherwise run it as a standard component
    var component = assign({}, comp);
    res = resolveComponentTree(component, tree, props, config);
  }

  // resolve component result into tag/text
  return resolveTree(res, props, config)
}