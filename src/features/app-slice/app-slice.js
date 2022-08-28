import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  playlists: [],
  playing: false,
  token: 'BQBQbD5pZ3_t6CWq7LmlhoVsFr_Ujxnn-oOf73oQnE-isvh8MCVbVF8zSwjbECouJ0nE8wD0QLFKiNxAslpt1scjZiJfq8CbNTYOpTBZmlwLm8GDqwJwj9_3GxI_35xmnBHDOXmD6bPG07x4kKYJfl5QsnC_C9iJgan7lG24a3Wu7r_iXGf1_tGo8EcAPQOzDeI9gCMfbFA2CtHJ',
  item: null
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
    },
    setPlaylist: (state, action) => {
      state.playlists = action.payload
    }
  }
})

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;