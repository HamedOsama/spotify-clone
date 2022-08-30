import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import style from './PlaylistItems.module.css'
import SidebarOption from '../SidebarOption'
import { changeCurrentPlayListHandler } from '../../../features/app-slice/app-slice';

function PlaylistItems() {
  const dispatch = useDispatch();
  const playlists = useSelector(state => state.app.playlists.items) || [];
  const currentPlaylistID = useSelector(state => state.app.currentPlaylistId) || [];

  console.log(playlists)
  const setCurrentPlaylistHandler = (playlistID) => {
    if (currentPlaylistID === playlistID)
      return;
    dispatch(changeCurrentPlayListHandler(playlistID))
  }
  return (
    <div className={style.PlaylistItems}>
      {playlists.map(el => <SidebarOption onClickHandler={() => { setCurrentPlaylistHandler(el.id) }} id={el.id} key={el.id} title={el.name} />)}
    </div>
  )
}

export default PlaylistItems