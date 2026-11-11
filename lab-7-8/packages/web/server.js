import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { pathToFileURL } from 'node:url';

const coreUrl = new URL('.', import.meta.resolve('@cyberclub/core'));
const corePrefix = '/node_modules/@cyberclub/core/';
const webFiles = [
  'index.html',
  'style.css',
  'src/app/index.js',
  'src/shared/storage/localStorageAdapter.js',
  'src/widgets/booking-form/ui.js',
  'src/widgets/booking-list/ui.js',
];
const coreFiles = [
  'index.js',
  'application/bookingsService.js',
  'domain/booking.js',
  'domain/bookingValidation.js',
  'domain/zones.js',
  'ports/storage.js',
];
const routes = new Map([
  ...webFiles.map((file) => [`/${file}`, new URL(file, import.meta.url)]),
  ...coreFiles.map((file) => [corePrefix + file, new URL(file, coreUrl)]),
]);
routes.set('/', routes.get('/index.html'));

function mimeType(file) {
  if (file.pathname.endsWith('.js')) return 'text/javascript; charset=utf-8';
  if (file.pathname.endsWith('.css')) return 'text/css; charset=utf-8';
  return 'text/html; charset=utf-8';
}

export function createWebServer() {
  return createServer(async (request, response) => {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      response.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }

    const file = routes.get(request.url?.split('?')[0]);
    if (!file) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Не знайдено');
      return;
    }

    try {
      const body = await readFile(file);
      response.writeHead(200, {
        'Content-Type': mimeType(file),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
      }).end(request.method === 'HEAD' ? undefined : body);
    } catch {
      response.writeHead(500).end();
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT ?? 3000);
  createWebServer().listen(port, 'localhost', () => {
    console.log(`CyberClub Web: http://localhost:${port}`);
  });
}
