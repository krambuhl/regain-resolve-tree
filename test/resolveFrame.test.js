var test = require('tape');
var resolveFrame = require('../dist/resolveFrame');

const defTree = {
  type: 'frame',
  children: [
    { type: 'text', data: 'hello ' },
    { type: 'variable', path: 'title' }
  ]
};

test('resolveFrame :: no locals', function(t) {
  t.plan(2);

  var res = resolveFrame(defTree, { title: 'world' });

  t.equal(res[0], 'hello ');
  t.equal(res[1], 'world');
});

test('resolveFrame :: overwrite locals', function(t) {
  t.plan(2);

  var tree = Object.assign({}, defTree, { locals: { title: 'numbers' } });
  var res = resolveFrame(tree, { title: 'world' });

  t.equal(res[0], 'hello ');
  t.equal(res[1], 'numbers');
});

test('resolveFrame :: unwrap single array', function(t) {
  t.plan(1);

  var tree = Object.assign({}, defTree, { locals: { title: 'numbers' } });
  tree.children.shift()
  var res = resolveFrame(tree, { title: 'world' });

  t.equal(res, 'numbers');
});

