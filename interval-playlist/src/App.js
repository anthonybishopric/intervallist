import React from 'react';
import GeneratePlaylist from './GeneratePlaylist.js';
import './App.css';
import axios from 'axios';
import Spotify from './Spotify';
import querystring from 'querystring';

import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

const SPOTIFY_CLIENT_SECRET = '77af06aa6a7141e08202ef98ddd8fb42';
const SPOTIFY_CLIENT_ID = 'ca1d41a2da864fd6812b292fedd8adb8';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" exact component={SpotifyComponent}></Route>
        <Route path="/spotify/callback" component={SpotifyExchangeCodeForAccessToken}></Route>
        <Route path="/generate/:playlist_id" component={GeneratePlaylist}></Route>
      </div>
    </BrowserRouter>
  );
}

class SpotifyComponent extends React.Component {

  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.spotifyAccessCode = localStorage.getItem("spotify_access_code");
    this.state = { playlists: [], spotifyError: null };
  }

  handleLoginClick() {
    var scopes = "user-read-email playlist-read-collaborative playlist-read-private";
    var url = 'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + SPOTIFY_CLIENT_ID + '&scope=' + encodeURIComponent(scopes) +
      '&redirect_uri=' + encodeURIComponent('http://localhost:3000/spotify/callback');
    window.location.href = url;
  }

  render() {
    var spotifyBody;
    if (this.spotifyAccessCode) {
      var listItems = this.state.playlists.map(playlist => (
        <div key={playlist.id}>
          <Link to={{ pathname: "/generate/" + playlist.id }} className="App-link"> {playlist.name} ({playlist.tracks.total} Tracks)</Link>
        </div>
      ));
      var spotifyError;
      if (this.state.spotifyError) {
        spotifyError = <div class="error">{this.state.spotifyError}</div>;
      } else {
        spotifyError = <div></div>;
      }

      spotifyBody = <div>
        <h4>Select a playlist to use as your source</h4>
        {spotifyError}
        <ul >{listItems}</ul>
      </div>
    } else {
      spotifyBody = <div><a href="#" onClick={this.handleLoginClick}>Log in to Spotify</a></div>
    }

    return <div>
      <h3>Spotify Interval Playlist Generator</h3>
      {spotifyBody}
    </div>
  }

  componentDidMount() {
    if (this.spotifyAccessCode) {
      var self = this;
      
      new Spotify(this.spotifyAccessCode).loadMyPlaylists().then(resp => {
        self.setState({ playlists: resp.data.items });
      }).catch(error => {
        console.log(error);
        self.setState({ spotifyError: "Could not load playlists: " + error });
      });
    }
  }
}


class SpotifyExchangeCodeForAccessToken extends React.Component {
  render() {
    return <div>Loading...</div>;
  }
  componentDidMount() {
    let query = new URLSearchParams(this.props.location.search);
    if (query.get("error")) {
      return <div>Error authenticating: {query.get("error")}</div>;
    }
    if (!query.get("code")) {
      return <div>Code not received in callback</div>;
    }
    // 1. should really check the state here to prevent CSRF attacks
    // 2. should __really__ not be doing a vanilla oauth exchange on the client with the app secret.
    var reqData = querystring.stringify({ grant_type: "authorization_code", code: query.get("code"), redirect_uri: 'http://localhost:3000/spotify/callback' });
    var clientHeader = btoa(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET);
    var self = this;
    axios.post('https://accounts.spotify.com/api/token', reqData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + clientHeader
      }
    })
      .then((data) => {
        console.log(data);
        localStorage.setItem('spotify_access_code', data.data.access_token)
        self.props.history.push('/');
      }).catch(error => {
        console.log(error);
      });
  }
}

export default App;
