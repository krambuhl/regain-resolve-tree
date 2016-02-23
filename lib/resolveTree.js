import resolveTag from './resolveTag';
import resolveAttributes from './resolveAttributes';
import resolveAttribute from './resolveAttribute';
import resolveVariable from './resolveVariable';
import resolveText from './resolveText';
import resolveFrame from './resolveFrame';
import resolveHelper from './resolveHelper';
import resolveComponent from './resolveComponent';

export default function resolveTree(tree, props, config) {
  if (!tree) return;

  if (Array.isArray(tree)) {
    return tree.map(child => resolveTree(child, props, config))
  }

  switch (tree.type) {
    case 'tag': return resolveTag(tree, props, config);
    case 'attr': return resolveAttribute(tree, props, config);
    case 'variable': return resolveVariable(tree, props, config);
    // case 'filter': return resolveVariable(tree, props, config);
    case 'text': return resolveText(tree, props, config); // 
    case 'frame': return resolveFrame(tree, props, config); //
    case 'helper': return resolveHelper(tree, props, config);
    case 'component': return resolveComponent(tree, props, config);
    // case 'script': return resolveTag(tree, props, config);
  }
}