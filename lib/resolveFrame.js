import assign from 'object-assign';
import resolveTree from './resolveTree';

export default function resolveFrame(tree, props, config) {
  const locals = assign({}, props, tree.locals);
  const res = resolveTree(tree.children, locals, config);
  return res && res.length === 1 ? res[0] : res;
}
