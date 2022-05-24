import { For, Suspense, ErrorBoundary } from "solid-js"

import { HydrationScript, NoHydration } from "solid-js/web"

import { App } from "./app"

type Props = {
  scriptSources?: string[]
}

export function Document(props: Props) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        <link
          rel="shortcut icon"
          href="data:image/x-icon;,"
          type="image/x-icon"
        />

        <HydrationScript />

        <title>Cloudflare Wrangler Dev Bug</title>
      </head>
      <body>
        <noscript>
          JavaScript is required to use this application.
          <br />
          Please enable it.
        </noscript>
        <ErrorBoundary
          fallback={(e) => (
            <div>
              Borked 😭 Error:
              <pre>{e.toString()}</pre>
            </div>
          )}
        >
          <Suspense fallback="Loading...">
            <App />
          </Suspense>
        </ErrorBoundary>
        <NoHydration>
          <For each={props.scriptSources}>
            {(src) => <script type="module" src={src} />}
          </For>
        </NoHydration>
      </body>
    </html>
  )
}
