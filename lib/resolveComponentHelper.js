import assign from 'object-assign';
import { createFrame } from 'rogain-utils';
import mergeAttributes from './mergeAttributes';

export default function resolveComponentHelper(helper, tree, props) {
  // create default local data to merge into props
  var locals = { 
    '@attrs': assign({}, props['@attrs'], tree.attrs, tree.componentAttrs)
  };

  // attached data attribute to tree
  if (tree.attrs && tree.attrs.data) {
    tree.data = tree.attrs.data;
  }

  // run helper with tree tree and current props
  // locals are not passed here, tree will contain data
  var res = helper(tree, props);

  // create frame with helper result as context
  // and pass locals to next context
  return createFrame(res, locals);
}