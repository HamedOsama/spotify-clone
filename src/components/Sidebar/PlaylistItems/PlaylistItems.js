import React from 'react'
import { useSelector } from 'react-redux'

import style from './PlaylistItems.module.css'
import SidebarOption from '../SidebarOption'

function PlaylistItems() {
  const playlists = useSelector(state => state.app.playlists.items) || [];
  console.log(playlists)
  return (
    <div className={style.PlaylistItems}>
      {playlists.map(el => <SidebarOption key={el.id} title={el.name} />)}
    </div>
  )
}

export default PlaylistItems