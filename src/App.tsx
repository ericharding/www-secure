import { Component, createEffect, createSignal, ParentComponent } from "solid-js";
import gen from "./hasher";

const Label: ParentComponent<{ text: string }> = (props) => {
  return (
    <label class="bg-slate-300 flex flex-row w-96">
      <span class="text-black basis-1/3 px-1">{props.text}</span>
      {props.children}
    </label>
  );
};

const ClipText: Component<{ label: string; value?: string }> = (props) => {
  return (
    <Label text={props.label}>
      <input type="text" readonly value={props.value ?? ""} class="grow bg-gray-50" />
    </Label>
  );
};

const App: Component = () => {
  const [password, setPassword] = createSignal("");
  const [token, setToken] = createSignal("");
  const inputChanged = (fn) => (e) => {
    const target = e.target as HTMLInputElement;
    fn(target?.value ?? "");
  };
  const genPassword = (i: number) => {
    if (password() === "" || token() === "") return "";
    const hash = gen(password(), token());
    return hash.substring(0, i);
  };
  return (
    <>
      <div class="flex flex-col items-center justify-center p-4 bg-slate-400">
        <Label text="Password:">
          <input type="password" class="grow" value={password()} onChange={inputChanged(setPassword)} />
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
  );
};

export default App;
