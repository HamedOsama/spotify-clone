export const authEndpoint =
  'https://accounts.spotify.com/authorize';

// const redirectUrl = 'https://spotify-clone-tau-one.vercel.app/';
const redirectUrl = 'http://localhost:3000';
const clientId = '516b57c12fa4487da6fcd4e46ab1b88f';

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-private",
  "app-remote-control"
]

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((acc, cur) => {
      let parts = cur.split('=');
      acc[parts[0]] = decodeURIComponent(parts[1]);
      return acc;
    }, {})
    ;
}

export const loginUrl =
  `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`