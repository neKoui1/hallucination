# defer和return的执行顺序

## 1. defer的执行顺序

*LIFO* defer的后面只能跟函数

## 2. defer和return的执行顺序

return会先执行，defer会后执行

```go
package main

import "fmt"

func deferFunc() {
	fmt.Println("defer func called")
}

func returnFunc() int {
	fmt.Println("return func called")
	return 1
}

func returnAndDefer() int {
	// 后执行
	defer deferFunc()
	// 先执行
	return returnFunc()
}

func main() {
	returnAndDefer()
}

```

*Output*

```shell
return func called
defer func called
```

![](assets/2025-09-01-10-05-57-image.png)

## 3. defer和无命名返回值的函数

go在return时，会执行一个类似创建`temp := i`的临时变量保存return的操作，因此在下列函数中会先确认返回值为0，后续的defer对i的修改不会影响到return的temp值

在defer时按照后进先出顺序先执行`defer func2 i = 1`和`defer func1 = 2`

之后在退出函数体返回到主函数执行主函数中println时得到的返回值是之前保存的临时变量0

```go
package main

import "fmt"

func deferFunc() int {
	var i int
	defer func() {
		i++
		fmt.Println("defer func 1 i = ", i)
	}()

	defer func() {
		i++
		fmt.Println("defer func 2 i = ", i)
	}()

	return i
}

func main() {
	fmt.Println("deferFunc() = ", deferFunc())
}

```

*Output*

```shell
defer func 2 i =  1
defer func 1 i =  2
deferFunc() =  0
```

![](assets/2025-09-01-10-08-46-image.png)

## 4. defer和有命名返回值的函数

执行return时先执行返回值的保存操作，后续的defer将能够修改这个返回值，因此println的值为2

```go
package main 
import "fmt" 
func deferFunc() (i int) {
 defer func() {
 i++
 fmt.Println("defer func1 i = ", i)
 }() 
defer func() {
 i++
 fmt.Println("defer func2 i = ", i)
 }()
 return i
} 
func main() {
 fmt.Println("deferFunc = ", deferFunc())
}
```

*Output*

```shell
defer func2 i =  1
defer func1 i =  2
deferFunc =  2
```

![](assets/2025-09-01-10-10-03-image.png)
