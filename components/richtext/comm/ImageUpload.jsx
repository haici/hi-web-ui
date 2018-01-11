import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Upload from 'rc-upload'

class componentName extends Component {
  constructor(props) {
    super(props)
    this.DOMContainer = document.createElement('div')
    this.DOMContainer.style.display = 'none'
    document.body.appendChild(this.DOMContainer)
  }
  componentWillUnmount() {
    document.body.removeChild(this.DOMContainer)
  }
  render() {
    return ReactDOM.createPortal(
      <Upload
        {...this.props}
      >
        <span
          ref={(e) => { this.DOMInput = e }}
        />
      </Upload>,
      this.DOMContainer,
    )
  }
}

export default componentName
