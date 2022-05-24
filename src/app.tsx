import { createResource, createSignal } from "solid-js"

export function App() {
  let [c, setC] = createSignal(0)
  return (
    <div>
      <div>{c()}</div>
      <button
        onClick={() => {
          setC((c) => c + 1)
        }}
      >
        ++
      </button>

      <Whatever />
    </div>
  )
}

function Whatever() {
  let [x] = createResource("http://0.0.0.0:8787/api/whatever", async (key) => {
    let r = await fetch(key)
    if (!r.ok) {
      throw Error(
        `Res not ok, ${JSON.stringify({
          status: r.status,
          text: r.statusText
        })}`
      )
    }
    return r.json()
  })

  return (
    <section>
      <div>SSR data from worker:</div>
      <pre>{JSON.stringify(x(), null, 2)}</pre>
    </section>
  )
}
