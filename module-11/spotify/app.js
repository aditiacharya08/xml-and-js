const clientId = `4ea99674e804477093593f5b8dbbf8d9`;
const clientSecret = `3a58446f83a64f1491fe4e713f1a5d1d`;


let data = [];
let withTrack = 'true';

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

const getPlaylistByGenre = async (token, genreId) => {
  const limit = 5;
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );
  const data = await result.json();
  return data.playlists ? data.playlists.items : [];
};

const loadGenres = async () => {
  const token = await getToken();
  const genres = await getGenres(token);

  data = await Promise.all(
    genres.map(async (genre) => {
      const playlists = await getPlaylistByGenre(token, genre.id);
      const playlistsList = await Promise.all(
        playlists.map(async (playlist) => {
          const tracks = await getTrackbyPlaylist(token, playlist.id);
            return { ...playlist, tracks };
        })
      );
      return { ...genre, playlists: playlistsList};
    })
  );
};


const getTrackbyPlaylist = async (token, playlist_id) => {
  const limit = 5;
  const result = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.items;
};


const renderGenres = async (filterTerm) => {
  const token = await getToken();
  const genres = await getGenres(token);
  let source = data;

  if (filterTerm) {
    const term = filterTerm.toLowerCase();
    source = source.filter(({ name }) => {
      return name.toLowerCase().includes(term);
    });
  }

  const list = document.getElementById(`genres`);

  const html = source.reduce((acc, { name, icons: [icon], playlists }) => {
    const playlistsList = playlists
      .map(({ name, external_urls: { spotify }, images: [image], tracks }) => {

        const tracksInPlaylistsList = tracks.map(
            ({
              track: {
                name: track_name,
                artists,
                external_urls: { spotify },
              },
            }) =>
            `<div> <a href="${spotify}" target="_blank">${ track_name }</a></div>
             <div>${artists.map((artist) => artist.name).join(" , ")} </div>
            <br>`
          ).join("");
        return `<li><a href="${spotify}"><img src="${image.url}" width="180" height="180" alt="${name}"/><ol class="tracks">${tracksInPlaylistsList}</ol></li>`;
      }
      );


    if (playlists) {
      return (
        acc +`
        <article class="genre-card">
        <img src="${icon.url}" width="${icon.width}" height="${icon.height}" alt="${name}"/>
        <div>
          <h2>${name}</h2>
        <ol>
          ${withTrack != undefined && withTrack === 'true' ? `${playlistsList}` : `<p>Not available</p>`}
          </ol>
          </div>
      </article>`
      );
    }
  }, ``);

  list.innerHTML = html;
}



loadGenres().then(renderGenres);


const onSubmit = (event) => {
  event.preventDefault();
  const term = event.target.term.value;
  withTrack = event.target.playlist_tracks.value;
  console.log(withTrack);
  renderGenres(term);
};