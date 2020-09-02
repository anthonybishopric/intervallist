(this["webpackJsonpinterval-playlist"]=this["webpackJsonpinterval-playlist"]||[]).push([[0],{112:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),s=a(55),i=a.n(s),o=(a(83),a(3)),l=a(11),c=a(12),u=a(13),p=a(16),h=a(15),d=(a(45),a(115)),m=a(114),f=a(113),y=(a(111),function(t){Object(p.a)(a,t);var e=Object(h.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).createBarChart=n.createBarChart.bind(Object(u.a)(n)),n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.createBarChart()}},{key:"componentDidUpdate",value:function(){this.createBarChart()}},{key:"createBarChart",value:function(){for(var t=this,e=this.node,a=this.props.data.intervalData.map((function(t){return t.ftpPercent})),n=[],r=0,s=0;s<this.props.data.intervalData.length;s++){var i={x:r,y:a[s]};r+=this.props.data.intervalData[s].durationSecs,i.width=r-i.x,n.push(i)}var l=[];if(this.props.playlistData){r=0;var c,u=Object(o.a)(this.props.playlistData);try{for(u.s();!(c=u.n()).done;){var p=c.value;l.push({x:r,y:this.props.size[1]-50,song:p}),r+=p.durationMs/1e3}}catch(k){u.e(k)}finally{u.f()}}var h=Object(m.a)([Object(m.a)(a),200]),y=Object(d.a)().domain([0,h]).range([0,this.props.size[1]]),v=n[n.length-1].x+n[n.length-1].width,S=Object(d.a)().domain([0,v]).range([0,this.props.size[0]]);Object(f.a)(e).selectAll("rect").data(a).enter().append("rect"),Object(f.a)(e).selectAll("rect").data(a).exit().remove(),Object(f.a)(e).selectAll("image").data(l).enter().append("image"),Object(f.a)(e).selectAll("image").data(l).exit().remove();var g=Object(d.a)().domain([0,200]).range(["yellow","red"]).unknown("#ccc");Object(f.a)(e).selectAll("rect").data(n).attr("fill",(function(t,e){return g(t.y)})).attr("x",(function(t,e){return S(t.x)})).attr("y",(function(e){return t.props.size[1]-y(e.y)})).attr("z",10).attr("height",(function(t){return y(t.y)})).attr("width",(function(t){return S(t.width)})).lower(),Object(f.a)(e).selectAll("line").data([1]).enter().append("line").attr("stroke","white").attr("stroke-dasharray","5 2").attr("x1",S(0)).attr("y1",this.props.size[1]-y(100)).attr("x2",S(v)).attr("y2",this.props.size[1]-y(100)).raise(),Object(f.a)(e).selectAll("path").data([1]),Object(f.a)(e).selectAll("image").data(l).append("image").attr("x",(function(t){return S(t.x)})).attr("y",y(50)).attr("width",64).attr("height",64).attr("xlink:href",(function(t){return t.song.artwork}))}},{key:"render",value:function(){var t=this;return r.a.createElement("svg",{ref:function(e){return t.node=e},width:this.props.size[0],height:this.props.size[1]})}}]),a}(n.Component)),v={WARMING:{TR_RISE_OVER_FTP:"WARMING",TR_RISE_SS:"WARMING",TR_FALL_SS:"WARMING",TR_FALL_UNDER_75:"COOL"},COOL:{TR_RISE_OVER_FTP:"VO2_INTERVAL",TR_RISE_SS:"SS_INTERVAL",TR_END:"FINISH"},SS_INTERVAL:{TR_FALL_UNDER_75:"COOL",TR_RISE_OVER_FTP:"VO2_INTERVAL",TR_END:"FINISH"},VO2_INTERVAL:{TR_FALL_SS:"SS_INTERVAL",TR_FALL_UNDER_75:"COOL",TR_END:"FINISH"}},S=function(){function t(){Object(l.a)(this,t),this.startState="WARMING"}return Object(c.a)(t,[{key:"computeIntervalIntensities",value:function(t){if(0===t.length)return[];var e=[],a=this.startState;e.push({state:this.startState,durationSecs:t[0].durationSecs});for(var n=0;n<t.length;n++){var r=this.computeTransition(t,n),s=v[a][r];if("FINISH"===s){e.push({state:"FINISH",durationSecs:0});break}"TR_STAY"!==s&&s&&s!==a?(e.push({state:s,durationSecs:t[n+1].durationSecs}),a=s):e[e.length-1].durationSecs+=t[n+1].durationSecs}return e}},{key:"computeTransition",value:function(t,e){if(e===t.length-1)return"TR_END";var a=t[e].ftpPercent,n=t[e+1].ftpPercent;return a<75&&n>=75&&n<100?"TR_RISE_SS":a<100&&n>=100?"TR_RISE_OVER_FTP":a>=75&&n<75?t[e+1].durationSecs<=60?"TR_FALL_UNDER_75_LT_1M":"TR_FALL_UNDER_75":a>100&&n>=75&&n<100?"TR_FALL_SS":"TR_STAY"}}]),t}(),g=a(6),k=a.n(g),E=a(30),b=a(23),_=a.n(b),O=function(){function t(e){Object(l.a)(this,t),this.accessToken=e}return Object(c.a)(t,[{key:"headers",value:function(){return{headers:{Authorization:"Bearer "+this.accessToken}}}},{key:"loadMyPlaylists",value:function(){var t=Object(E.a)(k.a.mark((function t(){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",_.a.get("https://api.spotify.com/v1/me/playlists?limit=50",this.headers()));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"loadAllPlaylistTracks",value:function(){var t=Object(E.a)(k.a.mark((function t(e){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",_.a.get("https://api.spotify.com/v1/playlists/"+e+"/tracks",this.headers()));case 1:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"loadAllTrackDetails",value:function(){var t=Object(E.a)(k.a.mark((function t(e,a){var n,r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(e.length>0)){t.next=8;break}return n=e.splice(0,50),t.next=4,_.a.get("https://api.spotify.com/v1/audio-features?ids="+encodeURIComponent(n.join(",")),this.headers());case 4:r=t.sent,a(r.data),t.next=0;break;case 8:case"end":return t.stop()}}),t,this)})));return function(e,a){return t.apply(this,arguments)}}()}]),t}(),A=a(31),w=a.n(A),R=function(t){Object(p.a)(a,t);var e=Object(h.a)(a);function a(t){var n;Object(l.a)(this,a),(n=e.call(this,t)).stateMachine=new S,n.getSongWithArtwork=n.getSongWithArtwork.bind(Object(u.a)(n)),n.playlistId=t.match.params.playlist_id;var r={ftpPercent:45,durationSecs:240},s={ftpPercent:95,durationSecs:1200},i={ftpPercent:120,durationSecs:420},o={ftpPercent:45,durationSecs:420},c={ftpPercent:150,durationSecs:30},p={ftpPercent:45,durationSecs:30};return n.workouts={sweetSpot:{name:"3 x 20min Sweet Spot",intervalData:[{ftpPercent:40,durationSecs:300},{ftpPercent:60,durationSecs:180},{ftpPercent:90,durationSecs:120},r,s,r,s,r,s,r]},vO2Max:{name:"6 x 7min vO2 Max",intervalData:[{ftpPercent:40,durationSecs:300},{ftpPercent:60,durationSecs:180},{ftpPercent:95,durationSecs:120},{ftpPercent:45,durationSecs:300},i,o,i,o,i,o,i,o,i,o,i,{ftpPercent:75,durationSecs:1200}]},sprints:{name:"6x3x1min Sprints",intervalData:[{ftpPercent:40,durationSecs:300},{ftpPercent:60,durationSecs:180},{ftpPercent:95,durationSecs:120},{ftpPercent:45,durationSecs:300},c,p,c,p,c,p,c,p,c,p,c,{ftpPercent:45,durationSecs:300},c,p,c,p,c,p,c,p,c,p,c,{ftpPercent:45,durationSecs:300},c,p,c,p,c,p,c,p,c,p,c,{ftpPercent:45,durationSecs:300}]}},n.state={playlistData:{},songData:{},selectedWorkout:n.workouts.sweetSpot},n.spotify=new O(localStorage.getItem("spotify_access_code")),n}return Object(c.a)(a,[{key:"updateWorkout",value:function(t){var e=this;return function(){e.state.selectedWorkout.name!=t.name&&e.setState({selectedWorkout:t})}}},{key:"componentDidMount",value:function(){var t=this;this.spotify.loadAllPlaylistTracks(this.playlistId).then((function(e){t.updatePlaylistDataBase(e.data);var a=e.data.items.map((function(t){return t.track.id}));t.spotify.loadAllTrackDetails(a,t.updateSongDataFeatures.bind(t))}))}},{key:"updatePlaylistDataBase",value:function(t){var e={};t.items.forEach((function(t){e[t.track.id]=t})),this.setState({playlistData:e})}},{key:"updateSongDataFeatures",value:function(t){var e=this.state.songData;t.audio_features.map((function(t){t&&(e[t.id]=t)})),this.setState({songData:e})}},{key:"render",value:function(){var t=this,e=Object.keys(this.state.playlistData).map((function(e){var a=t.state.playlistData[e],n={danceability:"",energy:"",key:6,loudness:-4.19,mode:0,speechiness:.392,acousticness:.326,instrumentalness:.00443,liveness:.0516,valence:"",tempo:"",type:"audio_features",id:"0AcDvwLwqh72opYiqkfJ14",uri:"spotify:track:0AcDvwLwqh72opYiqkfJ14",track_href:"https://api.spotify.com/v1/tracks/0AcDvwLwqh72opYiqkfJ14",analysis_url:"https://api.spotify.com/v1/audio-analysis/0AcDvwLwqh72opYiqkfJ14",duration_ms:219333,time_signature:4};return t.state.songData[e]&&(n=t.state.songData[e]),r.a.createElement("tr",{key:a.track.id},r.a.createElement("td",null,a.track.name),r.a.createElement("td",null,a.track.artists[0].name),r.a.createElement("td",null,w.a.duration(a.track.duration_ms).humanize()),r.a.createElement("td",null,n.danceability),r.a.createElement("td",null,n.energy),r.a.createElement("td",null,n.loudness),r.a.createElement("td",null,n.valence),r.a.createElement("td",null,n.tempo))})),a=this.computePlaylist(),n=a.map((function(t,e){return r.a.createElement("tr",{key:"intensity-"+e},r.a.createElement("td",null,t.intensity.state," for ",w.a.duration(t.intensity.durationSecs,"seconds").humanize()),r.a.createElement("td",null,t.songs.map((function(t){return r.a.createElement("span",{key:"intensity-"+e+"-song-"+t.id},r.a.createElement("img",{src:t.artwork,title:t.name}))}))),r.a.createElement("td",null,w.a.duration(t.songs.map((function(t){return t.durationMs})).reduce((function(t,e){return t+e})),"milliseconds").humanize()))}));return r.a.createElement("div",null,r.a.createElement("form",null,r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"workout",value:"Sweet Spot",onChange:this.updateWorkout(this.workouts.sweetSpot)})," Sweet Spot"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"workout",value:"VO2 Max",onChange:this.updateWorkout(this.workouts.vO2Max)})," vO2 Max"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"workout",value:"Sprints",onChange:this.updateWorkout(this.workouts.sprints)})," Sprints"),r.a.createElement("label",null,r.a.createElement("input",{type:"radio",name:"workout",value:"Custom",disabled:!0})," Custom")),r.a.createElement(y,{data:this.state.selectedWorkout,size:[.99*window.innerWidth,300],playlistData:a}),r.a.createElement("div",{className:"playlist-display"},r.a.createElement("table",null,r.a.createElement("tbody",null,n))),r.a.createElement("hr",null),r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Title"),r.a.createElement("th",null,"Artist"),r.a.createElement("th",null,"Duration"),r.a.createElement("th",null,"Danceability"),r.a.createElement("th",null,"Energy"),r.a.createElement("th",null,"Loudness"),r.a.createElement("th",null,"Valence"),r.a.createElement("th",null,"Tempo"))),r.a.createElement("tbody",null,e)))}},{key:"computePlaylist",value:function(){var t=this.stateMachine.computeIntervalIntensities(this.state.selectedWorkout.intervalData);if(Object.keys(this.state.playlistData).length-Object.keys(this.state.songData).length>10)return[];var e,a={WARMING:this.getWarmupSongs(),SS_INTERVAL:this.getSSSongs(),VO2_INTERVAL:this.getVO2MaxSongs()},n=Object(o.a)(this.getWarmupSongs());try{for(n.s();!(e=n.n()).done;){var r=e.value;console.log(r.id+"\t"+r.duration_ms)}}catch(E){n.e(E)}finally{n.f()}var s=[],i=[],l=[];i.push("60JoeD2lqbdEdHJKWpr4fR"),s.push("7gwRSZ0EmGWa697ZrE58GA"),s.push("2JlC2hgOEYEUAUzZEEMPgA"),i.push("4CECHdtCQxRw0RNnuBe38V"),[].push("0ctfhLgKb9qQIHlN3Gebmt"),l.push("6ycpWuXW7hxgsT0cRcCFJX"),l.push("6BZR3QtpAX74TNGvjBw0ce"),s.push("1dgTolpKW9lnFpDuX0hSaS"),s.push("46bub9IoIo1gbmvLKdvSzG"),s.push("6ceKf0vFlAS9yvvoC4l2zq"),s.push("0SMxJhM52yVnA7H1oEY6e7"),s.push("0SMKzTJ7OQdIADSyWN6l62"),s.push("0Z1hc8dk4gvPRv9cskhtKX"),l.push("2f0g5LMi7DMcFxhUSlKbDc"),s.push("0juXJUnKNGLiJCqPO1sY2a"),s.push("0ziDFYykduFnaDJY0l0Eew");for(var c=[],u={},p=0,h=0;h<t.length;h++){var d=[],m=a[t[h].state],f=1e3*t[h].durationSecs+p;if(h<t.length-1&&!a[t[h+1].state]&&(f+=1e3*t[h+1].durationSecs),m){for(var y=!0;y;){for(var v=!0,S=null;v&&0!=m.length;)v=u[(S=m.pop()).id];if(!S){y=!1;break}S.duration_ms<=f?(u[S.id]=!0,d.push(S),f-=S.duration_ms):d.length>0&&(y=!1)}var g=f%30,k=f-g;d.push({id:"decompression",durationMs:k}),p=g,c.push({intensity:t[h],songs:d.map(this.getSongWithArtwork)})}}return c}},{key:"getSongWithArtwork",value:function(t){if("decompression"==t.id)return t;var e=null,a=this.state.playlistData[t.id].track;if(a.album&&a.album.images)for(var n=0;n<a.album.images.length;n++){var r=a.album.images[n];if(r.height<=64){e=r.url;break}}var s=null;return a.artists&&a.artists.length>0&&(s=a.artists[0].name),{id:t.id,durationMs:t.duration_ms,artwork:e,name:a.name,artist:s}}},{key:"songFeaturesAsArray",value:function(){var t=this;return Object.keys(this.state.songData).map((function(e){return t.state.songData[e]}))}},{key:"getWarmupSongs",value:function(){var t=this.songFeaturesAsArray();return t.sort((function(t,e){return e.danceability-t.danceability})),t}},{key:"getSSSongs",value:function(){var t=this.songFeaturesAsArray();return t.sort((function(t,e){return e.duration_ms-t.duration_ms})),t}},{key:"getVO2MaxSongs",value:function(){var t=this.songFeaturesAsArray();return t.sort((function(t,e){return e.tempo-t.tempo})),t}}]),a}(r.a.Component),D=(a(103),a(37)),T=a(1);var j=function(t){Object(p.a)(a,t);var e=Object(h.a)(a);function a(t){var n;return Object(l.a)(this,a),(n=e.call(this,t)).handleLoginClick=n.handleLoginClick.bind(Object(u.a)(n)),n.spotifyAccessCode=localStorage.getItem("spotify_access_code"),n.state={playlists:[],spotifyError:null},n}return Object(c.a)(a,[{key:"handleLoginClick",value:function(){var t="https://accounts.spotify.com/authorize?response_type=token&client_id=ca1d41a2da864fd6812b292fedd8adb8&scope="+encodeURIComponent("user-read-email playlist-read-collaborative playlist-read-private")+"&redirect_uri="+encodeURIComponent("https://anthonybishopric.com/intervallist/spotify/callback");window.location.href=t}},{key:"render",value:function(){var t;if(this.spotifyAccessCode){var e,a=this.state.playlists.map((function(t){return r.a.createElement("div",{key:t.id},r.a.createElement(D.b,{to:{pathname:"".concat("https://anthonybishopric.com/intervallist","/generate/")+t.id},className:"App-link"}," ",t.name," (",t.tracks.total," Tracks)"))}));e=this.state.spotifyError?r.a.createElement("div",{class:"error"},this.state.spotifyError):r.a.createElement("div",null),t=r.a.createElement("div",null,r.a.createElement("h4",null,"Select a playlist to use as your source"),e,r.a.createElement("ul",null,a))}else t=r.a.createElement("div",null,r.a.createElement("a",{href:"#",onClick:this.handleLoginClick},"Log in to Spotify"));return r.a.createElement("div",null,r.a.createElement("h3",null,"Spotify Interval Playlist Generator"),t)}},{key:"componentDidMount",value:function(){if(this.spotifyAccessCode){var t=this;new O(this.spotifyAccessCode).loadMyPlaylists().then((function(e){t.setState({playlists:e.data.items})})).catch((function(e){console.log(e),t.setState({spotifyError:"Could not load playlists: "+e})}))}}}]),a}(r.a.Component),I=function(t){Object(p.a)(a,t);var e=Object(h.a)(a);function a(){return Object(l.a)(this,a),e.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,"Loading...")}},{key:"componentDidMount",value:function(){new URLSearchParams(this.props.location.search);var t,e=null,a=this.props.location.hash.split("&"),n=Object(o.a)(a);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(r.includes("#access_token=")){e=r.replace("#access_token=","");break}}}catch(s){n.e(s)}finally{n.f()}localStorage.setItem("spotify_access_code",e),this.props.history.push("/")}}]),a}(r.a.Component),L=function(){return r.a.createElement(D.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(T.a,{path:"".concat("https://anthonybishopric.com/intervallist","/"),exact:!0,component:j}),r.a.createElement(T.a,{path:"".concat("https://anthonybishopric.com/intervallist","/spotify/callback"),component:I}),r.a.createElement(T.a,{path:"".concat("https://anthonybishopric.com/intervallist","/generate/:playlist_id"),component:R})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(L,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},45:function(t,e,a){},78:function(t,e,a){t.exports=a(112)},83:function(t,e,a){}},[[78,1,2]]]);
//# sourceMappingURL=main.aba1b950.chunk.js.map