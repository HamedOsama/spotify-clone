import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import spotifyWebApi from 'spotify-web-api-js'

import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { getUser } from './features/app-slice/app-slice';
const spotify = new spotifyWebApi();

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.app.token)
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  return (
    <div className="App">
      {!token && <Login />}
      {token && <Main spotify={spotify} />}
    </div>
  );
}

export default App;
