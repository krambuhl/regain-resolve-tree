const config = require('./_config');
const copy = require('./_copy');
const test = require('tape');
const resolveTree = require('../dist/resolveTree');

const Component = { type: 'component', name: 'Heading' };
const Text = { type: 'text', data: 'some-text' };
const Tag = { type: 'tag', name: 'section' };
const Var = { type: 'variable', path: '@item' };
const Attr = { type: 'attr', name: 'data', data: 'da-value' };

const red = { hex: 'f00', slug: 'red' };
const blue = { hex: '00f', slug: 'blue' };
const data = {
  data: 'data',
  tag: 'section',
  colors: [red, blue],
  scripts: {
    main: '/scripts/main.js'
  }
};

test('resolveTree', function(t, d) {
  const res = resolveTree(config.components.get('Test'), data, config);

  t.plan(43);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'div');
  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'section');
  t.equal(res.children[0].attribs.class, 'block');
  t.equal(res.children[0].attribs['data-hex'], '#f00');
  t.equal(res.children[0].children, 'red');
  t.equal(res.children[1].type, 'tag');
  t.equal(res.children[1].name, 'div');
  t.equal(res.children[1].attribs.id, 'colors');
  t.equal(res.children[1].attribs.class, 'component box');
  t.equal(res.children[1].children[0].type, 'tag');
  t.equal(res.children[1].children[0].name, 'div');
  t.equal(res.children[1].children[0].attribs.class, 'block');
  t.equal(res.children[1].children[0].attribs['data-hex'], '#00f');
  t.equal(res.children[1].children[0].children, 'blue');
  t.equal(res.children[1].children[1].type, 'tag');
  t.equal(res.children[1].children[1].name, 'a');
  t.equal(res.children[1].children[1].attribs.href, '/colors');
  t.equal(res.children[1].children[1].children, 'Read More');
  t.equal(res.children[2].length, 2);
  t.equal(res.children[2][0][0].type, 'tag');
  t.equal(res.children[2][0][0].name, 'div');
  t.equal(res.children[2][0][0].attribs.class, 'block');
  t.equal(res.children[2][0][0].attribs['data-hex'], '#f00');
  t.equal(res.children[2][0][0].children, 'red0');
  t.equal(res.children[2][0][1].type, 'tag');
  t.equal(res.children[2][0][1].name, 'a');
  t.equal(res.children[2][0][1].attribs.href, '/colors/red');
  t.equal(res.children[2][0][1].children, 'Read More');
  t.equal(res.children[2][1][0].type, 'tag');
  t.equal(res.children[2][1][0].name, 'div');
  t.equal(res.children[2][1][0].attribs.class, 'block');
  t.equal(res.children[2][1][0].attribs['data-hex'], '#00f');
  t.equal(res.children[2][1][0].children, 'blue1');
  t.equal(res.children[2][1][1].type, 'tag');
  t.equal(res.children[2][1][1].name, 'a');
  t.equal(res.children[2][1][1].attribs.href, '/colors/blue');
  t.equal(res.children[2][1][1].children, 'Read More');
  t.equal(res.children[3].type, 'tag');
  t.equal(res.children[3].name, 'script');
  t.equal(res.children[3].attribs.src, '/scripts/main.js');
  t.equal(res.children[3].children, 'function hello(str) { }');
});

// <Frame greeting="Hello"><span>{greeting}</span></Frame>
// <Greeting greeting="Howdy" />

test('resolveTree :: default framing', function(t, d) {
  config.components.register('Greeting', copy(Component, {
    name: 'Frame',
    attribs: [
      copy(Attr, { name: 'greeting', data: 'Hello' })
    ],
    children: [
      copy(Var, { path: '@attrs.greeting' }),
      copy(Tag, { name: 'span', children: [
        copy(Var, { path: '@attrs.greeting2' })
      ] })
    ]
  }));

  const testTree = copy(Component, {
    name: 'Greeting',
    attribs: [ copy(Attr, { name: 'greeting2', data: 'Howdy' }) ]
  });
  const res = resolveTree(testTree, data, config);

  t.plan(1);
  t.equal(true, true);

  config.components.unregister('Greeting')
});

// <span class="base">{greeting}</span>
// <Greeting class="second" />
// <Yeller class="third" />
// <Screamer class="fourth" />

test('resolveTree :: deep composing', function(t, d) {
  config.components.register('Greeting', copy(Tag, {
    name: 'span',
    attribs: [ copy(Attr, { name: 'class', data: 'base' }) ],
    children: [
      copy(Var, { path: '@attrs.greeting' }),
      copy(Text, { data: ', ' }),
      copy(Var, { path: '@attrs.greeting' })
    ]
  }));

  config.components.register('Yeller', copy(Component, {
    name: 'Greeting',
    attribs: [ copy(Attr, { name: 'class', data: 'second' }) ]
  }));

  config.components.register('Screamer', copy(Component, {
    name: 'Yeller',
    attribs: [ copy(Attr, { name: 'class', data: 'third' }) ]
  }));

  const testTree = copy(Component, {
    name: 'Screamer',
    attribs: [
      copy(Attr, { name: 'class', data: 'fourth' }),
      copy(Attr, { name: 'greeting', data: 'Howdy' })
    ]
  });
  const res = resolveTree(testTree, data, config);

  t.plan(7);
  t.equal(res.type, 'tag');
  t.equal(res.name, 'span');
  t.equal(res.attribs.class, 'base second third fourth');
  t.equal(res.attribs.greeting === undefined, true);
  t.equal(res.children[0], 'Howdy');
  t.equal(res.children[1], ', ');
  t.equal(res.children[2], 'Howdy');

  config.components.unregister('Greeting');
  config.components.unregister('Yeller');
  config.components.unregister('Screamer');
});
