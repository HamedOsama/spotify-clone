import React from 'react'

import { loginUrl } from '../../spotify/spotify'

import style from './Login.module.css'
function Login() {
  return (
    <div className={style.login}>
      <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt="logo" />
      <button className={style.btn}><a href={loginUrl}>Login</a></button>
      {/*Spotify logo*/}
      {/*Login with spotify button*/}
    </div>
  )
}

export default Login