import assign from 'object-assign';
import { createFrame } from 'rogain-utils';
import mergeAttributes from './mergeAttributes';

export default function resolveComponentHelper(helper, configTree, props) {
  // attached data attribute to tree
  if (configTree.attrs && configTree.attrs.data) {
    configTree.data = configTree.attrs.data;
  }

  // run helper with tree tree and current props
  // locals are not passed here, tree will contain data
  var res = helper(configTree, props);

  // create frame with helper result as context
  // and pass locals to next context
  return createFrame(res, { 
    '@attrs': assign(
      {}, 
      props['@attrs'], 
      configTree.attrs
    );
  });
}