import resolveTree from './resolveTree';

export default function resolveText(tree, props, config) {
  if (Array.isArray(tree.data)) {
    return resolveTree(tree.data, props, config).join('');
  } else {
    return tree.data;
  }
}
