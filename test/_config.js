const Config = require('rogain-config');

module.exports = new Config({
  helpers: require('rogain-core-helpers'),
  components: {
    Test: require('./fixtures/out/Test.json'),
    TestBlock: require('./fixtures/out/TestBlock.json'),
    TestComponent: require('./fixtures/out/TestComponent.json'),
  }
});