import resolveTree from './resolveTree';

export default function resolveAttribute(tree, props, config) {
  if (Array.isArray(tree.name)) {
    tree.name = resolveTree(tree.name, props, config).join('');
  }

  if (Array.isArray(tree.data)) { 
    tree.data = resolveTree(tree.data, props, config);

    if (Array.isArray(tree.data) && tree.data.length > 1) {
      tree.data = tree.data.join('');
    } else {
      tree.data = tree.data[0];
    }
  }

  return tree;
}