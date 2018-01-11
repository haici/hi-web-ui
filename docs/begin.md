---
order: 8
title: 开始使用
---


#### 第一步 安装
```base
yarn add hi-web-ui
```

> 推荐使用`yarn`,如果没有，使用`npm`也完全没问题


#### 第二步 解构出并开始使用组件
```js
import { Richtext } from 'hi-web-ui'

ReactDOM.render(
  <div style={{ width: '400px' }}>
    <Dropdown
      menuData={[
        { text: 'Click1', key: '0' }
      ]}
      onClick={e => console.log(e)}
    />
  </div>, mountNode);
```

是不是简单