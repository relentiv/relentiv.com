import {getAssetFromKV} from '@cloudflare/kv-asset-handler';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

const assetManifest = JSON.parse(manifestJSON);

function addHeaders(response, pathname) {
  const headers = new Headers(response.headers);

  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'DENY');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (/\.(js|css|woff2?|ttf|otf|eot)$/.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else if (/\.(png|jpg|jpeg|webp|svg|ico|gif)$/.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=2592000');
  } else if (/\.html$/.test(pathname) || !pathname.includes('.')) {
    headers.set('Cache-Control', 'no-cache, must-revalidate');
  } else if (/sitemap\.xml|robots\.txt/.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=3600');
  }

  return new Response(response.body, {status: response.status, headers});
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    try {
      const response = await getAssetFromKV(
        {request, waitUntil: ctx.waitUntil.bind(ctx)},
        {
          ASSET_NAMESPACE: env.__STATIC_CONTENT,
          ASSET_MANIFEST: assetManifest,
        },
      );

      return addHeaders(response, pathname);
    } catch (e) {
      try {
        const htmlPath = `${pathname.replace(/\/$/, '')}/index.html` || '/index.html';
        const htmlRequest = new Request(`${url.origin}${htmlPath}`, request);
        const response = await getAssetFromKV(
          {request: htmlRequest, waitUntil: ctx.waitUntil.bind(ctx)},
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
          },
        );

        return addHeaders(response, htmlPath);
      } catch (e2) {
        try {
          const indexRequest = new Request(`${url.origin}/index.html`, request);
          const response = await getAssetFromKV(
            {request: indexRequest, waitUntil: ctx.waitUntil.bind(ctx)},
            {
              ASSET_NAMESPACE: env.__STATIC_CONTENT,
              ASSET_MANIFEST: assetManifest,
            },
          );
          const htmlResponse = new Response(response.body, {
            status: 200,
            headers: response.headers,
          });

          return addHeaders(htmlResponse, '/index.html');
        } catch (e3) {
          return new Response('Not found', {status: 404});
        }
      }
    }
  },
};
