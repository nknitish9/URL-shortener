const { DatabaseSync } = require('node:sqlite');

const db = new DatabaseSync('shortener.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      original_url TEXT NOT NULL,
      short_code TEXT UNIQUE,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      clicks INTEGER DEFAULT 0
    )    
`);

module.exports = db;