var test = require('tape');
var resolveVariable = require('../dist/resolveVariable');

const defTree = {
  type: 'variable'
};

test('resolveVariable(tree, props) :: simple', function(t) {
  t.plan(1);
  var tree = Object.assign({}, defTree, { path: 'title' });
  var res = resolveVariable(tree, { title: 'hello world' });
  t.equal(res, 'hello world');
});

test('resolveVariable(tree, props) :: deep', function(t) {
  t.plan(1);
  var tree = Object.assign({}, defTree, { path: 'a.b.c' });
  var res = resolveVariable(tree, { a: { b: { c: 'ddd' } } });
  t.equal(res, 'ddd');
});

test('resolveVariable(tree, props) :: complex', function(t) {
  t.plan(1);
  var tree = Object.assign({}, defTree, { path: '@attrs.title' });
  var res = resolveVariable(tree, { '@attrs': { title: 'hello world' } });
  t.equal(res, 'hello world');
});

test('resolveVariable(tree, props) :: array', function(t) {
  t.plan(3);
  var tree = Object.assign({}, defTree, { path: 'numbers' });
  var res = resolveVariable(tree, { numbers: [1, 2, 3] });
  t.equal(res[0], 1);
  t.equal(res[1], 2);
  t.equal(res[2], 3);
});

test('resolveVariable(tree, props) :: object', function(t) {
  t.plan(2);
  var tree = Object.assign({}, defTree, { path: 'modules' });
  var res = resolveVariable(tree, { modules: { a: 'aaa', b: 'bbb' } });
  t.equal(res.a, 'aaa');
  t.equal(res.b, 'bbb');
});