const Registry = require('rogain-registry');
const components = new Registry();

components.register(require('rogain-core-components'));
components.register({
  Test: require('./fixtures/Test.json'),
  TestBlock: require('./fixtures/TestBlock.json'),
  TestComponent: require('./fixtures/TestComponent.json')
});

module.exports = {
  components: components
};
