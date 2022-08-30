import React from 'react'

import style from './SidebarOption.module.css'
function SidebarOption({ title, Icon, onClickHandler }) {
  return (
    <div onClick={onClickHandler ? onClickHandler : null} className={style.sidebarOption}>
      {Icon && <Icon className={style.sidebarOption__icon} />}
      {Icon ? <p>{title}</p> : <p className={style.playlist__item}>{title}</p>}
    </div>
  )
}

export default SidebarOption