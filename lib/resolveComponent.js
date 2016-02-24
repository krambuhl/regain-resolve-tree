import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveComponent(t, props, config) {
  var name = t.name;
  if (Array.isArray(name)) {
    name = resolveTree(name, props, config).join('');
  }
  
  var tree = Object.assign({}, t);
  var comp = Object.assign({}, config.components.get(name));

  if (comp) {
    tree.attrs = resolveAttributes(tree.attrs, props, config);

    var locals = Object.assign({}, props, createDefaultLocals(tree, props));

    comp.data = tree.attrs.data;
    comp.attrs = resolveAttributes(comp.attrs, locals, config);

    var allAttrs = Object.assign({}, tree.attrs, comp.attrs);

    comp.attrMap = { };

    for (var attr in allAttrs) {
      if (attr.indexOf('aria-') === 0 || attr.indexOf('data-') === 0 || attr === 'id' || attr === 'rel') {
        comp.attrMap[attr] = allAttrs[attr];
      }
    }

    if (tree.children) locals['@children'] = tree.children;

    var frame = createFrame(comp, locals);
    return resolveTree(frame, props, config);
  } else {
    console.log('component not found:', name);
  }
}

function getAttrs() {

  var attrs = resolveAttributes(tree.attrs, props, config)
  locals['@data'] = Object.assign({}, locals['@data'], attrs.data);
    
  var component = Object.assign({}, comp);
  var compData = Object.assign({}, props, locals);
  var cattrs = resolveAttributes(component.attrs, compData, config);
  
  var allAttrs = Object.assign({}, attrs, cattrs);
}