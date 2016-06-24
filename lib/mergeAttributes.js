import assign from 'object-assign';

export default function mergeAttributes(a, b) {
  let attrs = assign({}, a);

  Object.keys(b).forEach(key => {
    let val = b[key];

    if (attrs.class && key === 'class') {
      val = attrs.class + ' ' + val;
    }

    if (key !== 'data') {
      attrs[key] = val;
    }
  });

  return attrs;
}
