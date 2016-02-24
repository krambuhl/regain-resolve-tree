var start = +new Date();

const resolveTree = require('../dist');
const html = require('html').prettyPrint;

const config = require('./render.config.js');
const data = require('./data.json');

var output = resolveTree(config.components.get('Test'), data, config);

console.log( JSON.stringify(output, null, 2) );
console.log(`-- runtime: ${ +new Date() - start }ms`)


    // var attrs = resolveAttributes(tree.attrs, props, config)
    // locals['@data'] = Object.assign({}, locals['@data'], attrs.data);
      
    // var component = Object.assign({}, comp);
    // var compData = Object.assign({}, props, locals);
    // var cattrs = resolveAttributes(component.attrs, compData, config);
    
    // var allAttrs = Object.assign({}, attrs, cattrs);
    // var className = [];

    // if (cattrs.class) className.push(cattrs.class);
    // if (attrs.class) className.push(attrs.class);

    // allAttrs.class = component.className = className.join(' ');
    // allAttrs.classList = component.classList = component.className.split(' ');

    // component.attrMap = { };

    // for (var attr in allAttrs) {
    //   if (attr.indexOf('aria-') === 0 || attr.indexOf('data-') === 0 || attr === 'id' || attr === 'rel') {
    //     component.attrMap[attr] = allAttrs[attr];
    //   }
    // }

    // locals['@attrs'] = Object.assign({}, allAttrs, props['@attrs']);

    // if (tree.children) locals['@children'] = tree.children;
    // // if (allAttrs.data) {
    // //   // console.log('comp', name, allAttrs.data[0]);
    // //   // locals['@data'] = allAttrs.data[0];
    // //   console.log(name, locals['@data'])
    // // }
    // if (attrs.tagName) component.tagName = attrs.tagName
