const cache = new Map();
const MAX_SIZE = 100;

function get(key) {
    return cache.get(key);
}

function set(key, value){
    if(cache.size >= MAX_SIZE && !cache.has(key)) {
        const oldestKey = cache.keys().next().value;
        cache.delete(oldestKey);
    }
    cache.set(key, value);
}

module.exports = { get, set };