import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

let baseUrl;
let server;

const { default: app } = await import('../index.js');

before(() => {
  server = createServer(app);
  server.listen(0);
  const { port } = server.address();
  baseUrl = `http://localhost:${port}`;
});

after(() => {
  server.close();
});

describe('GET /', () => {
  it('should return 200 with welcome message', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    const text = await res.text();
    assert.match(text, /DevOps/i);
  });
});

describe('GET /health', () => {
  it('should return status ok', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.equal(json.status, 'ok');
    assert.ok(json.version);
  });
});

describe('GET /users', () => {
  it('should return an array of users', async () => {
    const res = await fetch(`${baseUrl}/users`);
    assert.equal(res.status, 200);
    const json = await res.json();
    assert.ok(Array.isArray(json));
    assert.ok(json.length > 0);
    assert.ok(json[0].name);
    assert.ok(json[0].email);
  });
});
