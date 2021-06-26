import spotify from "./spotify-logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import GetUserArtists from "./components/getUserArtists";

const client_id = ""; // YOUR APP CLIENT ID
const spotify_base_endpoint = `https://accounts.spotify.com/authorize`;
const redirect_uri = ""; //YOUR REDIRECT_URL
const scope = "user-top-read";

const getUserInfo = (hash) => {
  const [match, access_token, token_type, expires_in] = hash.match(
    /access_token=(\S+)&token_type=(\S+)&expires_in=(\S+)/
  );
  return { access_token, token_type, expires_in };
};

const App = () => {
  const [user, setData] = useState("");

  useEffect(() => {
    if (window.location.hash) {
      const userInfo = getUserInfo(window.location.hash);
      localStorage.clear();
      localStorage.setItem("access_token", userInfo.access_token);
      localStorage.setItem("token_type", userInfo.token_type);
      localStorage.setItem("expires_in", userInfo.expires_in);
      setData(userInfo.access_token);
    }
  }, []);

  const handleLogin = () => {
    window.location = `${spotify_base_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=token`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={spotify} className="spotifyLogo" alt="spotify" />
      </header>

      {user ? (
        <GetUserArtists />
      ) : (
        <div>
          <p className="text"> Descobre os artistas que mais ouves!</p>
          <button className="discover" onClick={handleLogin}>
            Descobrir
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
