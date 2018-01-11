import React, { Component } from 'react'
import './StyleButton.less'

class StyleButton extends Component {
  localOnToggle = (e) => {
    e.preventDefault()
    this.props.onToggle(this.props.style)
  }
  render() {
    const { label, labelIcon, active } = this.props
    if (label) { // 字母模式
      return (
        <span
          onMouseDown={this.localOnToggle}
          tabIndex="0"
          role="button"
        >
          {label}
        </span>
      )
    } else if (labelIcon) { // icon模式
      return (
        <span
          onMouseDown={this.localOnToggle}
          tabIndex="0"
          role="button"
          className={`hi-be-actions-bi ${active ? 'hi-be-actions-bi-active' : ''}`}
        >
          <i className={labelIcon} />
        </span>
      )
    }
    return null
  }
}

export default StyleButton
