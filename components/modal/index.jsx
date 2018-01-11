import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import './index.less'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.modalContainer = document.createElement('div')
    this.state = {
      localHasShow: false,
    }
  }
  componentDidMount() {
    document.body.appendChild(this.modalContainer)
    // this.handleModalShow(this.props.hasShow)
  }
  componentDidUpdate() {
    this.handleModalShow(this.props.hasShow)
  }
  componentWillUnmount() {
    document.body.removeChild(this.modalContainer)
  }
  handleModalShow = (hasShow) => {
    console.log('handleModalShow', hasShow, this.state.localHasShow)
    if (hasShow !== this.state.localHasShow) {
      this.setState({ localHasShow: hasShow })
    }
  }
  render() {
    const {
      onCancel,
      hasShow,
    } = this.props
    const {
      localHasShow,
    } = this.state
    if (!hasShow) {
      return null
    }
    console.log('render', hasShow, localHasShow)
    return ReactDOM.createPortal(
      <div
        className={cn('hi-modal-root', { 'hi-modal-root-show': localHasShow })}
      >
        <div className="modal-box">
          <div className="modal-title">
            <span>标题</span>
            <span
              className="modal-title-close"
              onClick={onCancel}
              aria-hidden
            >
              <i className="iconfont icon-cha" />
            </span>
          </div>
          <div className="modal-content">
            内容
          </div>
          <div className="modal-bottom">
            <button
              className="btn btn-cancel"
              onClick={onCancel}
              aria-hidden
            >
              Cancel
            </button>
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
