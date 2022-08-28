import React from 'react'

import { spotifyBanner } from '../../images/spotify-banner'
import style from './Sidebar.module.css'
import SidebarOption from './SidebarOption'

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PlaylistItems from './PlaylistItems/PlaylistItems';

function Sidebar() {
  return (
    <div className={style.sidebar}>
      <div className={style.sidebar__logo}>
        {spotifyBanner}
      </div>
      <div className="sidebar__options">
        <SidebarOption title="Home" Icon={HomeIcon} />
        <SidebarOption title="Search" Icon={SearchIcon} />
        <SidebarOption title="Your Library" Icon={LibraryMusicIcon} />
      </div>
      <div className={style.playlist}>
        <strong className={style.playlist__title}>Playlist</strong>
        <PlaylistItems />
        {/* <div className={style.playlist__items}>
          <SidebarOption title="Rock" />
          <SidebarOption title="Hip Hop" />
        </div> */}
      </div>
      {/* <img src={spotifyBanner} alt="" /> */}
      {/* <img src="https://getheavy.com/wp-contnet/uploads/2019/12/spotify2019-830x350.jpg" alt="" /> */}
    </div>
  )
}

export default Sidebar