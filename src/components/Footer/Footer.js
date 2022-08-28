import React from 'react'

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
function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.footer__left}>
        <p>Album and song details</p>
      </div>
      <div className={style.footer__middle}>
        <Button className="green"><ShuffleIcon className={`${style.icon} ${style.control__icon}`} /></Button>
        <Button><SkipPreviousIcon className={`${style.icon} ${style.control__icon}`} /></Button>
        <Button><PlayCircleOutlineIcon fontSize='large' className={`${style.icon} ${style.control__icon}`} /></Button>
        <Button><SkipNextIcon className={`${style.icon} ${style.control__icon}`} /></Button>
        <Button className="green"><RepeatIcon className={`${style.icon} ${style.control__icon}`} /></Button>
      </div>
      <div className={style.footer__right}>
        <Button><LyricsIcon className={`${style.icon}`} /></Button>
        <Button><PlaylistPlayIcon className={`${style.icon}`} /></Button>
        <Button ><VolumeDownIcon className={`${style.icon}`} /></Button>
        <Slider className={`${style.icon}`} />
        {/* <PlaylistPlayIcon /> */}

      </div>
    </div>
  )
}

export default Footer