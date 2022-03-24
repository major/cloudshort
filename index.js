// Copyright Patrick Reader 2020, Licensed under the MIT Licence
// https://github.com/pxeger/url-shortener/blob/master/LICENCE.txt
// Source: https://www.pxeger.com/2020-08-06-world%27s-simplest-url-shortener-using-cloudflare-workers/
const urls = require('./urls.json');

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
  const path = new URL(request.url).pathname.substring(1);
  console.log(request.headers['user-agent'], new Date(), path);
  if (path in urls) return new Response(null, { status: 308, headers: { location: urls[path] } });
  else return new Response('404 not found?', { status: 404 });
}
