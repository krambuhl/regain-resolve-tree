import assign from 'object-assign';

import resolveTag from './resolveTag';
import resolveAttribute from './resolveAttribute';
import resolveVariable from './resolveVariable';
import resolveText from './resolveText';
import resolveFrame from './resolveFrame';
import resolveComponent from './resolveComponent';

export default function resolveTree(tree, props, config) {
  if (!tree) return;

  if (Array.isArray(tree)) {
    return tree.map(child => resolveTree(child, props, config));
  }

  // create copy to be resolved this solved an issue
  // where context would be modified inside loops
  const copy = assign({}, tree);
  switch (copy.type) {
    case 'variable': return resolveVariable(copy, props, config);
    case 'text': return resolveText(copy, props, config); //
    case 'attr': return resolveAttribute(copy, props, config);
    case 'frame': return resolveFrame(copy, props, config); //
    case 'tag': return resolveTag(copy, props, config);
    case 'component': return resolveComponent(copy, props, config);
  }

  return {
    type: 'error',
    data: '"' + copy.type + '" type tree not supported.'
  };
}
