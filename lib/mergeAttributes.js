import assign from 'object-assign';

export default function mergeAttributes(a, b) {
  var attrs = assign({}, a);

  Object.keys(b).forEach(key => {
    var val = b[key]

    if (attrs.class && key === 'class') {
      val = [attrs.class, val].join(' '); 
    }

    if (key !== 'data') {
      attrs[key] = val;
    }
  });

  return attrs;
}