const config = require('./_config');
const copy = require('./_copy');
const test = require('tape');
const resolveTag = require('../dist/resolveTag');

const Tree = { type: 'tag', name: 'section' };
const Var = { type: 'variable', path: 'title' }
const Attr = { type: 'attr', name: 'data-key', data: 'da-value' };

test('resolveTag :: no attrs/children', function(t) {
  const res = resolveTag(Tree, { }, config);

  t.plan(2);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
});

test('resolveTag :: simple attrs', function(t) {
  const tree = copy(Tree, {
    name: 'div',
    attribs: [
      Attr,
      copy(Attr, { name: 'data-none', data: 'nope' })
    ]
  });
  const res = resolveTag(tree, { }, config);

  t.plan(4);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'div');
  t.equal(res.attribs['data-key'], 'da-value');
  t.equal(res.attribs['data-none'], 'nope');
});

test('resolveTag :: variable attrs', function(t) {
  const tree = copy(Tree, {
    attribs: [
      copy(Attr, {
        name: [copy(Var, { path: 'slug' })],
        data: [Var]
      })
    ]
  });
  const res = resolveTag(tree, {
    slug: 'aaa',
    title: 'bbb'
  }, config);

  t.plan(3);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  t.equal(res.attribs.aaa, 'bbb');
});

test('resolveTag :: children attr fall-through', function(t) {
  const tree = copy(Tree, {
    attribs: [ Attr ],
    children: [
      copy(Var, { path: '@attrs.data-key' })
    ]
  });
  const res = resolveTag(tree, {  }, config);

  t.plan(4);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  t.equal(res.attribs['data-key'], 'da-value');
  t.equal(res.children, 'da-value');
});

test('resolveTag :: deep children attr fall-through', function(t) {
  const tree = copy(Tree, {
    attribs: [ Attr ],
    children: [
      copy(Tree, {
        name: 'div',
        children: [
          copy(Var, { path: '@attrs.data-key' })
        ]
      })
    ]
  });
  const res = resolveTag(tree, {  }, config);

  t.plan(6);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  t.equal(res.attribs['data-key'], 'da-value');
  t.equal(res.children.type, 'tag');
  t.equal(res.children.name, 'div');
  t.equal(res.children.children, 'da-value');
});
