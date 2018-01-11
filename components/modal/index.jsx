import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.less'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.modalContainer = document.createElement('div')
  }
  componentDidMount() {
    document.body.appendChild(this.modalContainer)
  }
  componentWillUnmount() {
    document.body.removeChild(this.modalContainer)
  }
  render() {
    const { hasShow = false } = this.props
    if (!hasShow) {
      return null
    }
    return ReactDOM.createPortal(
      <div className="hi-modal-root">
        <div className="modal-box">
          <div className="modal-title">
            <span>标题</span>
            <span className="modal-title-close">
              <i className="iconfont icon-cha" />
            </span>
          </div>
          <div className="modal-content">
            内容
          </div>
          <div className="modal-bottom">
            <button className="btn btn-cancel" >Cancel</button>
            <button className="btn btn-submit">OK</button>
          </div>
        </div>
        <div className="modal-back" />
      </div>,
      this.modalContainer,
    )
  }
}

export default Modal
