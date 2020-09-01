import axios from 'axios';

class Spotify {
    constructor(accessToken) {
        this.accessToken = accessToken;
    }

    headers() {
        return {
            headers: {
                "Authorization": "Bearer " + this.accessToken
            }
        };
    }

    async loadMyPlaylists() {
        return axios.get("https://api.spotify.com/v1/me/playlists?limit=50", this.headers());
    }

    async loadAllPlaylistTracks(playlistId) {
        return axios.get("https://api.spotify.com/v1/playlists/" + playlistId + "/tracks", this.headers());        
    }

    /**
     * 
     * @param {Array} trackIds array
     * @param {Function} trackDataCallback function
     */
    async loadAllTrackDetails(trackIds, trackDataCallback) {
        while(trackIds.length > 0) {
            let tracksToQuery = trackIds.splice(0, 50); // 50 is the cap for this API
            let resp = await axios.get("https://api.spotify.com/v1/audio-features?ids="+encodeURIComponent(tracksToQuery.join(",")), this.headers())
            trackDataCallback(resp.data);
        }
    }
}

export default Spotify;