import React, { Component } from 'react'
import cn from 'classnames'
import './index.less'


class Dropdown extends Component {
  state = {
    hasShowMenu: false,
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps.menuData) !== JSON.stringify(this.props.menuData) ||
    nextState.hasShowMenu !== this.state.hasShowMenu
  }
  localMouseOver = () => {
    this.setState({ hasShowMenu: true })
  }
  localMouseOut = () => {
    this.setState({ hasShowMenu: false })
  }
  render() {
    const { hasShowMenu } = this.state
    const { menuData = [], onClick } = this.props
    const hasShowMore = menuData.length > 2
    const menuHTML = []
    for (let i = 0; i < (hasShowMore ? 2 : menuData.length); i += 1) {
      menuHTML.push((
        <button
          className="dropdown-btn"
          key={i}
          onClick={() => typeof onClick === 'function' && onClick(menuData[i].key)}
        >
          {menuData[i].text || ''}
        </button>
      ))
    }
    const menuMoreHTML = []
    if (hasShowMore) {
      for (let i = 2; i < menuData.length; i += 1) {
        menuMoreHTML.push((
          <div
            className="dropdown-item"
            onClick={() => typeof onClick === 'function' && onClick(menuData[i].key)}
            key={i}
            aria-hidden
          >
            {menuData[i].text || ''}
          </div>
        ))
      }
    }
    return (
      <div className="hi-dropdown-root">
        <div className="dropdown-btns">
          {menuHTML}
          {
            hasShowMore ? (
              <button
                className="dropdown-btn dropdown-btn-action"
                onMouseOver={this.localMouseOver}
                onFocus={this.localMouseOver}
                onMouseOut={this.localMouseOut}
                onBlur={this.localMouseOut}
              >
                <span>
                  <i className="iconfont icon-jiantou" />
                </span>
                <div
                  className={cn('dropdown-items', { 'dropdown-items-active': hasShowMenu })}
                >
                  {menuMoreHTML}
                </div>
              </button>
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default Dropdown
