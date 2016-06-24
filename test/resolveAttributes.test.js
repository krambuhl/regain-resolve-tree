const test = require('tape');
const config = require('./_config.js');
const { Var, Text, Attr } = require('./_types');

const resolveAttributes = require('../dist/resolveAttributes');

test('resolveAttributes :: single', function(t) {
  const res = resolveAttributes([Attr()], { min: 10, max: 90 }, config);

  t.plan(2);
  t.equal(Object.keys(res).length, 1);
  t.equal(res['default'], 'value');
});

test('resolveAttributes :: multi', function(t) {
  const tree = Attr({ name: 'data-redact' });
  const res = resolveAttributes([Attr(), tree], { min: 10, max: 90 }, config);

  t.plan(3);
  t.equal(Object.keys(res).length, 2);
  t.equal(res['default'], 'value');
  t.equal(res['data-redact'], 'value');
});

test('resolveAttributes :: complex', function(t) {
  const tree = Attr({
    name: [
      Text({ data: 'min-' }),
      Var({ path: 'min' })
    ]
  });
  const res = resolveAttributes([tree], { min: 'dada' }, config);

  t.plan(1);
  t.equal(res['min-dada'], 'value');
});
