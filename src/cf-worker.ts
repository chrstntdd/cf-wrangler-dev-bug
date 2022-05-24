import {
  getAssetFromKV,
  NotFoundError,
  MethodNotAllowedError
} from "@cloudflare/kv-asset-handler"
import type { AssetManifestType } from "@cloudflare/kv-asset-handler/dist/types"
// @ts-expect-error
// CF's own manifest
import cfManifestJSON from "__STATIC_CONTENT_MANIFEST"

import { renderAppToString } from "./render.worker"

const CF_MANIFEST = JSON.parse(cfManifestJSON)
/**
 * @description the inlined manifest from the build of the client build
 */
const MANIFEST = __MANIFEST__

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === "/api/whatever" && request.method === "GET") {
      return new Response(
        JSON.stringify({
          things: [{ id: "a" }, { id: "b" }, { id: "c" }]
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    }

    if (/\.\w+/.test(url.pathname)) {
      try {
        return await getAssetFromKV(
          {
            request,
            waitUntil(promise) {
              return ctx.waitUntil(promise)
            }
          },
          {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: CF_MANIFEST as unknown as AssetManifestType
          }
        )
      } catch (e) {
        if (e instanceof NotFoundError) {
          console.log("NOT FOUND", { e })
        } else if (e instanceof MethodNotAllowedError) {
          console.log("NOT ALLOWED", { e })
        } else {
          return new Response("An unexpected error occurred", { status: 500 })
        }
      }
    }

    let appAsStr = await renderAppToString({
      scriptSources: [MANIFEST["index.html"]!.file]
    })

    return new Response("<!doctype html>" + appAsStr, {
      headers: {
        "Content-Type": "text/html"
      }
    })
  }
}
