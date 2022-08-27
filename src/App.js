import React, { useEffect, useState } from 'react';
import Login from './components/Login/Login';
import { getTokenFromUrl } from './spotify/spotify';

function App() {
  const [token, setToken] = useState(null)
  useEffect(() => {
    const hash = getTokenFromUrl();
    const _token = hash.access_token;
    if (_token)
      setToken(_token)
    window.location.hash = ''
    console.log('I have token');
    console.log(_token)
  }, [setToken])
  return (
    <div className="App">
      {!token && <Login />}
      {/*Spotify logo*/}
      {/*Spotify logo*/}
    </div>
  );
}

export default App;
