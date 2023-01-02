import { Component, createEffect, createSignal, ParentComponent } from "solid-js";

const Label: ParentComponent<{ text: string }> = (props) => {
  return (
    <label class="bg-slate-300 flex flex-row w-96">
      <span class="text-black basis-1/3 px-1">{props.text}</span>
      {props.children}
    </label>
  );
};

const ClipText: Component<{ label: string }> = (props) => {
  return <Label text={props.label}>
    <input type="text" readonly class="grow bg-gray-50" />
  </Label>;
};

const App: Component = () => {
  const [password, setPassword] = createSignal("");
  const [key, setKey] = createSignal("");
  const inputChanged = (fn) => (e) => {
    const target = e.target as HTMLInputElement;
    fn(target?.value ?? "");
  };
  return (
    <>
      <div class="flex flex-col items-center justify-center p-4 bg-slate-400">
        <Label text="Password:">
          <input type="password" class="grow" value={password()} onChange={inputChanged(setPassword)} />
        </Label>
        <Label text="Token:">
          <input type="text" class="grow" value={password()} onChange={inputChanged(setKey)} />
        </Label>
      </div>
      <div class="flex flex-col items-center justify-center p-4 bg-slate-500">
        <ClipText label="Result" />
        <ClipText label="Short (8):" />
        <ClipText label="Medium (12):" />
      </div>
    </>
  );
};

export default App;
