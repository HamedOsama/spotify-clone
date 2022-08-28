import React from 'react'

import style from './SidebarOption.module.css'
function SidebarOption({ title, Icon }) {
  return (
    <div className={style.sidebarOption}>
      {Icon && <Icon className={style.sidebarOption__icon} />}
      {Icon ? <p>{title}</p> : <p className={style.playlist__item}>{title}</p>}
    </div>
  )
}

export default SidebarOption