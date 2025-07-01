// 1. 子传父 A -> App
// 2. 父传子 App -> B

import { ReactNode, useState } from "react";

function A({ onGetAName }: { onGetAName: (name: string) => void }) {
  const name = "name";
  return (
    <div>
      this is A component,
      <button onClick={() => onGetAName(name)}>send</button>
    </div>
  );
}

function B({ name }: { name: string }) {
  return (
    <div>
      this is B component,
      {name}
    </div>
  );
}

// App -> index.tsx -> public/index.html(root)
function App() {
  const [name, setName] = useState("");
  const getAName = (name: string) => {
    console.log(name);
    setName(name);
  };
  return (
    <div className="App">
      this is App
      <A onGetAName={getAName} />
      <B name={name} />
    </div>
  );
}

export default App;
