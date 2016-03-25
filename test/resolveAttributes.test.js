var config = require('./_config.js');
var copy = require('./_copy');
var test = require('tape');

var resolveAttributes = require('../dist/resolveAttributes');

const Attr = { type: 'attr', name: 'data-value', data: 'value' };

test('resolveAttributes :: single', function(t) {
  t.plan(2);

  var res = resolveAttributes([Attr], { min: 10, max: 90 }, config);

  t.equal(Object.keys(res).length, 1);
  t.equal(res['data-value'], 'value');
});

test('resolveAttributes :: multi', function(t) {
  t.plan(3);

  var tree = copy(Attr, { name: 'data-redact' });
  var res = resolveAttributes([Attr, tree], { min: 10, max: 90 }, config);

  t.equal(Object.keys(res).length, 2);
  t.equal(res['data-value'], 'value');
  t.equal(res['data-redact'], 'value');
});

test('resolveAttributes :: complex', function(t) {
  t.plan(1);

  var tree = copy(Attr, { 
    name: [
      { type: 'text', data: 'min-' },
      { type: 'variable', path: 'min' }
    ]
  });
  var res = resolveAttributes([tree], { min: 'dada' }, config);

  t.equal(res['min-dada'], 'value');
});