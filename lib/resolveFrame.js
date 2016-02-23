import resolveTree from './resolveTree';
export default function resolveFrame(tree, props, config) {
  var locals = Object.assign({}, props, tree.locals);
  return resolveTree(tree.children, locals, config);
}