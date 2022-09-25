import { createSlice } from "@reduxjs/toolkit";
import spotifyWebApi from 'spotify-web-api-js'
import { getTokenFromUrl } from "../../spotify/spotify";

export const spotify = new spotifyWebApi();

const initialState = {
  user: null,
  playlists: [],
  playing: false,
  token: window.localStorage.getItem('token') || '',
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
  return (dispatch) => {
    spotify.getPlaylist(playlistID).then(data => {
      dispatch(appSlice.actions.setCurrentPlaylist(data));
      dispatch(appSlice.actions.setCurrentPlaylistId(data.id))
    })
  }
}
// set auto logout time based on token given in response
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
    setTimeout(() => {
      dispatch(appSlice.actions.logout())
    }, logoutLatest)
  }
}
// get user's main data and initialize the app
export const getUser = () => {
  return (dispatch, getState) => {
    // get token from the local storage or url hash
    const tokenIsFound = getState().app.token;
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    let token = tokenIsFound ? tokenIsFound : _token;
    if (!token)
      return;
    // if token found in url delete all hash in it
    if (_token) {
      dispatch(appSlice.actions.setToken(_token));
      window.location.hash = '';
    }
    // set user's token
    spotify.setAccessToken(token)
    // set initial playlist that given statically in app if user does not have playlists
    dispatch(changeCurrentPlayListHandler(getState().app.currentPlaylistId))
    //get user's data
    spotify.getMe().then(user => {
      dispatch(appSlice.actions.setUser(user))
    })
    // get user's playlists
    spotify.getUserPlaylists().then(data => {
      dispatch(appSlice.actions.setPlaylist(data))
    })
    // setLogout 
    dispatch(setLogoutTime())
  }
}
// get current playing song
export const getMyCurrentPlaying = () => {
  return async (dispatch, getState) => {
    if (!getState().app.token) // if no token found break the function
      return;
    spotify.setAccessToken(getState().app.token)
    const req = await spotify.getMyCurrentPlayingTrack();
    if (!req) // if no track playing break the function
      return;
    dispatch(appSlice.actions.setIsPlaying(req.is_playing));
    dispatch(appSlice.actions.setCurrentPlayingId(req.item.id))
    if (!getState().app.currentPlaying) {
      dispatch(appSlice.actions.setCurrentPlaying(req.item))
    }
    // if id of current playing song changed change the current playing song data in global state
    if (getState().app.currentPlaying &&
      req.item.uri !== getState().app.currentPlaying.uri
    ) {
      dispatch(appSlice.actions.setCurrentPlaying(req.item))
    }
    // set timeout to load next track Dynamically
    if (getState().app.playing) {
      setTimeout(() => {
        dispatch(getMyCurrentPlaying());
      }, req.item.duration_ms - req.progress_ms)
    }
  }
}
// play or pause current track
export const playPauseHandler = () => {
  return async (dispatch, getState) => {
    if (!getState().app.currentPlaying)
      return;
    const isPlaying = getState().app.playing;
    isPlaying ? await spotify.pause() : await spotify.play();
    dispatch(appSlice.actions.setIsPlaying(!isPlaying));
  }
}
// increase or decrease the volume
export const setVolume = (volume) => {
  return (_, getState) => {
    if (!getState().app.currentPlaying)
      return;
    spotify.setVolume(volume);
  }
}
// play song if there is/are song(s) after it put in queue
export const playSong = (songID) => {
  return async (dispatch) => {
    await spotify.play({ uris: [...songID] })
    setTimeout(() => {
      dispatch(getMyCurrentPlaying())
    }, 1500)
  }
}

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;