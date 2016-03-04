import resolveTree from './resolveTree';
export default function resolveFrame(tree, props, config) {
  var locals = Object.assign({}, props, tree.locals);
  var res = resolveTree(tree.children, locals, config);

  console.log('')
  console.log('')
  console.log('')
  console.log(locals)

  return res && res.length === 1 ? res[0] : res;
}