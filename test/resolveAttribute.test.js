var config = require('./_config.js');
var test = require('tape');

var resolveAttribute = require('../dist/resolveAttribute');

const defTree = {
  type: 'attr',
  name: 'default',
  data: 'value'
};

test('resolveAttribute :: name/data strings', function(t) {
  t.plan(3);

  var tree = Object.assign({}, defTree);
  var res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.equal(res.type, 'attr');
  t.equal(res.name, 'default');
  t.equal(res.data, 'value');
});

test('resolveAttribute :: name array', function(t) {
  t.plan(1);

  var tree = Object.assign({}, defTree, { name: [
    { type: 'variable', path: 'min' },
    { type: 'text', data: ' - ' },
    { type: 'variable', path: 'max' },
  ]});
  
  var res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.equal(res.name, '10 - 90');
});

test('resolveAttribute :: data array (name not data)', function(t) {
  t.plan(1);

  var tree = Object.assign({}, defTree, { data: [
    { type: 'variable', path: 'min' },
    { type: 'text', data: ' - ' },
    { type: 'variable', path: 'max' },
  ]});
  
  var res = resolveAttribute(tree, { min: 10, max: 90 }, config);

  t.equal(res.data, '10 - 90');
});


test('resolveAttribute :: data array (name is data)', function(t) {
  t.plan(3);

  var tree = Object.assign({}, defTree, { 
    name: 'data',
    data: [{ type: 'variable', path: 'set' }]
  });
  
  var res = resolveAttribute(tree, { set: [1,2,3] }, config);

  console.log('res', res)

  t.equal(res.data[0], 1);
  t.equal(res.data[1], 2);
  t.equal(res.data[2], 3);
});