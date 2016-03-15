var config = require('./_config');
var test = require('tape');
var resolveTree = require('../dist/resolveTree');

var red = { hex: 'f00', slug: 'red' };
var blue = { hex: '00f', slug: 'blue' };
var data = {
  data: 'data',
  tag: 'section',
  colors: [red, blue],
  scripts: {
    main: '/scripts/main.js'
  }
}

test('resolveTree', function(t, d) {
  var res = resolveTree(config.components.get('Test'), data, config);

  t.plan(43);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'div');
  t.equal(res.children[0].type, 'tag');
  t.equal(res.children[0].name, 'section');
  t.equal(res.children[0].attrs.class, 'block');
  t.equal(res.children[0].attrs['data-hex'], '#f00');
  t.equal(res.children[0].children, 'red');
  t.equal(res.children[1].type, 'tag');
  t.equal(res.children[1].name, 'div');
  t.equal(res.children[1].attrs.id, 'colors');
  t.equal(res.children[1].attrs.class, 'component box');
  t.equal(res.children[1].children[0].type, 'tag');
  t.equal(res.children[1].children[0].name, 'div');
  t.equal(res.children[1].children[0].attrs.class, 'block');
  t.equal(res.children[1].children[0].attrs['data-hex'], '#00f');
  t.equal(res.children[1].children[0].children, 'blue');
  t.equal(res.children[1].children[1].type, 'tag');
  t.equal(res.children[1].children[1].name, 'a');
  t.equal(res.children[1].children[1].attrs.href, '/colors');
  t.equal(res.children[1].children[1].children, 'Read More');
  t.equal(res.children[2].length, 2);
  t.equal(res.children[2][0][0].type, 'tag');
  t.equal(res.children[2][0][0].name, 'div');
  t.equal(res.children[2][0][0].attrs.class, 'block');
  t.equal(res.children[2][0][0].attrs['data-hex'], '#f00');
  t.equal(res.children[2][0][0].children, 'red0');
  t.equal(res.children[2][0][1].type, 'tag');
  t.equal(res.children[2][0][1].name, 'a');
  t.equal(res.children[2][0][1].attrs.href, '/colors/red');
  t.equal(res.children[2][0][1].children, 'Read More');
  t.equal(res.children[2][1][0].type, 'tag');
  t.equal(res.children[2][1][0].name, 'div');
  t.equal(res.children[2][1][0].attrs.class, 'block');
  t.equal(res.children[2][1][0].attrs['data-hex'], '#00f');
  t.equal(res.children[2][1][0].children, 'blue1');
  t.equal(res.children[2][1][1].type, 'tag');
  t.equal(res.children[2][1][1].name, 'a');
  t.equal(res.children[2][1][1].attrs.href, '/colors/blue');
  t.equal(res.children[2][1][1].children, 'Read More');
  t.equal(res.children[3].type, 'tag');
  t.equal(res.children[3].name, 'script');
  t.equal(res.children[3].attrs.src, '/scripts/main.js');
  t.equal(res.children[3].children, 'function hello(str) { }');
});

