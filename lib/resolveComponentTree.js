import assign from 'object-assign';
import set from 'object-path-set';

import { createFrame, findPath } from 'rogain-utils';

export default function resolveComponentTree(component, configTree, props, config) {
  var locals = { };

  if (Object.keys(configTree.attrs).length > 0) {
    locals['@attrs'] = assign({}, 
      props['@attrs'], 
      configTree.attrs
    );
  }

  // create from with component as context
  // and pass locals into next context
  return createFrame(component, locals);
}
