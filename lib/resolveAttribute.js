import resolveTree from './resolveTree';
import resolveTreeToString from './resolveTreeToString';

export default function resolveAttribute(tree, props, config) {
  // resolve
  if (Array.isArray(tree.name)) {
    tree.name = resolveTree(tree.name, props, config).join('');
    // tree.name = resolveTreeToString(resolveTree(tree.name, props, config));
  }

  //
  if (Array.isArray(tree.data)) {
    tree.data = resolveTree(tree.data, props, config);
    // tree.data = resolveTreeToString(resolveTree(tree.data, props, config));

    if (Array.isArray(tree.data) && tree.data.length > 1) {
      tree.data = tree.data.join('');
    } else {
      tree.data = tree.data[0];
    }
  }

  return tree;
}
