import assign from 'object-assign';
import resolveTree from './resolveTree';
export default function resolveFrame(tree, props, config) {
  var locals = assign({}, props, tree.locals);
  var res = resolveTree(tree.children, locals, config);

  return res && res.length === 1 ? res[0] : res;
}