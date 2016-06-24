const test = require('tape');
const copy = require('./_copy');
const { Var } = require('./_types');
const resolveVariable = require('../dist/resolveVariable');

test('resolveVariable :: simple', function(t) {
  const tree = copy(Var, { path: 'title' });
  const res = resolveVariable(tree, { title: 'hello world' });
  t.plan(1);
  t.equal(res, 'hello world');
});

test('resolveVariable :: deep', function(t) {
  const tree = copy(Var, { path: 'a.b.c' });
  const res = resolveVariable(tree, { a: { b: { c: 'ddd' } } });
  t.plan(1);
  t.equal(res, 'ddd');
});

test('resolveVariable :: complex', function(t) {
  const tree = copy(Var, { path: '@attrs.title' });
  const res = resolveVariable(tree, { '@attrs': { title: 'hello world' } });
  t.plan(1);
  t.equal(res, 'hello world');
});

test('resolveVariable :: array', function(t) {
  const tree = copy(Var, { path: 'numbers' });
  const res = resolveVariable(tree, { numbers: [1, 2, 3] });
  t.plan(3);
  t.equal(res[0], 1);
  t.equal(res[1], 2);
  t.equal(res[2], 3);
});

test('resolveVariable :: object', function(t) {
  const tree = copy(Var, { path: 'modules' });
  const res = resolveVariable(tree, { modules: { a: 'aaa', b: 'bbb' } });
  t.plan(2);
  t.equal(res.a, 'aaa');
  t.equal(res.b, 'bbb');
});
