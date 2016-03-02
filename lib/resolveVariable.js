export default function resolveVariable(tree, props) {
  var obj = props;
  var path = tree.path;

  for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
    try { 
      obj = obj[path[i]];
    } catch(e) {}
  }

  return typeof obj === 'number' ? obj.toString() : obj;
}