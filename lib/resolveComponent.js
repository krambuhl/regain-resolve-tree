import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveComponent(tree, props, config) {
  // get name of component, when name is a
  // treeList resolve it into string
  var name = tree.name;
  if (Array.isArray(name)) {
    name = resolveTree(name, props, config).join('');
  }
  
  // find component in configuration
  var comp = config.components.get(name)

  // if component isn't found return an error node
  // TODO: failback to using a standard dom tag in this situation?
  if (!comp) return {
    type: 'error',
    data: '<' + name + ' /> component is not found.'
  };

  // create copies for component context
  var copy = Object.assign({}, tree);

  // resolve attributes when defined
  if (copy.attrs) {
    copy.attrs = resolveAttributes(copy.attrs, props, config);
  }


  var res;
  if (typeof comp === 'function') {
    // if component is a function, run it as a helper
    // with copy tree and props as arguments
    res = resolveComponentHelper(comp, copy, props);
  } else {
    // otherwise run it as a standard component
    var component = Object.assign({}, comp);
    res = resolveComponentTree(component, copy, props);
  }

  // resolve component result into tag/text
  return resolveTree(res, props, config)
}

export function resolveComponentHelper(helper, children, props) {
  console.log('helper', helper)


  // create default local data to merge into props
  var locals = createDefaultLocals(props, copy);
  
  // if data attribute is defined, pass to locals
  // and tree data
  if (copy.attrs && copy.attrs.data) {
    copy.data = locals['@data'] = copy.attrs.data;
  }

  // run helper with copy tree and current props
  // locals are not passed here, tree will contain data
  var res = helper(copy, props);

  // create frame with helper result as context
  // and pass locals to next context
  return createFrame(res, locals);
}

export function resolveComponentTree(component, children, props) {
  console.log('component', component)

  // resolve children attributes when defined
  if (children.attrs && children.attrs.tagName) {
    component.name = children.attrs.tagName;
  }

  // if (component.attrs) {
  //   component.attrs = component.attrs.concat(tree.attrs)
  // } else {
  //   component.attrs = tree.attrs;
  // }

  // define default locals with tree attrs extends
  var locals = createDefaultLocals(props, children);

  // when component data is defined attach to locals
  if (children.attrs.data) {
    component.data = locals['@data'] = children.attrs.data;
  }

  // when component defines children attach to locals
  if (children.children) {
    locals['@children'] = children.children;
  }

  // create from with component as context
  // and pass locals into next context
  return createFrame(component, locals);  
}


export function createDefaultLocals(props, tree) {
  return { 
    '@attrs': Object.assign({}, props['@attrs'], tree.attrs)
  };
}