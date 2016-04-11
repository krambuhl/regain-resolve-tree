var config = require('./_config');
var copy = require('./_copy');
var test = require('tape');
var resolveComponent = require('../dist/resolveComponent');

const Component = { type: 'component', name: 'Heading' };
const Tag = { type: 'tag', name: 'div' };
const Var = { type: 'variable', path: '@item' };
const Attr = { type: 'attr', name: 'data', data: 'da-value' };

const Heading = copy(Tag, {
  name: 'h3',
  attrs: [
    { type: 'attr', name: 'class', data: 'heading' },
    { type: 'attr', name: 'data-tag', data: [
      copy(Var, { path: '@attrs.tagName' })
    ] }
  ],
  children: [
    { type: 'component', name: 'Children' }
  ]
});

const Link = copy(Tag, {
  name: 'a',
  attrs: [
    { type: 'attr', name: 'href', data: [
      copy(Var, { path: '@attrs.href' })
    ] }
  ],
  children: [
    { type: 'component', name: 'Children' }
  ]
});


test('resolveComponent', function(t) {
  config.components.register('Heading', Heading);
  config.components.register('Link', Link);

  var tree = copy(Component, { 
    attrs: [
      copy(Attr, { name: 'tagName', data: 'h2' }),
      copy(Attr, { name: 'class', data: 'small' }),
      copy(Attr, { name: 'data-burger', data: 'cheese' })
    ],
    children: [
      copy(Tag, {
        children: [
          { type: 'variable', path: 'numbers.1' },
          { type: 'variable', path: '@attrs.data-burger' }
        ]
      }),
      copy(Tag, {
        children: [
          { type: 'variable', path: 'numbers.2' },
          { type: 'variable', path: '@attrs.tagName' }
        ]
      }),     
      copy(Component, {
        name: 'Each',
        attrs: [
          copy(Attr, { name: 'data', data: [
            copy(Var, { path: 'numbers' })
          ] })
        ],
        children: [
          copy(Tag, {
            children: [
              { type: 'variable', path: '@index' },
              { type: 'variable', path: '@item' }
            ]
          })
        ]
      })
    ]
  });

  var res = resolveComponent(tree, { numbers: [5, 10, 20], url: 'http://google.com' }, config);

  t.plan(26);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'h2');

  t.equal(res.attrs.class, 'heading small');
  t.equal(res.attrs['data-burger'], 'cheese');
  t.equal(res.attrs['data-tag'], 'h2');
  t.equal(res.attrs.tagName === undefined, true);

  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'div');
  t.equal(res.children[0].children[0], '10');
  t.equal(res.children[0].children[1], 'cheese');

  t.equal(res.children[1].type, 'tag');
  t.equal(res.children[1].name, 'div');
  t.equal(res.children[1].children[0], '20');
  t.equal(res.children[1].children[1], 'h2');

  t.equal(res.children[2][0].type, 'tag');
  t.equal(res.children[2][0].name, 'div');
  t.equal(res.children[2][0].children[0], '0');
  t.equal(res.children[2][0].children[1], '5');

  t.equal(res.children[2][1].type, 'tag');
  t.equal(res.children[2][1].name, 'div');
  t.equal(res.children[2][1].children[0], '1');
  t.equal(res.children[2][1].children[1], '10');

  t.equal(res.children[2][2].type, 'tag');
  t.equal(res.children[2][2].name, 'div');
  t.equal(res.children[2][2].children[0], '2');
  t.equal(res.children[2][2].children[1], '20');

  config.components.unregister('Heading');
  config.components.unregister('Link');
});
