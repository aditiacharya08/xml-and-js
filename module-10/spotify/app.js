const clientId = `4ea99674e804477093593f5b8dbbf8d9`;
const clientSecret = `3a58446f83a64f1491fe4e713f1a5d1d`;


const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

const getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

const getPlaylistByGenre = async (token, genreId) => {
  const limit = 10;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  return data.playlists.items;
};

const getTrackList = async (token, href) => {
  const limit = 1;
  const result = await fetch(href + `?limit=${limit}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data.items;
};

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);
  const list = document.getElementById(`genres`);
  genres.map(async ({ name, icons: [icon], id }) => {
      const playlists = await getPlaylistByGenre(token, id);
      if (playlists.length) {
          const playlistsList = Promise.all(
              playlists.map(
                  async ({
                      name,
                      external_urls: { spotify },
                      images: [image],
                      tracks,
                  }) => {
                      const tracksOfPlaylists = await getTrackList(token, tracks.href);
                      console.log(tracksOfPlaylists);

                      if (tracksOfPlaylists.length) {
                          tracksInPlaylistsOfList = tracksOfPlaylists
                              .map(({ track }) => {
                                  const artist = track.artists.map(({ name }) => name);
                                  return `<li>
                                  <a href="${track.external_urls.spotify}"> 
                                  <div>Artist: </div> ${artist} <br> <br>
                                  <div>Track Name: </div>${track.name}<br> 
                                  </li>`;
                              }).join("");
                      }
                      return `<li><a href="${spotify}"><img src="${image.url}" width="150" height="150" alt="${name}"/><ol>${tracksInPlaylistsOfList}</ol></li>`;
                  }
              )
          ).then((playlistsList) => playlistsList.join(""))
              .then((playlistsList) => {
                  const html = `<article class="genre-card">
                    <img src="${icon.url}" width="${icon.width}" height="${icon.height}" alt="${name}"/>
                    <div>
                      <h2>${name}</h2>
                      <ol>
                        ${playlistsList}
                      </ol>
                    </div>
                  </article>`;
                  list.insertAdjacentHTML("beforeend", html);
              });
      }
  });
};

loadGenres();