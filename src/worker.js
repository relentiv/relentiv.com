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
  } else if (/sitemap\.xml|robots\.txt/.test(pathname)) {
    headers.set('Cache-Control', 'public, max-age=3600');
  } else if (/\.html$/.test(pathname) || !pathname.includes('.')) {
    headers.set('Cache-Control', 'no-cache, must-revalidate');
  }

  return new Response(response.body, {status: response.status, headers});
}

async function fetchAsset(env, request) {
  const response = await env.ASSETS.fetch(request.url, request);
  return response.status < 400 ? response : null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    const assetResponse = await fetchAsset(env, request);
    if (assetResponse) {
      return addHeaders(assetResponse, pathname);
    }

    if (!pathname.includes('.')) {
      const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/$/, '');
      const htmlRequest = new Request(`${url.origin}${normalizedPath}/index.html`, request);
      const htmlResponse = await fetchAsset(env, htmlRequest);

      if (htmlResponse) {
        return addHeaders(htmlResponse, `${normalizedPath || '/'}/index.html`);
      }
    }

    const indexRequest = new Request(`${url.origin}/index.html`, request);
    const indexResponse = await fetchAsset(env, indexRequest);
    if (indexResponse) {
      const htmlResponse = new Response(indexResponse.body, {
        status: 200,
        headers: indexResponse.headers,
      });

      return addHeaders(htmlResponse, '/index.html');
    }

    return new Response('Not found', {status: 404});
  },
};
