import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import style from './Header.module.css';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';

function Header({ spotify }) {
  const searchRef = useRef(null);
  const user = useSelector(state => state.app.user)
  console.log(user)
  const focusSearchHandler = () => {
    searchRef.current.focus();
  }
  return (
    <div className={style.header}>
      <div className={style.header__left} onClick={focusSearchHandler}>
        <SearchIcon className={style.search__icon} />
        <input
          type="text"
          placeholder="Search for Artist , Songs"
          ref={searchRef}
        />
      </div>
      <div className={style.header__right}>
        <Avatar src={user?.images[0]?.url} alt="Hamed Osama" />
        <h4 className={style.user__name}>{user?.display_name}</h4>
      </div>
    </div>
  )
}

export default Header