const test = require('tape');
const copy = require('./_copy');
const resolveFrame = require('../dist/resolveFrame');

const Frame = {
  type: 'frame',
  children: [
    { type: 'text', data: 'hello ' },
    { type: 'variable', path: 'title' }
  ]
};

test('resolveFrame :: no locals', function(t) {
  const res = resolveFrame(Frame, { title: 'world' });

  t.plan(2);
  t.equal(res[0], 'hello ');
  t.equal(res[1], 'world');
});

test('resolveFrame :: overwrite locals', function(t) {
  const tree = copy(Frame, { locals: { title: 'numbers' } });
  const res = resolveFrame(tree, { title: 'world' });

  t.plan(2);
  t.equal(res[0], 'hello ');
  t.equal(res[1], 'numbers');
});

test('resolveFrame :: unwrap single array', function(t) {
  let tree = copy(Frame, { locals: { title: 'numbers' } });
  tree.children.shift();
  const res = resolveFrame(tree, { title: 'world' });

  t.plan(1);
  t.equal(res, 'numbers');
});
