import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveComponent(tree, props, config) {
  var name = tree.name;
  if (Array.isArray(name)) {
    name = resolveTree(name, props, config).join('');
  }
  
  var comp = Object.assign({}, config.components.get(name));

  if (comp) {
    var copy = Object.assign({}, tree);
    copy.attrs = resolveAttributes(tree.attrs, props, config);

    console.log(name, copy.attrs, '-', comp.attrs)

    var locals = { '@attrs': Object.assign({}, props['@attrs'], copy.attrs) };
    if (copy.attrs.data) locals['@data'] = copy.attrs.data;



    if (copy.children) {
      locals['@children'] = copy.children;
      // frame.children = copy.children;
    }

    // console.log(locals);
    
    var frame = createFrame(comp, locals);

    // console.log('-----', frame.type, frame)
    return resolveTree(frame, props, config);
  } else {
    console.log('component not found:', name);
  }
}