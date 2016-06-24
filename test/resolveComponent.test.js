const config = require('./_config');
const copy = require('./_copy');
const test = require('tape');
const { Component, Tag, Var, Attr } = require('./_types');
const resolveComponent = require('../dist/resolveComponent');

const Heading = copy(Tag, {
  name: 'h3',
  attribs: [
    copy(Attr, {
      name: 'class',
      data: 'heading'
    }),
    copy(Attr, {
      name: 'data-tag',
      data: [
        copy(Var, { path: '@attrs.tagName' })
      ]
    })
  ],
  children: [
    copy(Component, { name: 'Children' })
  ]
});

const Link = copy(Tag, {
  name: 'a',
  attribs: [
    copy(Attr, {
      name: 'href',
      data: [
        copy(Var, { path: '@attrs.href' })
      ]
    })
  ],
  children: [
    copy(Component, { name: 'Children' })
  ]
});


test('resolveComponent', function(t) {
  config.components.register('Heading', Heading);
  config.components.register('Link', Link);

  const tree = copy(Component, {
    attribs: [
      copy(Attr, { name: 'tagName', data: 'h2' }),
      copy(Attr, { name: 'class', data: 'small' }),
      copy(Attr, { name: 'data-burger', data: 'cheese' })
    ],
    children: [
      copy(Tag, {
        children: [
          copy(Var, { path: 'numbers.1' }),
          copy(Var, { path: '@attrs.data-burger' })
        ]
      }),
      copy(Tag, {
        children: [
          copy(Var, { path: 'numbers.2' }),
          copy(Var, { path: '@attrs.tagName' })
        ]
      }),
      copy(Component, {
        name: 'Each',
        attribs: [
          copy(Attr, {
            name: 'data',
            data: [
              copy(Var, { path: 'numbers' })
            ]
          })
        ],
        children: [
          copy(Tag, {
            children: [
              copy(Var, { path: '@index' }),
              copy(Var, { path: '@item' })
            ]
          })
        ]
      })
    ]
  });

  const data = {
    numbers: [5, 10, 20],
    url: 'http://google.com'
  };

  const res = resolveComponent(tree, data, config);

  t.plan(26);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'h2');

  t.equal(res.attribs.class, 'heading small');
  t.equal(res.attribs['data-burger'], 'cheese');
  t.equal(res.attribs['data-tag'], 'h2');
  t.equal(res.attribs.tagName === undefined, true);

  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'div');
  t.equal(res.children[0].children[0], '10');
  t.equal(res.children[0].children[1], 'cheese');

  t.equal(res.children[1].type, 'tag');
  t.equal(res.children[1].name, 'div');
  t.equal(res.children[1].children[0], '20');
  t.equal(res.children[1].children[1], 'h2');

  t.equal(res.children[2][0].type, 'tag');
  t.equal(res.children[2][0].name, 'div');
  t.equal(res.children[2][0].children[0], '0');
  t.equal(res.children[2][0].children[1], '5');

  t.equal(res.children[2][1].type, 'tag');
  t.equal(res.children[2][1].name, 'div');
  t.equal(res.children[2][1].children[0], '1');
  t.equal(res.children[2][1].children[1], '10');

  t.equal(res.children[2][2].type, 'tag');
  t.equal(res.children[2][2].name, 'div');
  t.equal(res.children[2][2].children[0], '2');
  t.equal(res.children[2][2].children[1], '20');

  config.components.unregister('Heading');
  config.components.unregister('Link');
});
