var config = require('./_config.js');
var copy = require('./_copy');
var test = require('tape');

var resolveText = require('../dist/resolveText');

const Text = { type: 'text', data: 'default' };

test('resolveText :: simple', function(t) {
  t.plan(1);

  var tree = copy(Text);
  var res = resolveText(tree, { title: 'hello world' });

  t.equal(res, 'default');
});

test('resolveText :: array mixed', function(t) {
  t.plan(1);

  var tree = copy(Text, {
    data: [
      { type: 'text', data: 'name: ' },
      { type: 'variable', path: 'title' }
    ]
  });

  var res = resolveText(tree, { title: 'hello world' });

  t.equal(res, 'name: hello world');
});

test('resolveText :: array big', function(t) {
  t.plan(1);

  var tree = copy(Text, {
    data: [
      { type: 'text', data: 'names: ' },
      { type: 'variable', path: 'name1' },
      { type: 'text', data: ' and ' },
      { type: 'variable', path: 'name2' }
    ]
  });

  var res = resolveText(tree, { name1: 'Eddy', name2: 'Eddie' });

  t.equal(res, 'names: Eddy and Eddie');
});