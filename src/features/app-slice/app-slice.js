import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  playlists: [],
  playing: false,
  token: 'BQC2rWtOksoKb8cvv0q-4-g96zOBpfKzas66U8UmSobwDQa1Tk3RuQZ9Iiv08ft7nt7VjWC0D4zEVYh2--pLFvthgiAxZifhb-ByrnnT2uZ3ozaZytX-ft8HLiI-KZBKcDIz8_8YdRkUhWjiXkRKCaeQ0553mPQ3xDgywdqMeoaMTnVE--2bhCDib9d0VK7KENxKBIwXD3Za5Q6o',
  item: null,
  discoverWeekly: null,
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
    },
    setDiscoverWeekly: (state, action) => {
      state.discoverWeekly = action.payload
    }
  }
})

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;