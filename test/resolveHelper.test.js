var config = require('./_config');
var test = require('tape');
var resolveHelper = require('../dist/resolveHelper');

const defHelper = { type: 'helper', name: 'Each' };
const defText = { type: 'text', data: 'some-text' }
const defChild = { type: 'tag', name: 'div' }
const defVar = { type: 'variable', path: '@item' }
const defAttr = { type: 'attr', name: 'data', data: 'da-value' };

test('resolveHelper :: full shabang', function(t) {
  var tree = Object.assign({}, defHelper, { 
    attrs: [
      Object.assign({}, defAttr, {
        data: [{ type: 'variable', path: 'numbers' }]
      }),
      Object.assign({}, defAttr, {
        name: 'as',
        data: '@da-item'  
      })
    ],
    children: [
      Object.assign({}, defChild, {
        children: [
          { type: 'variable', path: '@da-item' },
          { type: 'variable', path: '@attrs.as' },
        ]
      })
    ]
  });

  var res = resolveHelper(tree, { 
    numbers: [1, 2, 3]
  }, config);

  t.plan(8);

  t.equal(res[0][0].type, 'tag');
  t.equal(res[0][0].name, 'div');
  t.equal(res[0][0].children[0], '1');
  t.equal(res[0][0].children[1], '@da-item');
  t.equal(res[1][0].children[0], '2');
  t.equal(res[1][0].children[1], '@da-item');
  t.equal(res[2][0].children[0], '3');
  t.equal(res[2][0].children[1], '@da-item');
});

test('resolveHelper :: not found', function(t) {
  var tree = Object.assign({}, defHelper, { name: 'BadMissingThing' });
  var res = resolveHelper(tree, { }, config);

  t.plan(2);
  t.equal(res.type, 'error')
  t.equal(res.data, '<BadMissingThing /> helper is not found.')
})