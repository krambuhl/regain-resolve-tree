var config = require('./_config');
var test = require('tape');
var resolveTree = require('../dist/resolveTree');


test('resolveTree', function(t) {
  t.plan(2);

  var res = resolveTree(config.components.get('Test'), {
    data: 'data',
    tag: 'section',
    colors: [
      { hex: 'f00', slug: 'red' },
      { hex: '00f', slug: 'blue' }
    ],
    scripts: {
      main: '/scripts/main.js'
    }
  }, config);

  t.equal(res.type, 'tag');
  t.equal(res.name, 'div');

  console.log(JSON.stringify(res, null, 2))
});
