---
  title: Dropdown
---

##### 基础使用
```jsx
// import { RichText } from '../../build/lib/index'
import Dropdown from './index'
ReactDOM.render(
  <div style={{ width: '400px' }}>
    <Dropdown
      menuData={[
        { text: 'Click1', key: '0' }
      ]}
      onClick={e => console.log(e)}
    />
    <p style={{ margin: '5px 0' }} />
    <Dropdown
      menuData={[
        { text: 'Click1', key: '0' },
        { text: 'Click2', key: '1' }
      ]}
      onClick={e => console.log(e)}
    />
    <p style={{ margin: '5px 0' }} />
    <Dropdown
      menuData={[
        { text: 'Click1', key: '0' },
        { text: 'Click2', key: '1' },
        { text: 'Click3', key: '2' },
        { text: 'Click4', key: '3' },
      ]}
      onClick={e => console.log(e)}
    />
    <p style={{ margin: '5px 0' }} />
    <Dropdown
      menuData={[
        { text: '超长菜单说明', key: '0' },
        { text: 'Click2', key: '1' },
        { text: 'Click3', key: '2' },
        { text: '超长隐藏菜单说明', key: '3' },
      ]}
      onClick={e => console.log(e)}
    />
  </div>, mountNode);
```
`menuData`大于2条的部分数据会展现在隐藏菜单里

---

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menuData | 菜单数据 | Array | - |
| onClick | 单击菜单回调事件 | (key: string) => () | - |
