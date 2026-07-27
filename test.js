const { encode, decode } = require('./base62');

const id = 125;
const code = encode(id);
console.log('encode: ', code);
console.log('decode', decode(code));