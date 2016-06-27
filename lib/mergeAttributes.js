import assign from 'object-assign';

// merges two attribs objects

export default function mergeAttributes(a, b) {
  let attrs = assign({}, a);

  // TODO: is it possible to return [].reduce?
  Object.keys(b).forEach(key => {
    let val = b[key];

    // To help with easy class composition
    // class is a merge not a replace
    // TODO: seperate into attribute command api
    if (attrs.class && key === 'class') {
      val = attrs.class + ' ' + val;
    }

    // TODO: explain why we skip 'data'
    if (key !== 'data') {
      attrs[key] = val;
    }
  });

  return attrs;
}
