import React from 'react'

import style from './Button.module.css'
function Button(props) {
  const classes = `${style.btn} ${props.className === 'green' ? style.btn__green : ''}`
  return (
    <button className={classes} type='button'>
      {props.children}
    </button>
  )
}

export default Button