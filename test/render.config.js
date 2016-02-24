const RogainConfig = require('rogain-config');

var config = new RogainConfig();

config.helpers.register(require('rogain-core-helpers'));
config.helpers.register('Children', function(tree, props) {
  // console.log('children', tree);
  if (props['@children']) {
    return props['@children'];
  }
});

config.components.register({
  Test: require('./fixtures/out/Test.json'),
  TestBlock: require('./fixtures/out/TestBlock.json'),
  TestComponent: require('./fixtures/out/TestComponent.json'),
});

module.exports = config;