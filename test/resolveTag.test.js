const config = require('./_config');
const copy = require('./_copy');
const { Tree, Var, Attr } = require('./_types');
const test = require('tape');
const resolveTag = require('../dist/resolveTag');


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
  t.equal(res.attribs['default'], 'value');
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
      copy(Var, { path: '@attrs.default' })
    ]
  });
  const res = resolveTag(tree, {  }, config);

  t.plan(4);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  t.equal(res.attribs['default'], 'value');
  t.equal(res.children, 'value');
});

test('resolveTag :: deep children attr fall-through', function(t) {
  const tree = copy(Tree, {
    attribs: [ Attr ],
    children: [
      copy(Tree, {
        name: 'div',
        children: [
          copy(Var, { path: '@attrs.default' })
        ]
      })
    ]
  });
  const res = resolveTag(tree, {  }, config);

  t.plan(6);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'section');
  t.equal(res.attribs['default'], 'value');
  t.equal(res.children.type, 'tag');
  t.equal(res.children.name, 'div');
  t.equal(res.children.children, 'value');
});
