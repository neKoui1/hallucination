# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# React系统学习

```shell
npx create-react-app 项目名称 --template typescript
```

创建项目，之后在`src`中仅保留`App.tsx`和`index.tsx`

![image-20250614113435453](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614113435490.png)

* 根组件`App.tsx`
* 入口文件`index.tsx`
* `index.html`只包含一个`div`元素作为react应用的挂载点

## JSX

在JS中编写HTML模板结构

识别JS表达式

```tsx
const msg: string = "hello world"
function App() {
  return (
    <div className="App">
      {msg}
    </div>
  );
}
```

```TSX
const msg: string = "hello world"
const num: number = 123
function getName() : string {
  return "name123"
}
function App() {
  return (
    <div className="App">
      {msg} <br/>
      {num.toString()}<br></br>
      {getName()}<br></br>
      {new Date().getFullYear()}
      <div style={{color:'BLUE'}}>秋葉原</div>
    </div>
  );
}
```

![image-20250614120127527](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614120127582.png)

## JSX实现列表渲染

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
var list: {
  id: number,
  value: string,
}[]= [
  {id:1001, value:'1001'},
  {id:1002, value:'1002'},
  {id:1003, value:'1003'},
]
function App() {
  return (
    <div className="App">
      <ul>
        {list.map(item=><li>act</li>)}
      </ul>
    </div>
  );
}

export default App;
```

![image-20250614200201598](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614200208659.png)

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
var list: {
  id: number,
  value: string,
}[]= [
  {id:1001, value:'value1'},
  {id:1002, value:'1002dea'},
  {id:1003, value:'大卫·戴'},
]
function App() {
  return (
    <div className="App">
      <ul>
        {list.map(item=><li key={item.id}>{item.value}</li>)}
      </ul>
    </div>
  );
}

export default App;
```

![image-20250614200454969](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614200454998.png)

在React中，为列表元素加上唯一的`key`属性是为了帮助React跟踪列表中元素的身份，以便在数据发生变化时，React可以高效地更新DOM，避免不必要的重新渲染。如果没有`key`，React会使用一种“就地更新”的策略，这可能会导致性能问题，尤其是在列表元素较多或者元素经常变动的情况下

## JSX实现基础条件渲染

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
const loading = false
function App() {
  return (
    <div className="App">
      {loading && <span> loading ... </span>}
      {loading ? <span>loading ... </span>: <span> no loading</span>}
    </div>
  );
}

export default App;
```

![image-20250614201323177](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614201323202.png)

## JSX实现复杂条件渲染

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)

// 定义显示类型
var fileType = 1 // 0 1 2
var fileType2 = 2 // 0 1 2
// 核心函数
function getFileType() {
  if(fileType===0) {
    return <div>file type = 0</div>
  } else if(fileType===1) {
    return <div>file type = 1</div>
  } else {
    return <div>file type = 2</div>
  }
}
function App() {
  return (
    <div className="App">
      {getFileType()}
      {fileType2 === 2 && <div> file type = 2 </div>}
    </div>
  );
}

export default App;
```

![image-20250614201953615](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614201953641.png)

## 事件绑定

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
function App() {
  const handleClick = () => {
    console.log('helloworld')
  }
  return (
    <div className="App">
      <button onClick={handleClick}>click!</button>
    </div>
  );
}

export default App;
```

![image-20250614202523597](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614202523634.png)

## 使用事件对象作为参数

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
function App() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('helloworld', e)
  }
  return (
    <div className="App">
      <button onClick={handleClick}>click!</button>
    </div>
  );
}

export default App;
```

![image-20250614203252603](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614203252678.png)

## 传递自定义参数

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
function App() {
  const handleClick = (value: number) => {
    console.log('helloworld', value)
  }
  return (
    <div className="App">
      <button onClick={()=>handleClick(123)}>click!</button>
    </div>
  );
}

export default App;
```

![image-20250614203410499](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614203410532.png)

## React组件

首字母大写的函数

```tsx
// 根组件

import { JSX } from "react";

// App -> index.tsx -> public/index.html(root)
function Button(): JSX.Element {
  return <button>click me</button>
}
function App() {
  const handleClick = (value: number) => {
    console.log('helloworld', value)
  }
  return (
    <div className="App">
      <Button></Button>
    </div>
  );
}

export default App;
```

![image-20250614204501381](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250614204501418.png)

## `useState`基础

`useState`是一个`React Hook`，允许我们向组件添加一个状态变量，从而影响组件的渲染结果

```tsx
// 根组件
import {useState} from 'react'
// App -> index.tsx -> public/index.html(root)
function App() {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    if (count+1 > 2) {
      setCount(0)
      return
    }
    setCount(count+1)
  }
  return (
    <div className="App">
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}

export default App;
```

## `useState`修改状态的规则

1. **不可变性:**状态是只读的，不能直接修改。应该使用`set`函数来替换旧状态，而不是直接修改。
2. **直接修改状态不触发更新:**直接修改`useState`返回的状态变量不会导致组件重新渲染，视图也不会更新。
3. **对象状态的修改:**对于对象类型的状态，需要使用新的对象来替换旧对象。不能直接修改对象属性。

## 基础样式控制

1. 使用行内样式控制

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
function App() {
  return (
    <div className="App">
      <span style={{color:'black', fontSize: '50px', fontFamily: 'serif'}}>London. Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine lizard up Holborn Hill.</span>
    </div>
  );
}

export default App;
```

![image-20250615140950431](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250615140957561.png)

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
const foo = {
  color : 'blue',
  fontSize: '80px',
  fontFamily: 'serif',
}

function App() {
  return (
    <div className="App">
      <span style={foo}>London. Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine lizard up Holborn Hill.</span>
    </div>
  );
}

export default App;
```

![image-20250615141136237](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250615141136333.png)

2. 通过class类名控制

在`index.css`中编写文件

```css
.foo2 {
    color: red;
    font-family: serif;
    font-size: 80px;
}
```

之后在`App.tsx`中`import`

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)
import './index.css'
const foo = {
  color : 'blue',
  fontSize: '80px',
  fontFamily: 'serif',
}

function App() {
  return (
    <div className="App">
      <span style={foo}>London. Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November weather. As much mud in the streets as if the waters had but newly retired from the face of the earth, and it would not be wonderful to meet a Megalosaurus, forty feet long or so, waddling like an elephantine lizard up Holborn Hill.</span>
      <br /><span className="foo2">foo2</span>
    </div>
  );
}

export default App;
```

![image-20250615141655058](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250615141655153.png)

## 表单受控绑定

1. 声明一个`useState`
2. 绑定`onChange`事件，通过事件参数e拿到输入框最新的值，反向修改到react状态

```tsx
// 根组件
// App -> index.tsx -> public/index.html(root)

import { useState } from "react";

function App() {
  const [value, setValue] = useState('')
  const handleClick = () => {
    console.log(value)
  }
  return (
    <div className="App">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type='text'
        onClick={handleClick}
      ></input>
    </div>
  );
}

export default App;
```

![image-20250615195806482](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250615195806595.png)

## 获取DOM

1. 使用`useRef`创建`ref`对象，绑定到`dom`标签上
2. 在DOM可用时，使用`ref.current`拿到DOM对象
3. 渲染完毕之后`dom`生成之后才可用

```tsx
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
```

![image-20250615200459044](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250615200459099.png)

## 组件通信

### 父传子

![image-20250701153657202](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250701153657542.png)

```tsx
// 父传子
// 1. 父组件传递数据，子组件标签绑定属性
// 2. 子组件接收数据 props参数
interface SonProps {
  name: string;
  age?: number
}

function Son(props: SonProps) {
  console.log(props)
  return <div>{props.name} this is son {props.age? props.age : "10"}</div>
}
// App -> index.tsx -> public/index.html(root)
function App() {
  const name = 'this is app name'
  return (
    <div className="App">
      <Son name={name} age={20}></Son>
    </div>
  );
}

export default App;
```

1. `props`本质是对象
2. 即使只传递一个属性也是对象
3. 如果`props`类型是`any`：允许任意访问，但不安
4. 子组件只能读取`props`中的数据，不能直接进行修改
5. **父组件的数据只能由父组件修改**

特殊的`prop` `children`

当我们把内容嵌套在子组件标签中时，父组件会自动在名为`children`的`prop`属性中接收该内容

```tsx
// 父传子
// 1. 父组件传递数据，子组件标签绑定属性
// 2. 子组件接收数据 props参数
interface SonProps {
  name: string;
  age?: number;
  children: React.ReactNode
}

function Son(props: SonProps) {
  console.log(props)
  return <div>{props.name} this is son {props.age? props.age : "10"}<br/> {props.children}</div>
}
// App -> index.tsx -> public/index.html(root)
function App() {
  const name = 'this is app name'
  return (
    <div className="App">
      <Son name={name} age={20}>
        <span>this is span</span>
      </Son>
    </div>
  );
}

export default App;
```

### 子传父

![image-20250701174656396](https://cdn.jsdelivr.net/gh/neKoui1/picgo_images/img/20250701174703606.png)

在子组件中调用父组件的函数并传递参数

```tsx
// 子传父
// 在子组件中调用父组件中的函数并传递实参

import { useState } from "react";

function Son({ onGetSonMsg }: { onGetSonMsg: (msg: string) => void }) {
  // Son组件中的数据
  const sonMsg = "this is son msg";
  return (
    <div>
      this is Son
      <button onClick={() => onGetSonMsg(sonMsg)}>sendMsg</button>
    </div>
  );
}

// App -> index.tsx -> public/index.html(root)
function App() {
  const [msg, setMsg] = useState("");
  const getMsg = (msg: string) => {
    console.log(msg);
    setMsg(msg);
  };
  return (
    <div className="App">
      <div>
        this is app, {msg}
        <Son onGetSonMsg={getMsg} />
      </div>
    </div>
  );
}

export default App;
```

### 使用状态提升实现兄弟组件通信

通过父组件进行兄弟组件之间的数据传递

```tsx
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
```

