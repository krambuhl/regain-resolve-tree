import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveComponent(tree, props, config) {
  var name = tree.name;
  if (Array.isArray(name)) {
    name = resolveTree(name, props, config).join('');
  }
  

  var comp = config.components.get(name);

  if (comp) {
    var component = Object.assign({}, comp);
    var locals = createDefaultLocals(tree, props);
  console.log('comp', name, locals);

    var cattrs = resolveAttributes(component.attrs, props, config)
    var attrs = resolveAttributes(tree.attrs, props, config)
    var allAttrs = Object.assign({}, attrs, cattrs);

    var className = [];

    if (cattrs.class) className.push(cattrs.class);
    if (attrs.class) className.push(attrs.class);

    allAttrs.class = component.className = className.join(' ');
    allAttrs.classList = component.classList = component.className.split(' ');

    component.attrMap = { };

    for (var attr in allAttrs) {
      if (attr.indexOf('aria-') === 0 
        || attr.indexOf('data-') === 0
        || attr === 'id'
        || attr === 'rel'
      ) {
        component.attrMap[attr] = allAttrs[attr];
      }
    }

    locals['@attrs'] = Object.assign({}, allAttrs, props['@attrs']);

    if (tree.children) locals['@children'] = tree.children;
    if (allAttrs.data) locals['@data'] = allAttrs.data
    if (attrs.tagName) component.tagName = attrs.tagName

    var frame = createFrame(component, locals);
    return resolveTree(frame, props, config);
  } else {
    console.log('component not found:', name);
  }
}