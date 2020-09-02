import React from 'react';
import GeneratePlaylist from './GeneratePlaylist.js';
import './App.css';
import axios from 'axios';
import Spotify from './Spotify';
import querystring from 'querystring';

import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";

const SPOTIFY_CLIENT_ID = 'ca1d41a2da864fd6812b292fedd8adb8';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path={`${process.env.PUBLIC_URL}/`} exact component={SpotifyComponent}></Route>
        <Route path={`${process.env.PUBLIC_URL}/spotify/callback`} component={SpotifyExchangeCodeForAccessToken}></Route>
        <Route path={`${process.env.PUBLIC_URL}/generate/:playlist_id`} component={GeneratePlaylist}></Route>
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
      '?response_type=token' +
      '&client_id=' + SPOTIFY_CLIENT_ID + '&scope=' + encodeURIComponent(scopes) +
      '&redirect_uri=' + encodeURIComponent(`https://anthonybishopric.com/intervallist/spotify/callback`);
    window.location.href = url;
  }

  render() {
    var spotifyBody;
    if (this.spotifyAccessCode) {
      var listItems = this.state.playlists.map(playlist => (
        <div key={playlist.id}>
          <Link to={{ pathname: `${process.env.PUBLIC_URL}/generate/` + playlist.id }} className="App-link"> {playlist.name} ({playlist.tracks.total} Tracks)</Link>
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
    
    var accessToken = null;
    var split = this.props.location.hash.split("&");
    for (let hashComp of split) {
      if (hashComp.includes("#access_token=")) {
        accessToken = hashComp.replace("#access_token=", "");
        break;
      }
    }
    localStorage.setItem('spotify_access_code', accessToken)
    this.props.history.push('/');
  }
}

export default App;
