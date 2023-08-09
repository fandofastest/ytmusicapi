import * as lib from 'node-youtube-music';
import express from 'express';
import musicapi from 'youtube-music-api';


const api = new musicapi

api.initalize() // Retrieves Innertube Config



const app = express();
const port = 3000;


//   const musics = await lib.searchMusics('Never gonna give you up');
//   const albums = await lib.searchAlbums('Human after all');

//   const albumSongs = await lib.listMusicsFromAlbum(albums[0].albumId);


//   console.log(albumSongs);


app.get('/getsuggest/:id',async (req, myres) => {
    const results = await api.getSearchSuggestions(req.params.id)

    myres.json(results);
  
});

  app.get('/search/music/:id',async (req, myres) => {
    const results = await lib.searchMusics(req.params.id);

    myres.json(results);
  
});


app.get('/search/album/:id',async (req, myres) => {
    const results = await lib.searchAlbums(req.params.id);

    myres.json(results);
  
});


app.get('/search/artist/:id',async (req, myres) => {
    const results = await lib.searchArtists(req.params.id);

    myres.json(results);
  
});

app.get('/search/playlist/:id',async (req, myres) => {
    const results = await lib.searchPlaylists(req.params.id);

    myres.json(results);
  
});

app.get('/list/byalbum/:id',async (req, myres) => {
    const results = await lib.listMusicsFromAlbum(req.params.id);

    myres.json(results);
  
});

app.get('/list/byplaylist/:id',async (req, myres) => {
    const results = await lib.listMusicsFromPlaylist(req.params.id);

    myres.json(results);
  
});

app.get('/detail/artist/:id',async (req, myres) => {
    const results = await lib.getArtist(req.params.id);

    myres.json(results);
  
});

app.get('/suggest/:id',async (req, myres) => {
    const results = await lib.getSuggestions(req.params.id);

    myres.json(results);
  
});




app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});