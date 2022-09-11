import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spotifyWebApi from 'spotify-web-api-js'

import Login from './components/Login/Login';
import Main from './components/Main/Main';
// import { getTokenFromUrl } from './spotify/spotify';
// import { appActions } from './features/app-slice/app-slice';
import { getUser } from './features/app-slice/app-slice';
const spotify = new spotifyWebApi();

function App() {
  const dispatch = useDispatch();
  // const spotify = useSelector(state=>state)
  const token = useSelector(state => state.app.token)
  // console.log(token);
  // const [token, setToken] = useState(null)
  useEffect(() => {
    // const hash = getTokenFromUrl();
    // const _token = hash.access_token;
    // if (_token)
    // dispatch(appActions.setToken(_token))
    // if (token) {
    console.log(1)

    dispatch(getUser())
    // setToken(_token)
    // spotify.setAccessToken(token)
    // spotify.getMe().then(user => {
    // console.log(user)
    // dispatch(appActions.setUser(user))
    // })
    // spotify.getUser('31enrjthtvft4jae46jhesjosbra').then(data => console.log(data))
    // spotify.getUserPlaylists().then(data => {
    //   dispatch(appActions.setPlaylist(data))
    //   // console.log(data)
    // })
    // spotify.getPlaylist('6Fguh6kio7Vh146tVlGmFS').then(data => {
    //   dispatch(appActions.setCurrentPlaylist(data));
    // })
    // spotify.getPlaylistTracks('6Fguh6kio7Vh146tVlGmFS').then(data => console.log(data))
    // spotify.play({
    //   uris: ['spotify:track:3JFB9ZJ8vZrKL8AJiRspLZ']
    // })
    // spotify.getMyDevices().then(data => console.log(data))
    // spotify.play('1mkqWVlcMGpjUw2dEcbwdo')
    // spotify.setVolume(100,spotify.dev)
    // spotify
    // }
    // console.log('I have token');
    // console.log(token)
  }, [dispatch])
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
