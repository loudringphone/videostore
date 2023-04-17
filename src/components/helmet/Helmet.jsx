import React from 'react'

export const Helmet = (props) => {

    document.title = 'Video Store | ' + props.title
  return (
    <div>{props.children}</div>
  )
}
