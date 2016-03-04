const Config = require('rogain-config');

var config = new Config();

config.registerComponent(require('rogain-core-helpers'));

config.registerComponent({
  Test: require('./fixtures/Test.json'),
  TestBlock: require('./fixtures/TestBlock.json'),
  TestComponent: require('./fixtures/TestComponent.json'),
});

module.exports = config;