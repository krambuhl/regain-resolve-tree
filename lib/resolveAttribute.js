import resolveTree from './resolveTree';

export default function resolveAttribute(tree, props, config) {
  if (Array.isArray(tree.name)) {
    tree.name = resolveTree(tree.name, props, config).join('');
  }

  if (Array.isArray(tree.data)) { 
    tree.data = resolveTree(tree.data, props, config);
    if (tree.name == 'data' || typeof tree.data === 'object') tree.data = tree.data[0];
    else tree.data = tree.data.join('');
  }

  return tree;
}