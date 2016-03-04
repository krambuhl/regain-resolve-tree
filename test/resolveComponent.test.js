var config = require('./_config');
var test = require('tape');
var resolveComponent = require('../dist/resolveComponent').default;


const defComp = { type: 'component', name: 'Heading' };
const defText = { type: 'text', data: 'some-text' }
const defChild = { type: 'tag', name: 'div' }
const defVar = { type: 'variable', path: '@item' }
const defAttr = { type: 'attr', name: 'data', data: 'da-value' };

config.components.register('Heading', Object.assign({}, defChild, {
  name: 'h3',
  attrs: [
    { type: 'attr', name: 'class', data: 'heading' }
  ],
  children: [
    { type: 'helper', name: 'Children' }
  ]
}))

test('resolveComponent :: full shabang', function(t) {
  var tree = Object.assign({}, defComp, { 
    attrs: [
      Object.assign({}, defAttr, { name: 'tagName', data: 'h2' }),
      Object.assign({}, defAttr, { name: 'class', data: 'small' }),
      Object.assign({}, defAttr, { name: 'data-burger', data: 'cheese' })
    ],
    children: [
      Object.assign({}, defChild, {
        children: [
          { type: 'variable', path: 'numbers.1' },
          { type: 'variable', path: '@attrs.data-burger' }
        ]
      }),
      Object.assign({}, defChild, {
        children: [
          { type: 'variable', path: 'numbers.2' },
          { type: 'variable', path: '@attrs.tagName' }
        ]
      })
    ]
  });

  var res = resolveComponent(tree, { 
    numbers: [1, 2, 3]
  }, config);

  t.plan(12);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'h2');

  t.equal(res.attrs.class, 'heading small');
  t.equal(res.attrs['data-burger'], 'cheese');

  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'div');
  t.equal(res.children[0].children[0], '2');
  t.equal(res.children[0].children[1], 'cheese');

  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'div');
  t.equal(res.children[1].children[0], '3');
  t.equal(res.children[1].children[1], 'h2');
});

test('resolveComponent :: not found', function(t) {
  var tree = Object.assign({}, defComp, { name: 'BadMissingThing' });
  var res = resolveComponent(tree, { }, config);

  t.plan(2);
  t.equal(res.type, 'error')
  t.equal(res.data, '<BadMissingThing /> component is not found.')
})