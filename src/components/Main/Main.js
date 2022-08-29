import React from 'react'

import style from './Main.module.css'
import Body from '../Body/Body'
import Sidebar from '../Sidebar/Sidebar'
import Footer from '../Footer/Footer'

function Main({ spotify }) {
  return (
    <div className={style.main}>
      <Sidebar />
      <Body spotify={spotify} />
      <Footer />
    </div>
  )
}

export default Main