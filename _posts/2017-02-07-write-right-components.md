---
layout: post
title: 如何编写正确的React组件
summary: 
tags: [react]
---

[http://www.10tiao.com/html/184/201702/2247485008/1.html](http://www.10tiao.com/html/184/201702/2247485008/1.html)

## 基于类的组件
### 1. 导入css
``` js
import React, {Component} from 'react'
import {observer} from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'
```
理论上，我喜欢CSS in JavaScript。但它仍然是一个新的想法，还没有出现一个成熟的解决方案。在此之前，我们将一个CSS文件导入到每个组件。
我们还通过换行将依赖导入与本地导入分开。

### 2. 初始化状态
``` js
import React, {Component} from 'react'
import {observer} from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

export default class ProfileContainer extends Component {
  state = { expanded: false }
}
```
如果你使用ES6（ES7不适用），在构造函数中初始化状态。否则，使用专用于ES7的方法。
我们还要确保将我们的类导出为默认类。

### 3. propTypes和defaultProps
``` js
import React, {Component} from 'react'
import {observer} from 'mobx-react'

import ExpandableForm from './ExpandableForm'
import './styles/ProfileContainer.css'

export default class ProfileContainer extends Component {
  state = { expanded: false }
  static propTypes = {
    model: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  }
  static defaultProps = {
    model: {
      id: 0
    },
    title: 'Your Name'
  }
}
```
propTypes和defaultProps是静态属性，在组件代码中声明的优先级尽可能高。由于它们作为文档，因此它们应该对其他读取文件的开发者可见。
所有的组件应该有propTypes。

### 4. 方法
``` js
handleSubmit = (e) => {
  e.preventDefault()
  this.props.model.save()
}
```
使用类组件，当将方法传递给子组件时，必须确保它们在调用时具有正确的_this_。通常通过传递_this.handleSubmit.bind(this)_到子组件来实现。
我们认为这种方法更简洁也更容易，通过ES6的箭头函数自动保持正确的上下文。

### 5. 解构props
``` js
const {
  model,
  title
} = this.props
```
具有多个props的组件，每个props应该占据单独一个行，如上所示。

### 6. 装饰器
``` js
@observer
export default class ProfileContainer extends Component {
}
// or
class ProfileContainer extends Component {
  // Component code
}
export default observer(ProfileContainer)
```

### 7. 闭包
``` html
<input
  type="text"
  value={model.name}
  // onChange={(e) => { model.name = e.target.value }}
  // ^ Not this. Use the below:
  onChange={this.handleChange}
  placeholder="Your Name"/>
```
这就是为什么每次父组件渲染时，创建一个新的函数并传递给输入的原因。
如果输入是React组件，这将自动触发它重新渲染，而不管它的其他props是否实际改变。
调和算法（Reconciliation）是React最耗时的部分。不要让它比所需更难！此外，传递类的方法更容易阅读、调试和更改。

## 函数组件
``` js
import React from 'react'
import {observer} from 'mobx-react'
// Separate local imports from dependencies
import './styles/Form.css'

// Declare propTypes here, before the component (taking advantage of JS function hoisting)
// You want these to be as visible as possible
ExpandableForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  expanded: React.PropTypes.bool
}

// Destructure props like so, and use default arguments as a way of setting defaultProps
function ExpandableForm({ onExpand, expanded = false, children }) {
  return (
    <form style={ expanded ? { height: 'auto' } : { height: 0 } }>
      {children}
      <button onClick={onExpand}>Expand</button>
    </form>
  )
}

// Wrap the component instead of decorating it
export default observer(ExpandableForm)
```

+ 我们的组件是一个函数，它的Props作为其参数

+ 避免使用以下ES6语法: `const ExpandableForm = ({ onExpand, expanded, children }) => {` 如果你的Babel设置正确，这个名字的缺失不会成为一个问题：但如果不是，任何错误将<<anonymous>>中显示，对调试而言，是一个非常严重的问题

+ 因为你不能使用装饰器和功能组件，你只需将函数作为参数传递给它

## JSX条件
使用花括号括起一个IIFE，然后把你的if语句置于里面，返回任何你想要的渲染。请注意，这样的IIFE可能会导致性能下降，但在大多数情况下，它不会严重到以致失去可读性。
``` html
<div>
  {
    (() => {
      if() {
      } else {
      }
    })()
  }
</div>
```

``` js
{
  isTrue
   ? <p>True!</p>
   : <none/>
}

// or short-circuit

{
  isTrue && 
    <p>True!</p>
}
```
