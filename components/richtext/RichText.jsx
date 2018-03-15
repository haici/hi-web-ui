import React, { Component } from 'react'
import { Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from 'draft-js'
import { fromJS, is } from 'immutable'
import cn from 'classnames'
import request from 'rc-upload/lib/request'
import 'draft-js/dist/Draft.css'
import './index.less'

// import request from 'rc-upload/lib/request'


import EditorActions from './comm/EditorActions'
import Media from './comm/Media'
import Modal from './comm/Modal'
import ImageUpload from './comm/ImageUpload'

class Draft extends Component {
  state = {
    hasFocus: false,
    editorState: EditorState.createEmpty(),
    uploadConfig: fromJS({
      name: 'file', // --
      action: '',
    }),
    modal: fromJS({
      hasShow: false,
      text: '', // props
    }),
    imgList: [],
  }
  componentWillMount() {
    const { uploadConfig } = this.state
    const { name = 'file', action, defaultValue } = this.props
    this.setState({
      uploadConfig: uploadConfig.withMutations((newState) => {
        newState.set('name', name)
        newState.set('action', action)
      }),
    })
    this.localSetDefaultValue(defaultValue)
  }
  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.defaultValue) !== JSON.stringify(this.props.defaultValue)) {
      this.localSetDefaultValue(nextProps.defaultValue)
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !is(nextState.editorState, this.state.editorState) ||
      !is(nextState.modal, this.state.modal) ||
      nextProps.hasError !== this.props.hasError
  }
  componentWillUnmount() {
    const { modal } = this.state
    if (modal.get('tickNumber') > -1) {
      clearTimeout(modal.get('tickNumber')) // 清空提醒倒计时
    }
  }
  // 设置默认值
  localSetDefaultValue(defaultValue) {
    if (defaultValue && typeof defaultValue === 'object') {
      try {
        const newImgList = Object.keys(defaultValue.entityMap || {})
          .map(item => defaultValue.entityMap[item])
          .map(({ data }) => data.src)
        const editorState = EditorState.createWithContent(convertFromRaw(defaultValue))
        /*
          修复第一次默认数据没有正常正常onChange到上层bug
          屏蔽了原来这里直接添加进去 转而使用localOnchange 来更新默认数据到本地并更新到上层
          如果默认数据这里存在什么问题，可以尝试考虑次处逻辑
        */
        // this.setState({ editorState, imgList: newImgList })
        this.setState({ imgList: newImgList })
        this.localOnChange(editorState)
      } catch (e) {
        this.localOpenModal('默认值格式错误')
      }
    }
  }
  localOnChange = (editContent) => {
    const { onChange, formatData } = this.props
    this.setState({ editorState: editContent })
    if (typeof onChange === 'function') {
      /**
       * 判断是否没有内容
       */
      const contentData = convertToRaw(editContent.getCurrentContent())
      if (
        Object.keys(contentData.entityMap).length === 0 &&
        contentData.blocks.length === 1 &&
        contentData.blocks[0].text === ''
      ) {
        onChange('')
      } else if (typeof formatData === 'function') {
        onChange(formatData(contentData))
      } else {
        onChange(contentData)
      }
    }
  }
  localFocus = () => this.DOMEditor.focus()
  localToggleInlineStyle = (inlineStyle) => {
    if (inlineStyle === 'IMG') {
      this.DOMUploadImg.DOMInput.click()
    } else {
      this.localOnChange(RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ))
    }
  }
  localUploadImgStart = () => {
    this.localOpenModal('图片上传中，请稍等...', false)
  }
  localUploadProgress = () => {
    // 暂时没这个需求
  }
  localUploadSuccess = (res) => {
    const { onUploadSuccess } = this.props
    if (typeof onUploadSuccess === 'function') {
      const fileUrl = onUploadSuccess(res)
      const newImgList = new Array(...this.state.imgList)
      newImgList.push(fileUrl)
      this.localCloseModal()
      this.setState({ imgList: newImgList })
      this.localInsertImg(fileUrl)
    } else {
      this.localOpenModal('未指定图片上传回调函数')
    }
  }
  localUploadError = () => {
    this.localOpenModal('上传图片发错错误，请检查网络并重试。')
  }
  /**
   * 提醒控制器
   */
  localOpenModal = (text, autoClose = true) => {
    let tickNumber = -1
    if (autoClose) {
      tickNumber = setTimeout(this.localCloseModal, 3000)
    }
    const newModal = this.state.modal.withMutations((newState) => {
      newState.set('hasShow', true)
      newState.set('text', text)
      newState.set('tickNumber', tickNumber)
    })
    this.setState({ modal: newModal })
  }
  localCloseModal = () => {
    const { modal } = this.state
    this.setState({ modal: modal.set('hasShow', false).set('tickNumber', -1) })
  }
  /**
   * 插入图片
   */
  localInsertImg = (urlValue) => {
    const { editorState } = this.state
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'image',
      'IMMUTABLE',
      { src: urlValue },
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
    )
    this.setState({
      editorState: AtomicBlockUtils.insertAtomicBlock(
        newEditorState,
        entityKey,
        ' ',
      ),
    }, () => {
      setTimeout(() => this.localFocus(), 0)
    })
  }
  /**
   * 粘贴图片事件
   */
  localHandlePasteImg = (files = []) => {
    const { uploadConfig } = this.state
    const file = files[0]
    const reqData = {
      ...uploadConfig.toJS(),
      file,
      filename: uploadConfig.get('name'),
      onSuccess: this.localUploadSuccess,
      onError: this.localUploadError,
    }
    request(reqData)
    this.localUploadImgStart()
  }
  handleKeyCommand = (command, editorState) => {
    const content = editorState.getCurrentContent()
    const lastBlock = content.getLastBlock()
    const allBlock = content.getBlockMap()
    // 删除图片操作关联操作 BEGIN
    if (lastBlock.get('text') === '') {
      const keys = Object.keys(allBlock.toJS())
      const penult = keys[keys.length - 2]
      if (allBlock.getIn([penult, 'type']) === 'atomic') {
        const entity = content.getEntity(allBlock.getIn([penult]).getEntityAt(0))
        if (entity.get('type') === 'image') { // 删除的事图片文件，这里需要操作本地保存的图片文件集合
          const newImgList = this.state.imgList.filter(item => item !== entity.getData().src)
          this.setState({ imgList: newImgList })
        }
      }
    }
    // 删除图片操作关联操作 END
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.localOnChange(newState)
      return true
    }
    return false
  }
  localHandleWindowFocus = (b) => {
    this.setState({ hasFocus: b })
  }
  render() {
    const {
      uploadConfig, modal, imgList, hasFocus,
    } = this.state
    const { onClickImage, readOnly, hasError } = this.props
    function mediaBlockRenderer(block) {
      if (block.getType() === 'atomic') {
        return {
          component: Media,
          editable: false,
          props: {
            onClick: v => typeof onClickImage === 'function' && onClickImage(v, imgList),
          },
        }
      }
      return null
    }
    const rootClassName = cn(
      'hi-de-root',
      { 'hi-de-root-active': hasFocus },
      { 'hi-de-root-error': hasError },
    )
    return (
      <div
        className={rootClassName}
      >
        <EditorActions
          {...{
            actions: ['IMG', 'BOLD'],
            onToggle: this.localToggleInlineStyle,
            editorState: this.state.editorState,
            readOnly,
          }}
        />
        <div className="de-content">
          <Editor
            ref={(e) => { this.DOMEditor = e }}
            readOnly={readOnly}
            editorState={this.state.editorState}
            blockRendererFn={mediaBlockRenderer}
            handleKeyCommand={this.handleKeyCommand}
            handlePastedFiles={this.localHandlePasteImg}
            onChange={this.localOnChange}
            placeholder="来点描述..."
            onFocus={this.localHandleWindowFocus.bind(this, true)}
            onBlur={this.localHandleWindowFocus.bind(this, false)}
          />
        </div>
        <div className="de-bottom-function">
          <ImageUpload
            ref={(e) => { this.DOMUploadImg = e }}
            {...{
              ...uploadConfig.toJS(),
              onStart: this.localUploadImgStart,
              onSuccess: this.localUploadSuccess,
              onError: this.localUploadError,
            }}
          />
          <Modal
            {...modal.toJS()}
          />
        </div>
      </div>
    )
  }
}

export default Draft
