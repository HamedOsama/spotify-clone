import React from 'react'

import style from './SongRow.module.css'
function SongRow({ track }) {
  console.log(track.album)
  return (
    <div className={style.songRow}>
      <img
        className={style.song__cover}
        src={track?.album?.images[0]?.url}
        alt="Song Cover" />
      <div className={style.songRow__info}>
        <h1 className={style.song__name}>{track.name}</h1>
        <p className={style.song__description}>
          {track?.artists?.map(el => el.name).join(', ')}
          {track.album.name}
        </p>
      </div>
    </div>
  )
}

export default SongRow