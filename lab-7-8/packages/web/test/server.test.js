import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { get } from 'node:http';
import { createWebServer } from '../server.js';

let server;
let port;
before(async () => {
  server = createWebServer().listen(0, '127.0.0.1');
  await once(server, 'listening');
  port = server.address().port;
});
after(() => new Promise((resolve) => server.close(resolve)));

test('serves the app and its named ESM entrypoint with correct MIME types', async () => {
  const base = `http://127.0.0.1:${port}`;
  const page = await fetch(base);
  assert.equal(page.status, 200);
  assert.match(await page.text(), /CyberClub Web/);
  const core = await fetch(base + '/node_modules/@cyberclub/core/index.js');
  assert.equal(core.status, 200);
  assert.match(core.headers.get('content-type'), /^text\/javascript/);
  assert.match(await core.text(), /BookingsService/);
});

test('denies server code, manifests and encoded or raw traversal', async () => {
  for (const path of [
    '/server.js', '/package.json', '/node_modules/@cyberclub/core/package.json',
    '/node_modules/@cyberclub/core/test/booking.test.js',
    '/src/../index.html', '/src/%2e%2e/index.html', '/src/%2e%2e%2findex.html',
  ]) {
    const status = await new Promise((resolve, reject) => {
      get({ host: '127.0.0.1', port, path }, (response) => {
        response.resume();
        resolve(response.statusCode);
      }).on('error', reject);
    });
    assert.equal(status, 404, path);
  }
});

test('accepts HEAD and rejects writes over HTTP', async () => {
  const base = `http://127.0.0.1:${port}`;
  assert.equal((await fetch(base, { method: 'HEAD' })).status, 200);
  assert.equal((await fetch(base, { method: 'POST' })).status, 405);
});
