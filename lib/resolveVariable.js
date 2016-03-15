import get from 'object-path-get';
export default function resolveVariable(tree, props) {
  var res = get(props, tree.path);
  return typeof res === 'number' ? res.toString() : res;
}