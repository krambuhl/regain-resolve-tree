var config = require('./_config');
var test = require('tape');
var resolveComponentTree = require('../dist/resolveComponentTree');

const defComp = { type: 'component', name: 'Heading' };
const defText = { type: 'text', data: 'some-text' }
const defChild = { type: 'tag', name: 'section' }
const defVar = { type: 'variable', path: '@item' }
const defAttr = { type: 'attr', name: 'data', data: 'da-value' };

const Heading = Object.assign({}, defChild, {
  name: 'h3',
  attrs: [
    { type: 'attr', name: 'class', data: 'heading' },
    { type: 'attr', name: 'data-title', data: [
      Object.assign({}, defVar, { path: '@attrs.title' })
    ] }
  ],
  children: [
    { type: 'component', name: 'Children' }
  ]
});

// <h3 class="heading" data-title={@attrs.title}><Children /></h3>

// <Heading tagName="h2" class="small" data-pie="berry" title="Sweet!">
  // <section />
// </Heading>

test.skip('resolveComponentTree', function(t) {
  config.components.register('Heading', Heading);

  var tree = Object.assign({}, defComp, { 
    attrs: {
      tagName: 'h2',
      class: 'small',
      'data-pie': 'berry',
      title: 'Sweet!'
    },
    children: [ defChild ]
  });

  var res = resolveComponentTree(Heading, tree, { }, config);
  
  t.plan(1);

  t.equal(res.type, 'frame');
  // t.equal(res.children, 'h2');

  config.components.unregister('Heading');
});