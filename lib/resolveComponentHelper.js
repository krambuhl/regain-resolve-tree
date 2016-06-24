import assign from 'object-assign';
import { createFrame } from 'rogain-utils';
import mergeAttributes from './mergeAttributes';

export default function resolveComponentHelper(helper, tree, props) {
  // run helper with tree tree and current props
  // locals are not passed here, tree will contain data
  const res = helper(tree, props);

  // create frame with helper result as context
  // and pass locals to next context
  return createFrame(res, {
    '@attrs': assign({}, props['@attrs'], tree.attribs, tree.componentAttribs)
  });
}
