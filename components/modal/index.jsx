import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import cn from 'classnames'
import './index.less'

class Modal extends Component {
  constructor(props) {
    super(props)
    this.modalContainer = document.createElement('div')
    this.state = {
      localShowBase: false,
      localShowContent: false,
    }
  }
  componentDidMount() {
    document.body.appendChild(this.modalContainer)
    // this.handleModalShow(this.props.visible)
  }
  componentWillReceiveProps(nextProps) {
    this.handleModalShow(nextProps.visible)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.localShowBase !== this.state.localShowBase ||
      nextState.localShowContent !== this.state.localShowContent ||
      nextProps.hasLoading !== this.props.hasLoading
  }
  componentWillUnmount() {
    document.body.removeChild(this.modalContainer)
  }
  handleModalShow = (visible) => {
    if (visible !== this.state.localShowBase) {
      if (visible) { // open
        this.setState({ localShowBase: true })
        setTimeout(() => {
          this.setState({ localShowContent: true })
        })
      } else {
        // ...
        this.setState({ localShowContent: false })
        setTimeout(() => {
          this.setState({ localShowBase: false })
        }, 401)
      }
    }
  }
  render() {
    const {
      onCancel,
      onSubmit,
      children,
      hasLoading,
      cancelText = 'Cancel',
      submitText = 'Submit',
    } = this.props
    const {
      localShowBase,
      localShowContent,
    } = this.state
    if (!localShowBase) {
      return null
    }
    return ReactDOM.createPortal(
      <div
        className={cn(
          'hi-modal-root',
          { 'hi-modal-root-show': localShowContent },
        )}
      >
        <div
          className="modal-box"
        >
          <div
            className={cn(
              'modal-box-container',
              { 'modal-box-container-loading': hasLoading },
            )}
          >
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
              {children}
            </div>
            <div className="modal-bottom">
              <button
                className="btn btn-cancel"
                onClick={onCancel}
                aria-hidden
              >
                {cancelText}
              </button>
              <button
                className="btn btn-submit"
                onClick={onSubmit}
              >
                {submitText}
              </button>
            </div>
          </div>
          {
            hasLoading ? (
              <div className="modal-loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="#3ECEB6">
                  <path transform="translate(2)" d="M0 12 V20 H4 V12z">
                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0" keytimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline"  />
                  </path>
                  <path transform="translate(8)" d="M0 12 V20 H4 V12z">
                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.2" keytimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline"  />
                  </path>
                  <path transform="translate(14)" d="M0 12 V20 H4 V12z">
                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.4" keytimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                  </path>
                  <path transform="translate(20)" d="M0 12 V20 H4 V12z">
                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.6" keytimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                  </path>
                  <path transform="translate(26)" d="M0 12 V20 H4 V12z">
                    <animate attributeName="d" values="M0 12 V20 H4 V12z; M0 4 V28 H4 V4z; M0 12 V20 H4 V12z; M0 12 V20 H4 V12z" dur="1.2s" repeatCount="indefinite" begin="0.8" keytimes="0;.2;.5;1" keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.8 0.4 0.8" calcMode="spline" />
                  </path>
                </svg>
              </div>
            ) : null
          }
        </div>
        <div className="modal-back" />
      </div>,
      this.modalContainer,
    )
  }
}

export default Modal
