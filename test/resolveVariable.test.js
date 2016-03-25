var test = require('tape');
var copy = require('./_copy');
var resolveVariable = require('../dist/resolveVariable');

const Var = { type: 'variable' };

test('resolveVariable :: simple', function(t) {
  t.plan(1);
  var tree = copy(Var, { path: 'title' });
  var res = resolveVariable(tree, { title: 'hello world' });
  t.equal(res, 'hello world');
});

test('resolveVariable :: deep', function(t) {
  t.plan(1);
  var tree = copy(Var, { path: 'a.b.c' });
  var res = resolveVariable(tree, { a: { b: { c: 'ddd' } } });
  t.equal(res, 'ddd');
});

test('resolveVariable :: complex', function(t) {
  t.plan(1);
  var tree = copy(Var, { path: '@attrs.title' });
  var res = resolveVariable(tree, { '@attrs': { title: 'hello world' } });
  t.equal(res, 'hello world');
});

test('resolveVariable :: array', function(t) {
  t.plan(3);
  var tree = copy(Var, { path: 'numbers' });
  var res = resolveVariable(tree, { numbers: [1, 2, 3] });
  t.equal(res[0], 1);
  t.equal(res[1], 2);
  t.equal(res[2], 3);
});

test('resolveVariable :: object', function(t) {
  t.plan(2);
  var tree = copy(Var, { path: 'modules' });
  var res = resolveVariable(tree, { modules: { a: 'aaa', b: 'bbb' } });
  t.equal(res.a, 'aaa');
  t.equal(res.b, 'bbb');
});