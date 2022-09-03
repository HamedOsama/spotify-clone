import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appActions } from '../../features/app-slice/app-slice';

import style from './Header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Avatar } from '@mui/material';

function Header({ spotify }) {
  // const searchRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.app)
  const [settingsIsOpened, setSettingsIsOpened] = useState(false);
  const openSettingsHandler = () => {
    setSettingsIsOpened(prev => !prev);
  }
  const logoutHandler = () => {
    dispatch(appActions.logout())
  }
  // console.log(user)
  // const focusSearchHandler = () => {
  //   searchRef.current.focus();
  // }
  return (
    <div className={style.header}>
      {/* <div className={style.header__left} onClick={focusSearchHandler}>
        <SearchIcon className={style.search__icon} />
        <input
          type="text"
          placeholder="Search for Artist , Songs"
          ref={searchRef}
        />
      </div> */}
      <div className={style.header__right}>
        <div className={style.user} onClick={openSettingsHandler}>
          <Avatar className={style.user__avatar} src={user?.images[0]?.url} alt="Hamed Osama" />
          <h4 className={style.user__name}>{user?.display_name}</h4>
          <KeyboardArrowDownRoundedIcon className={style.arrow__icon} />
        </div>
        {settingsIsOpened &&
          <div className={style.settings}>
            <a className={style.menu__btn}
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.spotify.com/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account">
              Account
              <OpenInNewIcon />
            </a>
            <a className={style.menu__btn}
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.spotify.com/">
              Support
              <OpenInNewIcon />
            </a>
            <a className={style.menu__btn}
              href="https://spotify.com/download"
              target="_blank"
              rel="noopener noreferrer">
              Download
              <OpenInNewIcon />
            </a>
            <button className={style.menu__btn} onClick={logoutHandler}><span className={style.menu__data}>Log out</span></button>
          </div>
        }
      </div>
    </div>
  )
}

export default Header