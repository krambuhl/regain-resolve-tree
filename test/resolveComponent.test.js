const test = require('tape');
const config = require('./_config');
const { Component, Tag, Var, Attr } = require('./_types');
const resolveComponent = require('../dist/resolveComponent');

const Heading = Tag({
  name: 'h3',
  attribs: [
    Attr({
      name: 'class',
      data: 'heading'
    }),
    Attr({
      name: 'data-tag',
      data: [
        Var({ path: '@attrs.tagName' })
      ]
    })
  ],
  children: [
    Component({ name: 'Children' })
  ]
});

const Link = Tag({
  name: 'a',
  attribs: [
    Attr({
      name: 'href',
      data: [
        Var({ path: '@attrs.href' })
      ]
    })
  ],
  children: [
    Component({ name: 'Children' })
  ]
});


test('resolveComponent', function(t) {
  config.components.register('Heading', Heading);
  config.components.register('Link', Link);

  const tree = Component({
    attribs: [
      Attr({ name: 'tagName', data: 'h2' }),
      Attr({ name: 'class', data: 'small' }),
      Attr({ name: 'data-burger', data: 'cheese' })
    ],
    children: [
      Tag({
        children: [
          Var({ path: 'numbers.1' }),
          Var({ path: '@attrs.data-burger' })
        ]
      }),
      Tag({
        children: [
          Var({ path: 'numbers.2' }),
          Var({ path: '@attrs.tagName' })
        ]
      }),
      Component({
        name: 'Each',
        attribs: [
          Attr({
            name: 'data',
            data: [
              Var({ path: 'numbers' })
            ]
          })
        ],
        children: [
          Tag({
            children: [
              Var({ path: '@index' }),
              Var({ path: '@item' })
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
