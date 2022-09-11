import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { playSong } from '../../features/app-slice/app-slice';
import { millsToMinutesAndSeconds } from '../../lib/time'

import style from './SongRow.module.css'
function SongRow({ order, track, allTracks }) {
  const dispatch = useDispatch();

  const { currentPlayingId, playing } = useSelector(state => state.app)
  const playSongHandler = () => {
    const trackId = allTracks.findIndex(el => el.track.id === track.id)
    const reminderTracks = allTracks.slice(trackId)
    const reminderTracksUris = reminderTracks.map(el => el.track.uri)
    dispatch(playSong(reminderTracksUris))
  }

  // isPlaying or no 
  let orderOrPlaying = <p className={style.order}>{order}</p>;
  // if (!currentPlayingId)
  // orderOrPlaying = <p className={style.order}>{order}</p>
  if (currentPlayingId === track.id && playing)
    orderOrPlaying = <img className="n5XwsUqagSoVk8oMiw1x" width="14" height="14" alt="" src="	https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" />
  if (currentPlayingId === track.id && !playing)
    orderOrPlaying = <img className="n5XwsUqagSoVk8oMiw1x" width="14" height="14" alt="" src="https://open.spotifycdn.com/cdn/images/equaliser-green.1184ed87.svg"></img>
  return (
    <div className={style.songRow} onClick={playSongHandler}>
      <div className={style.song__data}>
        {/* {currentPlayingId === track.id ?
          <img class="n5XwsUqagSoVk8oMiw1x" width="14" height="14" alt="" src="	https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" />
          : <p className={style.order}>{order}</p>} */}
        {orderOrPlaying}
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
      <p className={style.song__time}>{millsToMinutesAndSeconds(track.duration_ms)}</p>
    </div>
  )
}

export default SongRow