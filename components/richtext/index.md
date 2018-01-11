---
title: RichText
order: 1
---

一个富文本输入框

> 目前版本中使用了一些`iconfont`，需要在程序入口导入`//at.alicdn.com/t/font_312355_aclk13xe29w1att9.css`


## 何时使用

需要保存一些比较复杂的文本信息

## 代码演示

##### 基础使用
```jsx
// import { RichText } from '../../build/lib/index'
import RichText from './index'
ReactDOM.render(
  <div style={{ width: '400px' }}>
    <RichText
      onChange={value => console.log(JSON.stringify(value))}
      action="http://192.168.0.22:3000/upload"
      name="file"
      onUploadSuccess={({ fileUrl }) => `http://192.168.0.22:3000/${fileUrl}`}
      onClickImage={(url, arr) => console.log(url, arr)}
    />
  </div>, mountNode);
```
目前只支持 `粗体` `文件上传` 两个功能，后续会陆续根据需求添加一些基础功能

----

##### 只读模式

用于展示文本

```jsx
// import { RichText } from '../../build/lib/index'
import RichText from './index'
const text = {"entityMap":{"0":{"type":"image","mutability":"IMMUTABLE","data":{"src":"http://192.168.0.22:3000/tmp/0.05405956575742321_125_mini_1.png"}}},"blocks":[{"key":"d5jm","text":"关于兼容性的问题","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ffuss","text":"啥时候处理兼容性问题呀","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3eonb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"98qg8","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"f1bnq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"d68rs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}

ReactDOM.render(
  <div style={{ width: '400px' }}>
    <RichText
      defaultValue={text}
      readOnly={true}
      onClickImage={(url, arr) => console.log(url, arr)}
    />
  </div>, mountNode);
```
`defaultValue`的值必须是之前保存的`onChange`的返回值

----

##### 自定义样式
```jsx
import React from 'react'
import RichText from './index'

class Demo extends React.Component {
  state = {
    value: '',
  }
  render() {
    return (
      <RichText
        hasError={!this.state.value}
        onChange={v => this.setState({ value: v })}
      />
    );
  }
}

ReactDOM.render(<Demo />, mountNode);
```
目前只支持 `粗体` `文件上传` 两个功能，后续会陆续根据需求添加一些基础功能
> 目前版本中使用了一些`iconfont`，需要在程序入口导入`//at.alicdn.com/t/font_312355_aclk13xe29w1att9.css`

----

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultValue | 默认值 | Object | - |
| readOnly | 是否只读 | Boolean | false |
| onClickImage | 单击图片的回调函数 | Function | - |
| onChange | 文本改变时的回调函数 | Function | - |
| name | 文件上传请求中得`name`字段 | String | - |
| action | 文件上传的地址 | String | - |
| onUploadSuccess | 图片上传成功回调函数，返回正确的图片url即可 | (res: Object) => string | - |


<style>
  .hi-de-root-error {
    border: 1px solid red;
  }
</style>
