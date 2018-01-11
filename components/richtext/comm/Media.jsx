import React from 'react'


const Media = (props) => {
  const key = props.block.getEntityAt(0)
  if (key) {
    const entity = props.contentState.getEntity(key)
    const { src } = entity.getData()
    if (entity.getType() === 'image') {
      return (
        <img
          src={src}
          alt=""
          aria-hidden
          style={{ whiteSpace: 'inherit', maxWidth: '50%' }}
          onClick={() => props.blockProps.onClick(src)}
          onKeyPress={() => props.blockProps.onClick(src)}
        />
      )
    }
  }
  return null
}

export default Media
