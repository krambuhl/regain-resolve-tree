import { createFrame, createDefaultLocals } from 'rogain-utils';

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
  if (!comp) return {
    type: 'error',
    data: '<' + name + ' /> component is not found.'
  };

  // create copies for component context
  var component = Object.assign({}, comp);
  var copy = Object.assign({}, tree);

  // resolve copy attributes when defined
  if (copy.attrs) {
    copy.attrs = resolveAttributes(copy.attrs, props, config);

    // tagName
    if (copy.attrs.tagName) {
      component.name = copy.attrs.tagName;
    }
  }

  if (!component.attrs) {
    component.attrs = copy.attrs;
  } else {
    // create tree attrs if not defined
    if (!copy.attrs) {
      copy.attrs = {};
    }
    
    // resolve component attributes when defined
    component.attrs = resolveAttributes(component.attrs, props, config);
    
    // merge reasonable component attrs into tree
    for (var attr in copy.attrs) {
      let value = copy.attrs[attr];
      if (attr !== 'data' && attr !== 'class' && attr !== 'tagName' && typeof value !== 'object' && !Array.isArray(value)) {
        component.attrs[attr] = value;
      }
    }

    // merge class instead of replace
    if (copy.attrs.class) {
      if (component.attrs.class) {
        component.attrs.class = component.attrs.class + ' ' + copy.attrs.class;
      } else {
        component.attrs.class = copy.attrs.class;
      }
    }
  }

  // define default locals with tree attrs extends
  var locals = { 
    '@attrs': Object.assign({}, props['@attrs'], copy.attrs)
  };

  // when component data is defined attach to locals
  if (copy.attrs.data) {
    locals['@data'] = copy.attrs.data;
  }

  // when component defines children attach to locals
  if (copy.children) {
    locals['@children'] = copy.children;
  }

  // create from with component as context
  // and pass locals into next context
  var frame = createFrame(component, locals);    

  // resolve frame into tag/html
  return resolveTree(frame, props, config);
}