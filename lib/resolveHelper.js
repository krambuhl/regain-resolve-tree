import { createFrame, createDefaultLocals } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveHelper(tree, props, config) {
  var helper = config.helpers.get(tree.name);

  if (helper) {
    var attrs = resolveAttributes(tree.attrs, props, config);
    var copy = Object.assign({}, tree, { 
      data: attrs.data, 
      attrs: attrs
    });
    var locals = createDefaultLocals(copy, props);
    var frame = createFrame(helper(copy, props), locals);

    return resolveTree(frame, props, config)
  } else {
    console.log('helper not found:', tree.name);
  }
}