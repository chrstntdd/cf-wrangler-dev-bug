# Cloudflare wrangler dev bug

A minimal repro case for `wrangler dev` causing HTTP 403 errors when fetching from the worker rendered web application.

Can be "fixed" by running wrangler in `local` mode.

## Steps to repro

1. Install deps
2. Run with `pnpm dev` (Runs in non-local mode on Cloudflare's network)
3. Load the in a browser application @ `http://localhost:8787`
4. Observe stringified HTTP 403 error due to the `fetch` call
5. With the terminal still open, turn on local mode with `l`
6. After the application rebuilds, reload the browser window
7. Observe the app rendering the response handled by the worker as expected
