import React from 'react'

import style from './Main.module.css'
import Body from '../Body/Body'
import Sidebar from '../Sidebar/Sidebar'

function Main() {
  return (
    <div className={style.main}>
      <Sidebar />
      <Body />
    </div>
  )
}

export default Main