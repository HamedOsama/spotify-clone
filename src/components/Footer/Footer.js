import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../features/app-slice/app-slice';

import style from './Footer.module.css'
import Button from '../UI/Button';
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import LyricsIcon from '@mui/icons-material/Lyrics';
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { Slider } from '@mui/material'

import { getMyCurrentPlaying, playPauseHandler, setVolume } from '../../features/app-slice/app-slice';
function Footer() {
  const dispatch = useDispatch();
  const { playing, currentPlaying, volume } = useSelector(state => state.app)

  useEffect(() => {
    dispatch(getMyCurrentPlaying());
  }, [dispatch, playing, currentPlaying])

  useEffect(() => {
    const event = setTimeout(() => {
      dispatch(setVolume(volume))
    }, 500);
    return () => {
      if (event)
        clearTimeout(event)
    }
  }, [dispatch, volume])

  const onPlayPauseHandler = () => {
    dispatch(playPauseHandler());
  }
  return (
    <div className={style.footer}>
      <div className={style.footer__left}>
        {currentPlaying &&
          <Fragment>
            <img src={currentPlaying?.album?.images[0]?.url} alt="" />
            <div className={style.song__info}>
              <h5 className={style.song__name}>{currentPlaying?.name}</h5>
              <p className={style.song__artist}>{currentPlaying?.artists?.map(el => el.name).join(', ')}</p>
            </div>
          </Fragment>
        }
      </div>
      <div className={style.footer__middle}>
        <Button className="green"><ShuffleIcon className={`${style.icon} ${style.control__icon}`} /></Button>
        <Button><SkipPreviousIcon className={`${style.icon} ${style.control__icon}`} /></Button>
        {!playing && <Button className="play__btn"><PlayCircleOutlineIcon fontSize='large' className={`${style.icon} ${style.control__icon}`} onClick={onPlayPauseHandler} /></Button>}
        {playing && <Button className="play__btn"><PauseCircleOutlineIcon fontSize='large' className={`${style.icon} ${style.control__icon}`} onClick={onPlayPauseHandler} /></Button>}
        <Button><SkipNextIcon className={`${style.icon} ${style.control__icon}`} /></Button>
        <Button className="green"><RepeatIcon className={`${style.icon} ${style.control__icon}`} /></Button>
      </div>
      <div className={style.footer__right}>
        <Button><LyricsIcon className={`${style.icon}`} /></Button>
        <Button><PlaylistPlayIcon className={`${style.icon}`} /></Button>
        <Button ><VolumeDownIcon className={`${style.icon}`} /></Button>
        <Slider className={`${style.icon} ${style.slider}`} defaultValue={50} min={0} max={100} onChange={e => dispatch(appActions.setVolume(e.target.value))} />
        {/* <PlaylistPlayIcon /> */}

      </div>
    </div>
  )
}

export default Footer