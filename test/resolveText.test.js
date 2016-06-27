const test = require('tape');
const config = require('./_config.js');
const copy = require('./_copy');
const { Var, Text } = require('./_types');

const resolveText = require('../dist/resolveText');

test('resolveText :: simple', function(t) {
  const tree = Text();
  const res = resolveText(tree, { title: 'hello world' });

  t.plan(1);
  t.equal(res, 'default');
});

test('resolveText :: array mixed', function(t) {
  const tree = Text({
    data: [
      Text({ data: 'name: ' }),
      Var({ path: 'title' })
    ]
  });
  const res = resolveText(tree, { title: 'hello world' });

  t.plan(1);
  t.equal(res, 'name: hello world');
});

test('resolveText :: array big', function(t) {
  const tree = Text({
    data: [
      Text({ data: 'names: ' }),
      Var({ path: 'name1' }),
      Text({ data: ' and ' }),
      Var({ path: 'name2' })
    ]
  });
  const res = resolveText(tree, { name1: 'Eddy', name2: 'Eddie' });

  t.plan(1);
  t.equal(res, 'names: Eddy and Eddie');
});
