import React from 'react'

export const Helmet = (props) => {

    document.title = props.title + ' - Video Store'
  return (
    <div>{props.children}</div>
  )
}
