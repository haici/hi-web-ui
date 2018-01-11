import React, { Component } from 'react'
import './index.less'

class Modal extends Component {
  render() {
    const { hasShow = false } = this.props
    if (!hasShow) {
      return null
    }
    return (
      <div className="hi-modal-root">
        Modal
      </div>
    )
  }
}

export default Modal
