const test = require('tape');
const config = require('./_config.js');
const { Var, Text, Attr } = require('./_types');
const resolveAttribute = require('../dist/resolveAttribute');

// default="value"
test('resolveAttribute :: name/data strings', function(t) {
  const tree = Attr();
  const res = resolveAttribute(tree, { }, config);

  t.plan(3);
  t.equal(res.type, 'attr');
  t.equal(res.name, 'default');
  t.equal(res.data, 'value');
});

// {prefix}Title="value"
test('resolveAttribute :: name array', function(t) {
  const tree = Attr({
    name: [
      Var({ path: 'prefix' }),
      Text({ data: 'Title' })
    ]
  });
  const res = resolveAttribute(tree, { prefix: 'the' }, config);

  t.plan(3);
  t.equal(res.type, 'attr');
  t.equal(res.name, 'theTitle');
  t.equal(res.data, 'value');
});

test('resolveAttribute :: data array (name not data)', function(t) {
  const tree = Attr({
    data: [
      Var({ path: 'min' }),
      Text({ data: ' - ' }),
      Var({ path: 'max' })
    ]
  });
  const res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.plan(3);
  t.equal(res.type, 'attr');
  t.equal(res.name, 'default');
  t.equal(res.data, '10 - 90');
});


test('resolveAttribute :: data array (name is data)', function(t) {
  const tree = Attr({
    name: 'data',
    data: [
      Var({ path: 'set' })
    ]
  });
  const res = resolveAttribute(tree, { set: [1,2,3] }, config);

  t.plan(5);
  t.equal(res.type, 'attr');
  t.equal(res.name, 'data');
  t.equal(res.data[0], 1);
  t.equal(res.data[1], 2);
  t.equal(res.data[2], 3);
});
