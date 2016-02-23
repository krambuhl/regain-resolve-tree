var start = +new Date();

const resolveTree = require('../dist');
const html = require('html').prettyPrint;

const config = require('./render.config.js');
const data = require('./data.json');

var output = resolveTree(config.components.get('Test'), data, config);

console.log( JSON.stringify(output) );
console.log(`-- runtime: ${ +new Date() - start }ms`)
