import React from 'react'
import { millsToMinutesAndSeconds } from '../../lib/time'

import style from './SongRow.module.css'
function SongRow({ order, track }) {
  // console.log(track.album)
  return (
    <div className={style.songRow}>
      <div className={style.song__data}>
        <p className={style.order}>{order}</p>
        <img
          className={style.song__cover}
          src={track?.album?.images[0]?.url}
          alt="Song Cover"
        />
        <div className={style.songRow__info}>
          <h1 className={style.song__name}>{track.name}</h1>
          <p className={style.song__description}>
            {track?.artists?.map(el => el.name).join(', ')}
            {track.album.name}
          </p>
        </div>
      </div>
      <div className={style.song__album}>
        <p className={style.song__album__name}>{track.album.name}</p>
      </div>
      <p>{millsToMinutesAndSeconds(track.duration_ms)}</p>
    </div>
  )
}

export default SongRow