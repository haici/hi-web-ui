import React, { Component } from 'react'
import './Modal.less'

class Modal extends Component {
  render() {
    const { hasShow, text } = this.props
    return (
      <div
        className={`hi-de-function-modal ${hasShow ? 'hi-de-function-modal-show' : ''}`}
      >
        <div className="de-function-modal-content">
          {text}
        </div>
      </div>
    )
  }
}

export default Modal
