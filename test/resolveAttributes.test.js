const config = require('./_config.js');
const copy = require('./_copy');
const test = require('tape');

const resolveAttributes = require('../dist/resolveAttributes');

const Attr = { type: 'attr', name: 'data-value', data: 'value' };

test('resolveAttributes :: single', function(t) {
  const res = resolveAttributes([Attr], { min: 10, max: 90 }, config);

  t.plan(2);
  t.equal(Object.keys(res).length, 1);
  t.equal(res['data-value'], 'value');
});

test('resolveAttributes :: multi', function(t) {
  const tree = copy(Attr, { name: 'data-redact' });
  const res = resolveAttributes([Attr, tree], { min: 10, max: 90 }, config);

  t.plan(3);
  t.equal(Object.keys(res).length, 2);
  t.equal(res['data-value'], 'value');
  t.equal(res['data-redact'], 'value');
});

test('resolveAttributes :: complex', function(t) {
  const tree = copy(Attr, {
    name: [
      { type: 'text', data: 'min-' },
      { type: 'variable', path: 'min' }
    ]
  });
  const res = resolveAttributes([tree], { min: 'dada' }, config);

  t.plan(1);
  t.equal(res['min-dada'], 'value');
});
