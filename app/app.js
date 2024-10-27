import * as lib from "node-youtube-music";
import express from "express";
import musicapi from "youtube-music-api";
import yts from "yt-search";

const api = new musicapi();

api.initalize(); // Retrieves Innertube Config

const app = express();
const port = 3000;

//   const musics = await lib.searchMusics('Never gonna give you up');
//   const albums = await lib.searchAlbums('Human after all');

//   const albumSongs = await lib.listMusicsFromAlbum(albums[0].albumId);

//   console.log(albumSongs);

app.get("/getsuggest/:id", async (req, myres) => {
  const results = await api.getSearchSuggestions(req.params.id);

  myres.json(results);
});

app.get("/search/music/:id", async (req, myres) => {
  try {
    const results = await yts(req.params.id);

    // Ubah data hanya untuk data video yang diperlukan oleh Flutter
    const videoResults = results.videos.map((video) => ({
      title: video.title,
      thumbnailUrl: video.thumbnail,
      artists: [
        {
          id: video.author.url.split("/").pop(), // ID artis diambil dari bagian akhir URL
          name: video.author.name,
        },
      ],
      youtubeId: video.videoId,
      duration: {
        label: video.duration.timestamp, // durasi dalam format string
      },
      type: "youtube",
    }));

    // Kirim respons yang telah diformat
    myres.json(videoResults);
  } catch (error) {
    console.error(error);
    myres.status(500).json({ message: "Error retrieving data" });
  }
});

app.get("/search/album/:id", async (req, myres) => {
  const results = await lib.searchAlbums(req.params.id);

  myres.json(results);
});

app.get("/search/artist/:id", async (req, myres) => {
  const results = await lib.searchArtists(req.params.id);

  myres.json(results);
});

app.get("/search/playlist/:id", async (req, myres) => {
  const results = await lib.searchPlaylists(req.params.id);

  myres.json(results);
});

app.get("/list/byalbum/:id", async (req, myres) => {
  const results = await lib.listMusicsFromAlbum(req.params.id);

  myres.json(results);
});

app.get("/list/byplaylist/:id", async (req, myres) => {
  const results = await lib.listMusicsFromPlaylist(req.params.id);

  myres.json(results);
});

app.get("/detail/artist/:id", async (req, myres) => {
  const results = await lib.getArtist(req.params.id);

  myres.json(results);
});

app.get("/suggest/:id", async (req, myres) => {
  const results = await lib.getSuggestions(req.params.id);

  myres.json(results);
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`);
});
