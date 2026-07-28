const requestCounts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

function isAllowed(ip){
    const now = Date.now();
    const record = requestCounts.get(ip);

    if(!record || now - record.windowStart > WINDOW_MS){
        requestCounts.set(ip, { windowStart: now, count: 1 });
        return true;
    }

    if(record.count < MAX_REQUESTS){
        record.count++;
        return true;
    }

    return false;
}

module.exports = { isAllowed };