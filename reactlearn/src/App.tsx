import { useEffect, useState } from "react";

interface Channel {
  id: number;
  name: string;
}

const url = "http://geek.itheima.net/v1_0/channels"

// App -> index.tsx -> public/index.html(root)
function App() {
  // 创建一个状态数据
  const [list, setList] = useState<Channel[]>([])
  useEffect(()=>{
    // 获取频道列表
    async function getList() {
      const res = await fetch(url)
      const jsonRes = await res.json()
      // console.log(jsonRes)
      // console.log(typeof jsonRes)
      // console.log(jsonRes['data']['channels'])
      setList(jsonRes.data.channels)
      console.log(list)
    }
    getList()
  }, [])
  return (
    <div>
      this is app
      <ul>
        {list.map(item=><li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}

export default App;
