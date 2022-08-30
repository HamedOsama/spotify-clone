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
  // currentPlaylistId: '6Fguh6kio7Vh146tVlGmFS',
  currentPlaylistId: '37i9dQZF1DZ06evO4hUkVi'
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
    }
  }
})






export const changeCurrentPlayListHandler = (playlistID) => {
  return (dispatch, getState) => {
    spotify.getPlaylist(playlistID).then(data => {
      dispatch(appSlice.actions.setCurrentPlaylist(data));
      dispatch(appSlice.actions.setCurrentPlaylistId(data.id))
    })
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
  }
}



export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;