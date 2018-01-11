import React, { Component } from 'react'
import StyleButton from './StyleButton'
import './EditorActions.less'

const ACTIONS = {
  BOLD: {
    style: 'BOLD',
    label: '',
    labelIcon: 'iconfont icon-B',
    type: 'inline',
  },
  IMG: {
    style: 'IMG',
    label: '',
    labelIcon: 'iconfont icon-tupian',
    inline: 'function',
  },
}

class EditorActions extends Component {
  componentWillMount() {
    const { actions = [] } = this.props
    const actionList = actions.filter(item => ACTIONS[item])
    this.setState(state => ({ ...state, actionList }))
  }
  localHasActive = (item) => {
    const { editorState } = this.props
    if (item.type === 'inline') {
      const currentStyle = editorState.getCurrentInlineStyle()
      return currentStyle.has(item.style)
    }
    return false
  }
  render() {
    const { onToggle, readOnly } = this.props
    const { actionList } = this.state
    if (readOnly) {
      return null
    }
    return (
      <div className="hi-de-actions-root">
        {actionList.map(item => (
          <StyleButton
            {...{
              key: item,
              ...ACTIONS[item],
              onToggle,
              active: this.localHasActive(ACTIONS[item]),
            }}
          />
        ))}
      </div>
    )
  }
}

export default EditorActions
