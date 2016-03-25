const Config = require('rogain-config');

var config = new Config(require('rogain-core-bundle'));

config.components.register({
  Test: require('./fixtures/Test.json'),
  TestBlock: require('./fixtures/TestBlock.json'),
  TestComponent: require('./fixtures/TestComponent.json'),
});

module.exports = config;