import resolveTree from './resolveTree';

export default function resolveAttribute(tree, props, config) {
  if (Array.isArray(tree.name)) {
    tree.name = resolveTree(tree.name, props, config).join('');
  }

  if (Array.isArray(tree.data)) { 
    tree.data = resolveTree(tree.data, props, config).join('');
  }

  return tree;
}