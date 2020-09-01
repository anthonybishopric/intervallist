import React from 'react';
import { 
  Intervals, 
  StateMachine,
  WARMING,
  COOL,
  SS_INTERVAL,
  VO2_INTERVAL,
  FINISH 
} from './Intervals.js';
import Spotify from './Spotify.js';
import moment from 'moment';

class GeneratePlaylist extends React.Component {
    constructor(props) {
      super(props);
      this.stateMachine = new StateMachine();
      this.playlistId = props.match.params.playlist_id;
  
      let ssBreak = {
        ftpPercent: 45,
        durationSecs: 4 * 60
      };
      let ssInterval = {
        ftpPercent: 95,
        durationSecs: 20 * 60
      };
      let vO2MaxInterval = {
        ftpPercent: 120,
        durationSecs: 7 * 60
      };
      let vO2MaxBreak = {
        ftpPercent: 45,
        durationSecs: 7 * 60
      };
      let anaerobicSprint = {
        ftpPercent: 150,
        durationSecs: 30
      };
      let anaerobicSprintRecovery = {
        ftpPercent: 45,
        durationSecs: 30
      };
      this.workouts = {
        sweetSpot: {
          name: "3 x 20min Sweet Spot",
          intervalData: [
            {
              ftpPercent: 40,
              durationSecs: 5 * 60
            },
            {
              ftpPercent: 60,
              durationSecs: 3 * 60
            },
            {
              ftpPercent: 90,
              durationSecs: 2 * 60
            },
            ssBreak,
            ssInterval,
            ssBreak,
            ssInterval,
            ssBreak,
            ssInterval,
            ssBreak
          ]
        },
        vO2Max: {
          name: "6 x 7min vO2 Max",
          intervalData: [
            {
              ftpPercent: 40,
              durationSecs: 5 * 60
            },
            {
              ftpPercent: 60,
              durationSecs: 3 * 60
            },
            {
              ftpPercent: 95,
              durationSecs: 2 * 60
            },
            {
              ftpPercent: 45,
              durationSecs: 5 * 60
            },
            vO2MaxInterval,
            vO2MaxBreak,
            vO2MaxInterval,
            vO2MaxBreak,
            vO2MaxInterval,
            vO2MaxBreak,
            vO2MaxInterval,
            vO2MaxBreak,
            vO2MaxInterval,
            vO2MaxBreak,
            vO2MaxInterval,
            {
              ftpPercent: 75,
              durationSecs: 20 * 60
            }
          ]
        },
        sprints: {
          name: "6x3x1min Sprints",
          intervalData: [
            {
              ftpPercent: 40,
              durationSecs: 5 * 60
            },
            {
              ftpPercent: 60,
              durationSecs: 3 * 60
            },
            {
              ftpPercent: 95,
              durationSecs: 2 * 60
            },
            {
              ftpPercent: 45,
              durationSecs: 5 * 60
            },
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            {
              ftpPercent: 45,
              durationSecs: 5 * 60
            },
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            {
              ftpPercent: 45,
              durationSecs: 5 * 60
            },
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            anaerobicSprintRecovery,
            anaerobicSprint,
            {
              ftpPercent: 45,
              durationSecs: 5 * 60
            }
          ]
        }
      }
      this.state = { playlistData: {}, songData: {}, selectedWorkout: this.workouts.sweetSpot };
      this.spotify = new Spotify(localStorage.getItem("spotify_access_code"));
    }
  
    updateWorkout(workout) {
      return () => {
        if (this.state.selectedWorkout.name != workout.name) {
          this.setState({ selectedWorkout: workout });
        }
      };
    }
  
    componentDidMount() {
        this.spotify.loadAllPlaylistTracks(this.playlistId).then((data) => {
          this.updatePlaylistDataBase(data.data);
          let trackIds = data.data.items.map((item) => (
              item.track.id
          ));
          this.spotify.loadAllTrackDetails(trackIds, this.updateSongDataFeatures.bind(this));
        });
    }

    updatePlaylistDataBase(data) {
      let playlistDataObj = {}
      data.items.forEach((item) => {
        playlistDataObj[item.track.id] = item
      });
      this.setState({playlistData: playlistDataObj});
    }

    /**
     * 
     * @param {Array} songData 
     */
    updateSongDataFeatures(songData) {
      let songDataObj = this.state.songData;
      songData.audio_features.map((item) => {
        if (item) {
          songDataObj[item.id] = item;
        }
      })
      this.setState({songData:  songDataObj});
    }
  
    render() {
      let songs = Object.keys(this.state.playlistData).map((itemKey) => {
        let item = this.state.playlistData[itemKey];

        var trackData = {
          "danceability": "",
          "energy":"",
          "key":6,
          "loudness":-4.19,
          "mode":0,
          "speechiness":0.392,
          "acousticness":0.326,
          "instrumentalness":0.00443,
          "liveness":0.0516,
          "valence":"",
          "tempo":"",
          "type":"audio_features",
          "id":"0AcDvwLwqh72opYiqkfJ14",
          "uri":"spotify:track:0AcDvwLwqh72opYiqkfJ14",
          "track_href":"https://api.spotify.com/v1/tracks/0AcDvwLwqh72opYiqkfJ14",
          "analysis_url":"https://api.spotify.com/v1/audio-analysis/0AcDvwLwqh72opYiqkfJ14",
          "duration_ms":219333,
          "time_signature":4
        };
        if (this.state.songData[itemKey]) {
          trackData = this.state.songData[itemKey];
        }

        return <tr key={item.track.id}>
          <td>{item.track.name}</td>
          <td>{item.track.artists[0].name}</td>
          <td>{moment.duration(item.track.duration_ms).humanize()}</td>
          <td>{trackData.danceability}</td>
          <td>{trackData.energy}</td>
          <td>{trackData.loudness}</td>
          <td>{trackData.valence}</td>
          <td>{trackData.tempo}</td>
        </tr>
      });

      let intensities = this.stateMachine.computeIntervalIntensities(this.state.selectedWorkout.intervalData).map((intensity, i) => (
        <div key={"intensity-" + i}>{intensity.state} for {moment.duration(intensity.durationSecs, "seconds").humanize()}</div>
      ));

      return <div>
        <Intervals 
          data={this.state.selectedWorkout} 
          size={[window.innerWidth, 300]}
          playlistData={this.computePlaylist()}></Intervals>
        <div>
          {intensities}
        </div>
        <form>
          <label><input type="radio" name="workout" value="Sweet Spot" onChange={this.updateWorkout(this.workouts.sweetSpot)} /> Sweet Spot</label>
          <label><input type="radio" name="workout" value="VO2 Max" onChange={this.updateWorkout(this.workouts.vO2Max)} /> vO2 Max</label>
          <label><input type="radio" name="workout" value="Sprints" onChange={this.updateWorkout(this.workouts.sprints)} /> Sprints</label>
        </form>
        <hr></hr>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Duration</th>
              <th>Danceability</th>
              <th>Energy</th>
              <th>Loudness</th>
              <th>Valence</th>
              <th>Tempo</th>
            </tr>
          </thead>
          <tbody>{songs}</tbody>
          </table>
      </div>
    }

    computePlaylist() {
      // check if there are at least 75 songs with song data
      // basic implementation:
      // maintain a state machine for the intervals 
      
      // iterate through all intervals
      // -- find 1 or more songs that match the intensity and have a duration between (interval, interval+cooldown]
      // -- fill gap of remaining cooldown time with meditative songs
      // -- add a short celebration at the end :) 
      
      let intensities = this.stateMachine.computeIntervalIntensities(this.state.selectedWorkout.intervalData);
      
      if (Object.keys(this.state.playlistData).length - Object.keys(this.state.songData).length > 10) {
        // we are missing song data for a decent chunk of songs, don't continue;
        return;
      }

      let songs = {
        WARMING: this.getWarmupSongs(),
        SS_INTERVAL: this.getSSSongs(),
        VO2_INTERVAL: this.getVO2MaxSongs()
      };

      let playlist = [];

      // try not to reuse songs
      let usedSongs = {};
      let previousIntensityRemainderMs = 0;
      for (let i = 0; i < intensities.length; i++) {
        // get intensity, pop song from respective list, while its already in use
        
        let selectedIntensitySongs = [];
        
        let candidateSongs = songs[intensities[i].state];
        let highIntensitySetMs = intensities[i].durationSecs * 1000;
        let durationRemainingMs = highIntensitySetMs + previousIntensityRemainderMs;
        if (i < intensities.length-1) {
          durationRemainingMs += intensities[i+1].durationSecs * 1000;
        }
        // if this is an intensity we have songs for (ie, not a cooldown), proceed to add songs.
        if (candidateSongs) {
          // loop until we have consumed as much of the duration without going over our limit.        
          let keepGoing = true;
          while (keepGoing) {
            let inUse = true;
            let songCandidate = null;
            while (inUse) { // while a song is in use, get the next one
              if (candidateSongs.length == 0) {
                break;
              }
              songCandidate = candidateSongs.pop();
              inUse = usedSongs[songCandidate.id];
            }
            if (!songCandidate) {
              keepGoing = false;
              break;
            }
            if (songCandidate.duration_ms <= durationRemainingMs) {
              usedSongs[songCandidate.id] = true;
              selectedIntensitySongs.push(songCandidate);
              durationRemainingMs = durationRemainingMs - songCandidate.duration_ms;
            } else {
              // - if there are no songs for the intensity yet, keep popping until we find one or we're out
              // - if there is at least one, bail when we hit a song that goes over the limit
              if (selectedIntensitySongs.length > 0) {
                keepGoing = false;
              }
            }
          }
          // To fill the gap between intensitiies, we have a set of pre-determined 30, 60, 2m and 4m tracks that
          // are lower intensity and make the transition back into intense intervals more exciting. Also removes
          // the general packing problem issues.
          let remainder = durationRemainingMs % 30;
          let decompressionTime = durationRemainingMs - remainder;
          selectedIntensitySongs.push({
            id: "decompression",
            duration_ms: decompressionTime
          })
          previousIntensityRemainderMs = remainder;
          playlist = playlist.concat(selectedIntensitySongs);
        }
      }
      return playlist.map((song) => {
        if (song.id == 'decompression') {
          return song
        }
        
        var artwork = null;
        let playlistSongInfo = this.state.playlistData[song.id].track;

        if (playlistSongInfo.album && playlistSongInfo.album.images) {
          for (let i = 0; i < playlistSongInfo.album.images.length; i++) {
            let albumImages = playlistSongInfo.album.images[i];
            if (albumImages.height <= 64) {
              artwork = albumImages.url;
              break;
            }
          }
        }

        var artist = null;
        if (playlistSongInfo.artists && playlistSongInfo.artists.length > 0) {
          artist = playlistSongInfo.artists[0].name;
        }

        return {
          id: song.id,
          durationMs: song.duration_ms,
          artwork: artwork,
          name: playlistSongInfo.name,
          artist: artist
        }
      })
    };

    songFeaturesAsArray() {
      return Object.keys(this.state.songData).map((key) => this.state.songData[key]);
    }

    getWarmupSongs() {
      // get all songs, sort by danceability
      let songs = this.songFeaturesAsArray();
      songs.sort((song1, song2) => {
        return song2.danceability - song1.danceability;
      });
      return songs;
    }

    getSSSongs() {
      // get all songs, sort by length
      let songs = this.songFeaturesAsArray();
      songs.sort((song1, song2) => {
        return song2.duration_ms - song1.duration_ms;
      });
      return songs;
    }

    getVO2MaxSongs() {
      // get all songs, sort by tempo (BPM)
      let songs = this.songFeaturesAsArray();
      songs.sort((song1, song2) => {
        return song2.tempo - song1.tempo;
      });
      return songs;
    }
  }

  export default GeneratePlaylist;