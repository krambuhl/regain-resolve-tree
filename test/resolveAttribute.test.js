const config = require('./_config.js');
const copy = require('./_copy');
const { Attr } = require('./_types');
const test = require('tape');

const resolveAttribute = require('../dist/resolveAttribute');

test('resolveAttribute :: name/data strings', function(t) {
  const tree = copy(Attr, {});
  const res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.plan(3);
  t.equal(res.type, 'attr');
  t.equal(res.name, 'default');
  t.equal(res.data, 'value');
});

test('resolveAttribute :: name array', function(t) {
  const tree = copy(Attr, {
    name: [
      { type: 'variable', path: 'min' },
      { type: 'text', data: ' - ' },
      { type: 'variable', path: 'max' },
    ]
  });
  const res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.plan(1);
  t.equal(res.name, '10 - 90');
});

test('resolveAttribute :: data array (name not data)', function(t) {
  const tree = copy(Attr, {
    data: [
      { type: 'variable', path: 'min' },
      { type: 'text', data: ' - ' },
      { type: 'variable', path: 'max' },
    ]
  });
  const res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.plan(1);
  t.equal(res.data, '10 - 90');
});


test('resolveAttribute :: data array (name is data)', function(t) {
  const tree = copy(Attr, {
    name: 'data',
    data: [{ type: 'variable', path: 'set' }]
  });
  const res = resolveAttribute(tree, { set: [1,2,3] }, config);

  t.plan(3);
  t.equal(res.data[0], 1);
  t.equal(res.data[1], 2);
  t.equal(res.data[2], 3);
});
