var config = require('./_config');
var test = require('tape');
var resolveTree = require('../dist/resolveTree');
var resolveComponent = require('../dist/resolveComponent');


const defComp = { type: 'component', name: 'Heading' };
const defText = { type: 'text', data: 'some-text' }
const defChild = { type: 'tag', name: 'div' }
const defVar = { type: 'variable', path: '@item' }
const defAttr = { type: 'attr', name: 'data', data: 'da-value' };

function copy(type, bits) {
  return Object.assign({}, type, bits);
}

const Heading = copy(defChild, {
  name: 'h3',
  attrs: [
    { type: 'attr', name: 'class', data: 'heading' },
    { type: 'attr', name: 'data-tag', data: [
      copy(defVar, { path: '@attrs.tagName' })
    ] }
  ],
  children: [
    copy(defChild, {
      attrs: [
        copy(defAttr)
      ],
      children: [
        copy(defComp, { name: 'Children' })
      ]
    })
  ]
});

const Link = copy(defChild, {
  name: 'a',
  attrs: [
    { type: 'attr', name: 'href', data: [
      copy(defVar, { path: '@attrs.href' })
    ] }
  ],
  children: [
    { type: 'component', name: 'Children' }
  ]
});

test('resolveComponent', function(t) {
  config.components.register('Heading', Heading);
  config.components.register('Link', Link);

  var tree = copy(defComp, { 
    attrs: [
      copy(defAttr, { name: 'tagName', data: 'h2' }),
      copy(defAttr, { name: 'class', data: 'small' }),
      copy(defAttr, { name: 'data-burger', data: 'cheese' })
    ],
    children: [
      copy(defChild, {
        children: [
          { type: 'variable', path: 'numbers.1' },
          { type: 'variable', path: '@attrs.data-burger' }
        ]
      }),
      copy(defChild, {
        children: [
          { type: 'variable', path: 'numbers.2' },
          { type: 'variable', path: '@attrs.tagName' }
        ]
      }),     
      copy(defComp, {
        name: 'Each',
        attrs: [
          copy(defAttr, { name: 'data', data: [
            copy(defVar, { path: 'numbers' })
          ] })
        ],
        children: [
          copy(defChild, {
            children: [
              { type: 'variable', path: '@index' },
              { type: 'variable', path: '@item' }
            ]
          })
        ]
      }),
    ]
  });

  var res = resolveTree(tree, { numbers: [5, 10, 20], url: 'http://google.com' }, config);

  console.log(res)

  // t.plan(1); 
  // t.equal(true, true);
  t.plan(2);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'h2');

  // t.equal(res.attrs.class, 'heading small');
  // t.equal(res.attrs['data-burger'], 'cheese');
  // t.equal(res.attrs['data-tag'], 'h2');
  // t.equal(res.attrs.tagName === undefined, true);

  // t.equal(res.children[0].type, 'tag');
  // t.equal(res.children[0].name, 'div');
  // t.equal(res.children[0].children[0], '10');
  // t.equal(res.children[0].children[1], 'cheese');

  // t.equal(res.children[1].type, 'tag');
  // t.equal(res.children[1].name, 'div');
  // t.equal(res.children[1].children[0], '20');
  // t.equal(res.children[1].children[1], 'h2');

  // t.equal(res.children[2][0].type, 'tag');
  // t.equal(res.children[2][0].name, 'div');
  // t.equal(res.children[2][0].children[0], '0');
  // t.equal(res.children[2][0].children[1], '5');

  // t.equal(res.children[2][1].type, 'tag');
  // t.equal(res.children[2][1].name, 'div');
  // t.equal(res.children[2][1].children[0], '1');
  // t.equal(res.children[2][1].children[1], '10');

  // t.equal(res.children[2][2].type, 'tag');
  // t.equal(res.children[2][2].name, 'div');
  // t.equal(res.children[2][2].children[0], '2');
  // t.equal(res.children[2][2].children[1], '20');


  config.components.unregister('Heading');
  config.components.unregister('Link');
});
