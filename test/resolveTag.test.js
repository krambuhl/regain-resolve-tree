var config = require('./_config');
var test = require('tape');
var resolveTag = require('../dist/resolveTag');

const defTree = { type: 'tag', name: 'section' };
const defText = { type: 'text', data: 'some-text' }
const defChild = { type: 'tag', name: 'div' }
const defVar = { type: 'variable', path: 'title' }
const defAttr = { type: 'attr', name: 'data-key', data: 'da-value' };

test('resolveTag :: no attrs/children', function(t) {
  t.plan(2);

  var res = resolveTag(defTree, { }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
});

test('resolveTag :: simple attrs', function(t) {
  t.plan(4);

  var tree = Object.assign({}, defTree, {
    name: 'div',
    attrs: [
      defAttr,
      Object.assign({}, defAttr, { name: 'data-none', data: 'nope' })
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

  var tree = Object.assign({}, defTree, {
    attrs: [
      Object.assign({}, defAttr, { 
        name: [Object.assign({}, defVar, { path: 'slug' })], 
        data: [defVar] 
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

  var tree = Object.assign({}, defTree, {
    attrs: [ defAttr ],
    children: [
      Object.assign({}, defVar, { path: '@attrs.data-key' })
    ]
  });

  var res = resolveTag(tree, {  }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  
  t.equal(res.attrs['data-key'], 'da-value');
  t.equal(res.children[0], 'da-value');
});

test('resolveTag :: deep children attr fall-through', function(t) {
  t.plan(6);

  var tree = Object.assign({}, defTree, {
    attrs: [ defAttr ],
    children: [
      Object.assign({}, defTree, {
        name: 'div',
        children: [
          Object.assign({}, defVar, { path: '@attrs.data-key' })
        ]
      })
    ]
  });

  var res = resolveTag(tree, {  }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  
  t.equal(res.attrs['data-key'], 'da-value');
  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'div');
  t.equal(res.children[0].children[0], 'da-value');
});