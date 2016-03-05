var config = require('./_config.js');
var test = require('tape');

var resolveAttributes = require('../dist/resolveAttributes');

const defTree = {
  type: 'attr',
  name: 'data-value',
  data: 'value'
};

test('resolveAttributes :: single', function(t) {
  t.plan(2);

  var res = resolveAttributes([defTree], { min: 10, max: 90 }, config);

  t.equal(Object.keys(res).length, 1);
  t.equal(res['data-value'], 'value');
});

test('resolveAttributes :: multi', function(t) {
  t.plan(3);

  var tree = Object.assign({}, defTree, { name: 'data-redact' });
  var res = resolveAttributes([defTree, tree], { min: 10, max: 90 }, config);

  t.equal(Object.keys(res).length, 2);
  t.equal(res['data-value'], 'value');
  t.equal(res['data-redact'], 'value');
});

test('resolveAttributes :: complex', function(t) {
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