import resolveTree from './resolveTree';
export default function renderText(tree, props, config) {
  if (Array.isArray(tree.data)) {
    return resolveTree(tree.data, props, config).join('');
  } else {
    return tree.data;
  }
}
