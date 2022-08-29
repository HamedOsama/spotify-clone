import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spotifyWebApi from 'spotify-web-api-js'

import Login from './components/Login/Login';
import Main from './components/Main/Main';
// import { getTokenFromUrl } from './spotify/spotify';
import { appActions } from './features/app-slice/app-slice';

const spotify = new spotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.app.token)
  // console.log(token);
  // const [token, setToken] = useState(null)
  useEffect(() => {
    // const hash = getTokenFromUrl();
    // const _token = hash.access_token;
    if (token) {
      // setToken(_token)
      spotify.setAccessToken(token)
      // dispatch(appActions.setToken(token))
      spotify.getMe().then(user => {
        console.log(user)
        dispatch(appActions.setUser(user))
      })
      spotify.getUserPlaylists().then(data => {
        dispatch(appActions.setPlaylist(data))
      })
      spotify.getPlaylist('37i9dQZF1DX5cO1uP1XC1g').then(data => {
        dispatch(appActions.setDiscoverWeekly(data));
      })
    }
    // window.location.hash = ''
    // console.log('I have token');
    console.log(token)
  }, [dispatch, token])
  return (
    <div className="App">
      {!token && <Login />}
      {token && <Main spotify={spotify} />}
      {/*Spotify logo*/}
      {/*Spotify logo*/}
    </div>
  );
}

export default App;
