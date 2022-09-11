import { createSlice } from "@reduxjs/toolkit";
import spotifyWebApi from 'spotify-web-api-js'
import { getTokenFromUrl } from "../../spotify/spotify";

export const spotify = new spotifyWebApi();

const initialState = {
  user: null,
  playlists: [],
  playing: false,
  token: window.localStorage.getItem('token') || '',
  item: null,
  currentPlaylist: null,
  currentPlaylistId: '37i9dQZF1DWZyonhntyFxW', // default playlist shown
  currentPlaying: null,
  currentPlayingId: null,
  volume: 50,
  // currentPlaylistId: '6Fguh6kio7Vh146tVlGmFS',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      window.localStorage.setItem('token', action.payload);
    },
    setPlaylist: (state, action) => {
      state.playlists = action.payload
    },
    setCurrentPlaylist: (state, action) => {
      state.currentPlaylist = action.payload
    },
    setCurrentPlaylistId: (state, action) => {
      state.currentPlaylistId = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.playing = action.payload;
    },
    setCurrentPlaying: (state, action) => {
      state.currentPlaying = action.payload;
    },
    setCurrentPlayingId: (state, action) => {
      state.currentPlayingId = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    logout: (state) => {
      state.token = ''
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('logoutTime')
    }
  }
})





// change the current playlist and content displayed
export const changeCurrentPlayListHandler = (playlistID) => {
  return (dispatch, getState) => {
    spotify.getPlaylist(playlistID).then(data => {
      dispatch(appSlice.actions.setCurrentPlaylist(data));
      dispatch(appSlice.actions.setCurrentPlaylistId(data.id))
    })
  }
}

export const setLogoutTime = () => {
  return dispatch => {

    let logoutTime = window.localStorage.logoutTime;
    const checkDate = new Date(logoutTime) - Date.now()
    if (checkDate < 300000)
      logoutTime = null;
    if (!logoutTime) {
      const newLogoutTime = new Date(Date.now() + 3600000).toISOString();
      window.localStorage.setItem('logoutTime', newLogoutTime)
      logoutTime = newLogoutTime;
    }
    const logoutLatest = new Date(logoutTime) - Date.now()
    console.log(logoutLatest);
    setTimeout(() => {
      dispatch(appSlice.actions.logout())
    }, logoutLatest)
  }
}

export const getUser = () => {
  return (dispatch, getState) => {
    // const to = appSlice.getInitialState.token
    // dispatch(appSlice.actions.getCurrentToken())
    const tokenIsFound = getState().app.token;
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    let token = tokenIsFound ? tokenIsFound : _token
    if (!token)
      return;
    if (_token) {
      dispatch(appSlice.actions.setToken(_token));
      window.location.hash = '';
    }
    // set token
    spotify.setAccessToken(token)
    // dispatch(appSlice.actions.setToken(token))
    //get user data
    spotify.getMe().then(user => {
      dispatch(appSlice.actions.setUser(user))
      console.log(user)
    })
    // console.log(getState().app.user)
    spotify.getUserPlaylists().then(data => {
      dispatch(appSlice.actions.setPlaylist(data))
      console.log(data)
    })
    // spotify.getMyDevices().then(data => console.log(data))
    // spotify.play({
    //   uris: ['spotify:track:3JFB9ZJ8vZrKL8AJiRspLZ']
    // })

    dispatch(changeCurrentPlayListHandler(getState().app.currentPlaylistId))
    // spotify.getPlaylist(getState.app.currentPlaylistId).then(data => {
    //   dispatch(appSlice.actions.setCurrentPlaylist(data));
    // })

    // setLogout 
    dispatch(setLogoutTime())
  }
}
export const getMyCurrentPlaying = () => {
  return async (dispatch, getState) => {
    console.log(getState().app.token)
    if (!getState().app.token)
      return;
    spotify.setAccessToken(getState().app.token)
    const req = await spotify.getMyCurrentPlayingTrack();
    if (!req)
      return;
    dispatch(appSlice.actions.setIsPlaying(req.is_playing));
    dispatch(appSlice.actions.setCurrentPlayingId(req.item.id))
    if (!getState().app.currentPlaying) {
      dispatch(appSlice.actions.setCurrentPlaying(req.item))
    }
    // console.log(req.item.name)
    // console.log(getState().app.currentPlaying.name)
    if (getState().app.currentPlaying &&
      req.item.uri !== getState().app.currentPlaying.uri
    ) {
      dispatch(appSlice.actions.setCurrentPlaying(req.item))
      // console.log('done')
    }
    // console.log(req.item.duration_ms - req.progress_ms)
    // console.log(req.item.duration_ms)
    // console.log(req.progress_ms)
    if (getState().app.playing) {
      setTimeout(() => {
        console.log(1)
        dispatch(getMyCurrentPlaying());
      }, req.item.duration_ms - req.progress_ms)
    }
    console.log(req)
    // return
    // }
    // console.log(req.item.uri)
    // console.log(getState().app.currentPlaying.uri)
    // if (req.item.uri !== getState().app.currentPlaying.uri) {
    // dispatch(appSlice.actions.setCurrentPlaying(req.item))
    // console.log(req);
    // }
  }
}

// play or pause current track
export const playPauseHandler = () => {
  return async (dispatch, getState) => {
    if (!getState().app.currentPlaying)
      return;
    const isPlaying = getState().app.playing;
    if (isPlaying) {
      await spotify.pause();
      dispatch(appSlice.actions.setIsPlaying(false));
    }
    else {
      await spotify.play();
      dispatch(appSlice.actions.setIsPlaying(true));
    }
  }
}

// increase or decrease the volume
export const setVolume = (volume) => {
  return (_, getState) => {
    if (!getState().app.currentPlaying)
      return;
    // dispatch(appSlice.actions.setVolume(volume))
    spotify.setVolume(volume);
    console.log(volume)
  }
}

// play song if there is/are song(s) after it put in queue
export const playSong = (songID) => {
  return async (dispatch) => {
    await spotify.play({ uris: [...songID] })
    // spotify.getMyCurrentPlayingTrack().then(data => console.log(data))
    setTimeout(() => {
      dispatch(getMyCurrentPlaying())
    }, 500)
  }
}

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;