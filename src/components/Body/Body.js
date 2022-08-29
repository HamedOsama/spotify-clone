import React from 'react'
import { useSelector } from 'react-redux'

import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Header from '../Header/Header'
import style from './Body.module.css'
import SongRow from '../SongRow/SongRow';

function Body({ spotify }) {
  const discoverWeekly = useSelector(state => state.app.discoverWeekly);
  return (
    <div className={style.body}>
      <Header />
      <div className={style.body__info}>
        <img className={style.main_img} src="https://newjams-images.scdn.co/v2/discover-weekly/CaXPDsFNRgciLh_Rj6Ekw-FhR31ktQLsQ3x2EpleEeA6sQ5Vd_NjwD3l2SJzIHdZdYTHDtooFpVDrH1XHu-7wACYJc-qSvVQZ0DHYGHGj_A=/NTU6NzI6MjFUMTMtMDEtMA==/default" alt="Discover Weekly" />
        <div className={style.body__infoText}>
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discoverWeekly?.description?.split('.')[0]}</p>
        </div>
      </div>

      <div className={style.body__songs}>
        <div className={style.body__icons}>
          <PlayCircleFilledIcon className={style.play__btn} />
          <FavoriteIcon />
          <MoreHorizIcon />
        </div>
      </div>
      <div className={style.songs__container}>
        {discoverWeekly?.tracks?.items?.map(el =>
          <SongRow key={el.track.id} track={el.track} />
        )}
      </div>
    </div>
  )
}

export default Body