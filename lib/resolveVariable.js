import getPath from 'object-path-get';
export default function resolveVariable(tree, props) {
  const res = getPath(props, tree.path);
  return typeof res === 'number' ? res.toString() : res;
}
