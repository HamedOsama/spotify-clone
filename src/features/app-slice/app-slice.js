import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  playlists: [],
  playing: false,
  token: "BQDsOq0eDqRQXciwgsPEpGbJYHgPEFBCvh3p0DDm2EMbIp_wKZ7FZFXdzG6Vtu8IKPF5A37WAoeQ6u2I3gH8yLhQp2EdSJUx0V2yV1pODTXf_hPv5uBzrtRN2_xrMgebVmCt2FdFLUklr9FjI-M4y0QSk1GdthcCUG5DUypP8uSqnt1uAGF8AJpMmWvTvHJx1W3GjvVh2GDYZnzC8JaL",
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
    }
  }
})

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;