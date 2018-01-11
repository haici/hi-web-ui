---
  title: 'Modal'
---

test


```jsx
import Modal from './index'

class Demo extends React.Component {
  state = {
    hasShow: false,
  }
  render() {
    const { hasShow } = this.state
    return (
      <div>
        <Modal
          {...{
            hasShow,
            onCancel: () => this.setState({ hasShow: false })
          }}
        />
        <button
          onClick={() => this.setState({ hasShow: true })}
        >click</button>
      </div>
    )
  }
}

ReactDOM.render(<Demo />, mountNode);
```