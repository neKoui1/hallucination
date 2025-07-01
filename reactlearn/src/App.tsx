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