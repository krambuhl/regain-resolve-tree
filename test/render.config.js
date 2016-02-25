const RogainConfig = require('rogain-config');
const createFrame = require('rogain-utils').createFrame;

module.exports = new RogainConfig({
  helpers: {
    Children: function(tree, props) {
      console.log('Children');
      if (props['@children']) {
        return props['@children'];
      }
    },

    Each: function(tree, props) {
      console.log('Each');
      if (Array.isArray(tree.data)) {
        return tree.data.map((data, index) => {
          var frameData = { 
            '@index': index,
            '@length': tree.data.length
          };

          frameData[tree.attrs.as || '@item'] = data;
          
          return createFrame(tree.children, frameData);
        });
      }
    },

    Defined: function(tree, props) {
      console.log('Defined');
      if (tree.data) {
        if (Array.isArray(tree.data)) {
          if (tree.data.length > 0) return split[0]
        } else if (typeof tree.data === 'object') {
          if (Object.keys(tree.data).length > 0) return split[0];
        } else {
          return split[0];
        }
      }
    }
  },

  components: {
    Test: require('./fixtures/out/Test.json'),
    TestBlock: require('./fixtures/out/TestBlock.json'),
    TestComponent: require('./fixtures/out/TestComponent.json'),
  }
});