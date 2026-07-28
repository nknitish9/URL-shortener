const express = require('express');
const db = require('./db');
const { encode } = require('./base62');
const cache = require('./cache');
const { isAllowed } = require('./rateLimiter');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('URL Shortner is alive!');
});

app.post('/shorten', (req, res) => {
    const ip = req.ip;
    
    if(!isAllowed(ip)){
        return res.status(429).json({ error: 'Too many requests. Please try again later.'});
    }
    
    const { url } = req.body;

    if(!url) {
        return res.status(400).json({ error: 'url is required' });
    }

    const insert = db.prepare('INSERT INTO urls (original_url) VALUES (?)');
    const result = insert.run(url);

    const id = result.lastInsertRowid;
    const shortCode = encode(id);

    const update = db.prepare('UPDATE urls SET short_code = ? WHERE id = ?');
    update.run(shortCode, id);

    res.json({
        original_url: url,
        short_code: shortCode,
        short_url: `http://localhost:${PORT}/${shortCode}`
    });
});

app.get('/:code', (req, res) => {
    const { code } = req.params;

    const cachedUrl = cache.get(code);
    if(cachedUrl) {
        console.log('Cache HIT for', code);
        return res.redirect(cachedUrl);
    }

    console.log('Cache MISS for', code);
    const row = db.prepare('SELECT * FROM urls WHERE short_code = ?').get(code);

    if(!row) {
        return res.status(404).json({ error: 'Short URL not found' });
    }

    db.prepare('UPDATE urls SET clicks = clicks + 1 WHERE id=?').run(row.id);

    cache.set(code, row.original_url);

    res.redirect(row.original_url);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});