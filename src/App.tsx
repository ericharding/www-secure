import { Component, createEffect, createSignal, onCleanup, onMount, ParentComponent } from 'solid-js'
import gen from './hasher'

const CopyButton: Component<{ value?: string }> = (props) => {
  return (
    <input
      type="button"
      class="py-0 px-2 grow-0 border-2 bg-transparent hover:bg-slate-700 active:bg-orange-800 active:scale-95 text-white font-bold rounded"
      value="📋"
      onClick={(e) => navigator.clipboard.writeText(props.value)}
    />
  )
}

const Label: ParentComponent<{ text: string }> = (props) => {
  return (
    <label class="bg-slate-300 flex flex-row w-1/3">
      <span class="text-black basis-1/3 grow-0 mx-1">{props.text}</span>
      {props.children}
    </label>
  )
}

const ClipText: Component<{ label: string; value?: string }> = (props) => {
  return (
    <Label text={props.label}>
      <input type="text" readonly value={props.value ?? ''} class="grow bg-gray-50" />
      <CopyButton value={props.value} />
    </Label>
  )
}

function ignore(t) {}

var lastUpdated = null
function setLastUpdated() {
  lastUpdated = Date.now()
  // console.log(`lasdUpdated: ${lastUpdated}`)
}
function secondsSinceLastUpdate() {
  const secondsSinceUpdate = (Date.now() - lastUpdated) / 1000
  // console.log(`Checking... seconds since update: ${secondsSinceUpdate}}`)
  return secondsSinceUpdate
}

const App: Component = () => {
  const [password, setPassword] = createSignal('')
  const [token, setToken] = createSignal('')
  const inputChanged = (fn) => (e) => {
    const target = e.target as HTMLInputElement
    fn(target?.value ?? '')
  }

  // Update last updated when password or token changes
  createEffect(() => {
    ignore(password())
    ignore(token())
    setLastUpdated()
  })

  const genPassword = (i: number) => {
    if (password() === '' || token() === '') return ''
    const hash = gen(password(), token())
    return hash.substring(0, i)
  }

  const checkIdle = () => {
    if (secondsSinceLastUpdate() > 300) {
      setPassword('')
    }
  }
  const interval = setInterval(checkIdle, 1000)
  onCleanup(() => clearInterval(interval))

  return (
    <>
      <div class="flex flex-col items-center justify-center p-4 bg-slate-400">
        <Label text="Password:">
          <input autofocus type="password" class="grow" autocomplete='off' value={password()} onChange={inputChanged(setPassword)} />
        </Label>
        <Label text="Token:">
          <input type="text" class="grow" value={token()} onChange={inputChanged(setToken)} />
        </Label>
      </div>
      <div class="flex flex-col items-center justify-center p-4 bg-slate-500">
        <ClipText label="Result" value={genPassword(128)} />
        <ClipText label="Short (8):" value={genPassword(8)} />
        <ClipText label="Medium (12):" value={genPassword(12)} />
      </div>
    </>
  )
}

export default App
