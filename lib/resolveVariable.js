// #!
export default function resolveVariable(tree, props, config) {
  var obj = props;
  var path = tree.path;

  for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
    try {
      obj = obj[path[i]];
    } catch(e) {
      console.log(e)
    }
  }

  if (obj === undefined) return;

  if (Array.isArray(obj) || typeof obj === 'object') {
    return obj;
  }

  if (tree.filters) {
  }

  return obj.toString();
}