const test = require('tape');
const copy = require('./_copy');
const { Frame, Var, Text } = require('./_types');
const resolveFrame = require('../dist/resolveFrame');

const BaseFrame = Frame({
  children: [
    Text({ data: 'hello ' }),
    Var({ path: 'title' })
  ]
});

test('resolveFrame :: no locals', function(t) {
  const res = resolveFrame(BaseFrame, { title: 'world' });

  t.plan(2);
  t.equal(res[0], 'hello ');
  t.equal(res[1], 'world');
});

test('resolveFrame :: overwrite locals', function(t) {
  const tree = copy(BaseFrame, { locals: { title: 'numbers' } });
  const res = resolveFrame(tree, { title: 'world' });

  t.plan(2);
  t.equal(res[0], 'hello ');
  t.equal(res[1], 'numbers');
});

test('resolveFrame :: unwrap single array', function(t) {
  let tree = copy(BaseFrame, { locals: { title: 'numbers' } });
  tree.children.shift();
  const res = resolveFrame(tree, { title: 'world' });

  t.plan(1);
  t.equal(res, 'numbers');
});
