# URL Shortener

A simple Express.js-based URL shortener application.

## Features

- Create short URLs from long URLs
- Automatic redirection to original URLs

## Installation

```bash
npm install
```

## Usage

```bash
node index.js
```

Server runs at `http://localhost:3000`

## Usage

### Create Short URL

POST http://localhost:3000/shorten
Body: `{"url": "https://example.com"}`
Response: `{"original_url": "...", "short_code": "...", "short_url": "http://localhost:3000/..."}`

### Redirect

GET http://localhost:3000/{short_code}