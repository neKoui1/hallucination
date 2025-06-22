// 根组件

import { useRef } from "react";

// App -> index.tsx -> public/index.html(root)
function App() {
  const inputRef = useRef(null)
  const showDom = () => {
    console.dir(inputRef.current)
  }
  return (
    <div className="App">
      <input
        type="text"
        ref={inputRef}
      >
      </input>
      <button onClick={showDom}>
        获取dom
      </button>
    </div>
  );
}

export default App;