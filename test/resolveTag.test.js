var config = require('./_config');
var copy = require('./_copy');
var test = require('tape');
var resolveTag = require('../dist/resolveTag');

const Tree = { type: 'tag', name: 'section' };
const Var = { type: 'variable', path: 'title' }
const Attr = { type: 'attr', name: 'data-key', data: 'da-value' };

test('resolveTag :: no attrs/children', function(t) {
  t.plan(2);

  var res = resolveTag(Tree, { }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
});

test('resolveTag :: simple attrs', function(t) {
  t.plan(4);

  var tree = copy(Tree, {
    name: 'div',
    attrs: [
      Attr,
      copy(Attr, { name: 'data-none', data: 'nope' })
    ]
  });

  var res = resolveTag(tree, { }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'div');
  
  t.equal(res.attrs['data-key'], 'da-value');
  t.equal(res.attrs['data-none'], 'nope');
});

test('resolveTag :: variable attrs', function(t) {
  t.plan(3);

  var tree = copy(Tree, {
    attrs: [
      copy(Attr, { 
        name: [copy(Var, { path: 'slug' })], 
        data: [Var] 
      })
    ]
  });

  var res = resolveTag(tree, { 
    slug: 'aaa',
    title: 'bbb'
  }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  
  t.equal(res.attrs['aaa'], 'bbb');
});

test('resolveTag :: children attr fall-through', function(t) {
  t.plan(4);

  var tree = copy(Tree, {
    attrs: [ Attr ],
    children: [
      copy(Var, { path: '@attrs.data-key' })
    ]
  });

  var res = resolveTag(tree, {  }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  
  t.equal(res.attrs['data-key'], 'da-value');
  t.equal(res.children, 'da-value');
});

test('resolveTag :: deep children attr fall-through', function(t) {
  t.plan(6);

  var tree = copy(Tree, {
    attrs: [ Attr ],
    children: [
      copy(Tree, {
        name: 'div',
        children: [
          copy(Var, { path: '@attrs.data-key' })
        ]
      })
    ]
  });

  var res = resolveTag(tree, {  }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  
  t.equal(res.attrs['data-key'], 'da-value');
  t.equal(res.children.type, 'tag');
  t.equal(res.children.name, 'div');
  t.equal(res.children.children, 'da-value');
});