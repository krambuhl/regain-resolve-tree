const copy = require('./_copy');

module.exports = {
  Tree: opts => copy({ type: 'tag', name: 'section' }, opts),
  Var: opts => copy({ type: 'variable', path: 'title' }, opts),
  Attr: opts => copy({ type: 'attr', name: 'default', data: 'value' }, opts),
  Component: opts => copy({ type: 'component', name: 'Heading' }, opts),
  Tag: opts => copy({ type: 'tag', name: 'div' }, opts),
  Text: opts => copy({ type: 'text', data: 'default' }, opts),
  Frame: opts => copy({ type: 'frame', children: [] }, opts)
};
