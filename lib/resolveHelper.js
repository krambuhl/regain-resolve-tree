import { createFrame } from 'rogain-utils';

import resolveTree from './resolveTree';
import resolveAttributes from './resolveAttributes';

export default function resolveHelper(tree, props, config) {
  var helper = config.helpers.get(tree.name);

  if (helper) {
    var copy = Object.assign({}, tree);
    copy.attrs = resolveAttributes(copy.attrs, props, config);

    var locals = { '@attrs': Object.assign({}, props['@attrs'], copy.attrs) };
    if (copy.attrs.data) locals['@data'] = copy.attrs.data;

    var res = helper(copy, props);

    return createFrame(res, locals)
  } else {
    console.log('helper not found:', tree.name);
  }
}