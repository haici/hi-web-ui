---
  title: 'Modal'
---

基础使用
> 带了一写很基础的默认样式，如果不需要或者要修改，可以直接覆盖


```jsx
import Modal from './index'

class Demo extends React.Component {
  state = {
    visible: false,
    hasLoading: false,
  }
  handleModalShow = () => {
    this.setState({ visible: true })
  }
  render() {
    const { visible, hasLoading } = this.state
    return (
      <div>
        <Modal
          {...{
            visible,
            hasLoading,
            onCancel: () => this.setState({ visible: false }),
            onSubmit: () => this.setState({ hasLoading: !hasLoading }),
            cancelText: '取消',
            submitText: '确定',
          }}
        >
          这是一点内容
        </Modal>
        <button
          onClick={this.handleModalShow}
        >click</button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```
---
## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| visible | 是否显示 | Boolean | - |
| onCancel | 关闭事件 | Function | - |
| onSubmit | 提交事件 | Function | - |
