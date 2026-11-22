// Servidor estático mínimo para a pasta dist/ (sem dependências).
// Escuta em 0.0.0.0 e usa a variável PORT (padrão 3000), como pede o Easypanel/Docker.
import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
};

async function findFile(urlPath) {
  const clean = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, '');
  const base = join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  for (const candidate of [base, join(base, 'index.html'), base + '.html']) {
    try {
      const s = await stat(candidate);
      if (s.isFile()) return candidate;
    } catch {}
  }
  return null;
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' }).end();
      return;
    }
    if (url.pathname === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'text/plain' }).end('ok');
      return;
    }
    // vocacional.aurasc.com.br abre o teste vocacional na raiz (mesmo app do site).
    const host = String(req.headers.host || '').split(':')[0].toLowerCase();
    const pathname = host.startsWith('vocacional.') && url.pathname === '/' ? '/teste-vocacional/' : url.pathname;
    let file = await findFile(pathname);
    let status = 200;
    if (!file) {
      file = join(ROOT, '404.html');
      status = 404;
    }
    const type = TYPES[extname(file).toLowerCase()] || 'application/octet-stream';
    const headers = {
      'Content-Type': type,
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Cache-Control': url.pathname.startsWith('/_astro/')
        ? 'public, max-age=31536000, immutable'
        : type.startsWith('text/html')
          ? 'public, max-age=0, must-revalidate'
          : 'public, max-age=86400',
    };
    res.writeHead(status, headers);
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).on('error', () => res.end()).pipe(res);
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain' }).end('Erro interno');
  }
});

server.listen(PORT, HOST, () => {
  console.log(`AURA site em http://${HOST}:${PORT}`);
});
