import { renderToStringAsync } from "solid-js/web"

import { Document } from "./document"

export async function renderAppToString({
  scriptSources
}: {
  scriptSources: string[]
}): Promise<string> {
  return renderToStringAsync(() => <Document scriptSources={scriptSources} />)
}
