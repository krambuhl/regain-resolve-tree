var config = require('./_config.js');
var test = require('tape');

var resolveAttributes = require('../dist/resolveAttributes');

const defTree = {
  type: 'attr',
  name: 'data-value',
  data: 'value'
};

test('resolveAttributes(tree, props, config) :: single', function(t) {
  t.plan(1);

  var res = resolveAttributes([defTree], { min: 10, max: 90 }, config);

  t.equal(res['data-value'], 'value');
});

test('resolveAttributes(tree, props, config) :: multi', function(t) {
  t.plan(2);

  var tree = Object.assign({}, defTree, { name: 'data-redact' });
  var res = resolveAttributes([defTree, tree], { min: 10, max: 90 }, config);

  t.equal(res['data-value'], 'value');
  t.equal(res['data-redact'], 'value');
});

test('resolveAttributes(tree, props, config) :: complex', function(t) {
  t.plan(1);

  var tree = Object.assign({}, defTree, { 
    name: [
      { type: 'text', data: 'min-' },
      { type: 'variable', path: 'min' }
    ]
  });
  var res = resolveAttributes([tree], { min: 'dada' }, config);

  t.equal(res['min-dada'], 'value');
});