import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveHelper(tree, props, config) {
  // find helper in configuration
  var helper = config.helpers.get(tree.name);

  // if helper isn't found return an error node
  if (!helper) return {
    type: 'error',
    data: '<' + tree.name + ' /> helper is not found.'
  };

  // copy tree to be modified by helper
  var copy = Object.assign({}, tree);

  // resolve attributes when defined
  if (copy.attrs) {
    copy.attrs = resolveAttributes(copy.attrs, props, config);
  }

  // create default local data to merge into props
  var locals = { 
    '@attrs': Object.assign({}, props['@attrs'], copy.attrs)
  };
  
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
  var frame = createFrame(res, locals);

  // resolve frame into tag/html
  return resolveTree(frame, props, config);
}