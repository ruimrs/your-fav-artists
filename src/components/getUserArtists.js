import axios from "axios";
import { useState } from "react";
import "./getUserArtists.css";

const request_url =
  "https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=10&offset=5";

const GetUserArtists = () => {
  const [data, setData] = useState({});
  const handleGetArtistis = () => {
    axios
      .get(request_url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <p className="header">os teus 10 mais ouvidos</p>

      <div className="main-wrapper">
        {data?.items ? (
          data.items.map((artist) => (
            <div className="wrapper" key={artist.id}>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="image"
                  src={artist.images[0].url}
                  alt={artist.name}
                />
              </a>

              <p className="name">{artist.name}</p>
            </div>
          ))
        ) : (
          <button className="discover" onClick={handleGetArtistis}>
            Ver
          </button>
        )}
      </div>
    </>
  );
};

export default GetUserArtists;
