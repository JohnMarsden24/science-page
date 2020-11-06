import Plyr from "plyr";
import { Howl, Howler } from "howler";

// Changes audio source between IRIS and normal tracks
// class Player {
//   constructor(elementId, tracks) {
//     this.player = new Plyr(`#${elementId}`, {
//       controls: [
//         "restart",
//         "play",
//         "progress",
//         "current-time",
//         "duration",
//         "mute",
//         "volume",
//       ],
//     });
//     this.tracks = tracks;
//     this.currentTrack;
//     this.currentTime;
//     this.irisActive = false;
//     this.events();
//     this.initPlayer();
//   }

//   events() {
//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");
//     const irisBtn = document.getElementById("irisBtn");

//     prevBtn.addEventListener("click", () => this.previousTrack());
//     nextBtn.addEventListener("click", () => this.nextTrack());
//     irisBtn.addEventListener("click", () => this.initIris());
//   }

//   initPlayer() {
//     const firstTrack = this.tracks[0];
//     this.player.source = firstTrack;
//     this.currentTrack = 0;
//   }

//   previousTrack() {
//     if (this.currentTrack === 0) return;
//     this.irisActive = false;
//     this.currentTrack--;
//     this.player.source = this.tracks[this.currentTrack];
//   }

//   nextTrack() {
//     if (this.currentTrack === this.tracks.length) return;
//     this.irisActive = false;
//     this.currentTrack++;
//     this.player.source = this.tracks[this.currentTrack];
//   }

//   async initIris() {
//     this.currentTime = this.player.currentTime;
//     if (this.irisActive) {
//       this.tracks[
//         this.currentTrack
//       ].sources[0].src = `../audio/track-${this.currentTrack}.mp3`;
//       this.player.source = this.tracks[this.currentTrack];
//       this.irisActive = false;
//     } else {
//       this.tracks[
//         this.currentTrack
//       ].sources[0].src = `../audio/track-${this.currentTrack}-iris.mp3`;
//       this.player.source = this.tracks[this.currentTrack];
//       this.irisActive = true;
//     }
//     await this.player.play();
//     this.player.currentTime = this.currentTime;
//     console.log(this.player.source);
//   }
// }

// Creates two players and uses volume to switch between IRIS and normal tracks but shows volume as mute
class Player {
  constructor(element1, element2) {
    this.player = new Plyr(`#${element1}`, {
      controls: ["play", "progress", "current-time", "duration"],
    });
    this.playerIris = new Plyr(`#${element2}`);
    this.tracks = [];
    this.tracksIris = [];
    this.currentTrackIndex;
    this.currentTime;
    this.irisActive = false;
    this.getTracks();
    this.initPlayer();
    this.events();
  }

  // Handles all events assoicated with the Player
  events() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const irisBtn = document.getElementById("irisBtn");

    prevBtn.addEventListener("click", () => this.previousTrack());
    nextBtn.addEventListener("click", () => this.nextTrack());
    irisBtn.addEventListener("click", () => this.initIris());

    // Ensures both players stay in sync
    this.player.on("play", () => this.playBoth());
    this.player.on("pause", () => this.pauseBoth());
    this.player.on("seeking", () => {
      this.syncPlayers();
    });
    this.player.on("seeked", () => {
      this.syncPlayers();
    });
  }

  // Player methods

  // Gets all elements from DOM with a data-track attribute and fills two seperate arrays of source tracks, one for normal and one for IRIS
  getTracks() {
    const tracks = Array.from(document.querySelectorAll("[data-track]"));
    tracks.forEach((el) => {
      const track = {
        type: "audio",
        title: el.innerHTML,
        sources: [
          {
            src: `../audio/${el.dataset.track}.mp3`,
            type: "audio/mp3",
          },
        ],
      };
      const trackIris = {
        type: "audio",
        title: el.innerHTML,
        sources: [
          {
            src: `../audio/${el.dataset.track}-iris.mp3`,
            type: "audio/mp3",
          },
        ],
      };
      this.tracks.push(track);
      this.tracksIris.push(trackIris);
    });
  }

  // Initiates player on creation and loads first track while muting the IRIS player
  initPlayer() {
    this.player.source = this.tracks[0];
    this.playerIris.source = this.tracksIris[0];
    this.playerIris.volume = 0;
  }

  // Ensures IRIS player is played at the same time as the player
  playBoth() {
    this.playerIris.play();
  }

  // Ensures IRIS player is paused at the same time as the player
  pauseBoth() {
    this.playerIris.pause();
  }

  // Ensures IRIS player is synced at the same time as the player if seeked
  syncPlayers() {
    this.currentTime = this.player.currentTime;
    this.playerIris.currentTime = this.currentTime;
    console.log(this.currentTime);
    console.log(this.player.currentTime);
    console.log(this.playerIris.currentTime);
  }

  previousTrack() {
    if (this.currentTrackIndex === 0) return;
    this.currentTrackIndex--;
    this.player.source = this.tracks[this.currentTrackIndex];
    this.playerIris.source = this.tracksIris[this.currentTrackIndex];
    this.checkIris();
  }

  nextTrack() {
    if (this.currentTrackIndex === this.tracks.length) return;
    this.currentTrackIndex++;
    this.player.source = this.tracks[this.currentTrackIndex];
    this.playerIris.source = this.tracksIris[this.currentTrackIndex];
    this.checkIris();
  }

  // If IRIS is active when switching tracks ensure the correct player is muted
  checkIris() {
    if (this.irisActive) {
      this.player.volume = 0;
      this.playerIris.volume = 1;
    }
  }

  initIris() {
    if (this.irisActive) {
      this.playerIris.volume = 0;
      this.player.volume = 1;
      this.irisActive = false;
    } else {
      this.player.volume = 0;
      this.playerIris.volume = 1;
      this.irisActive = true;
    }
    this.syncPlayers();
  }
}

// class Player {
//   constructor(element) {
//     // this.player = new Plyr(`#${element}`, {
//     //   controls: ["play", "progress", "current-time", "duration", "volume"],
//     // });
//     // this.playerIris = new Plyr(`#${element2}`);
//     // this.player = document.querySelector("audio");
//     this.tracks = [];
//     this.tracksIris = [];
//     this.currentTrackIndex;
//     this.currentTime;
//     this.irisActive = false;
//     // this.audioElement = document.querySelector("audio");
//     this.getTracks();
//     this.initPlayer();
//     // this.initAudioContext();
//     this.events();
//     // this.gainNode1;
//     // this.gainNode2;
//   }

//   // Handles all events assoicated with the Player
//   events() {
//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");
//     const irisBtn = document.getElementById("irisBtn");
//     const playBtn = document.getElementById("playBtn");

//     prevBtn.addEventListener("click", () => this.previousTrack());
//     nextBtn.addEventListener("click", () => this.nextTrack());
//     irisBtn.addEventListener("click", () => this.initIris());

//     this.player.onplay = () => {
//       if (!this.audioContext) {
//         this.initAudioContext();
//       }
//       this.play();
//     };
//     this.player.onpause = () => this.pause();
//     this.player.onseeking = () => this.syncPlayers();
//     this.player.onseeked = () => this.syncPlayers();
//   }

//   // Player methods

//   initAudioContext() {
//     const AudioContext = window.AudioContext || window.webkitAudioContext;
//     this.audioContext = new AudioContext();
//     let track1 = this.audioContext.createMediaElementSource(this.player);
//     let track2 = this.audioContext.createMediaElementSource(this.irisPlayer);

//     this.gainNode1 = this.audioContext.createGain();
//     this.gainNode2 = this.audioContext.createGain();
//     this.gainNode2.gain.value = 0;

//     track1.connect(this.gainNode1).connect(this.audioContext.destination);
//     track2.connect(this.gainNode2).connect(this.audioContext.destination);
//   }

//   // Gets all elements from DOM with a data-track attribute and fills two seperate arrays of source tracks, one for normal and one for IRIS
//   getTracks() {
//     const tracks = Array.from(document.querySelectorAll("[data-track]"));
//     tracks.forEach((el) => {
//       this.tracks.push(`../audio/${el.dataset.track}.mp3`);
//       this.tracksIris.push(`../audio/${el.dataset.track}-iris.mp3`);
//     });
//   }

//   // Initiates player on creation and loads first track while muting the IRIS player
//   initPlayer() {
//     this.playerIris = document.createElement("audio");
//     document.body.appendChild(this.playerIris);
//     this.currentTrackIndex = 0;
//     [this.player, this.irisPlayer] = Array.from(
//       document.querySelectorAll("audio")
//     );
//     this.player.src = this.tracks[this.currentTrackIndex];
//     this.irisPlayer.src = this.tracksIris[this.currentTrackIndex];
//   }

//   // Ensures IRIS player is played at the same time as the player
//   play() {
//     this.irisPlayer.play();
//   }

//   // Ensures IRIS player is paused at the same time as the player
//   pause() {
//     this.irisPlayer.pause();
//   }

//   // Ensures IRIS player is synced at the same time as the player if seeked
//   syncPlayers() {
//     this.currentTime = this.player.currentTime;
//     this.irisPlayer.currentTime = this.currentTime;
//   }

//   previousTrack() {
//     if (this.currentTrackIndex === 0) return;
//     this.currentTrackIndex--;
//     this.player.source = this.tracks[this.currentTrackIndex];
//     this.playerIris.source = this.tracksIris[this.currentTrackIndex];
//     this.checkIris();
//   }

//   nextTrack() {
//     if (this.currentTrackIndex === this.tracks.length) return;
//     this.currentTrackIndex++;
//     this.player.source = this.tracks[this.currentTrackIndex];
//     this.playerIris.source = this.tracksIris[this.currentTrackIndex];
//     this.checkIris();
//   }

//   // If IRIS is active when switching tracks ensure the correct player is muted
//   checkIris() {
//     if (this.irisActive) {
//       this.player.volume = 0;
//       this.playerIris.volume = 1;
//     }
//   }

//   initIris() {
//     if (this.irisActive) {
//       this.gainNode2.gain.value = 0;
//       this.gainNode1.gain.value = 1;
//       this.irisActive = false;
//     } else {
//       this.gainNode1.gain.value = 0;
//       this.gainNode2.gain.value = 1;
//       this.irisActive = true;
//     }
//   }
// }

// Howler
// class Player {
//   constructor(element) {
//     // this.player = new Plyr(`#${element}`, {
//     //   controls: ["play", "progress", "current-time", "duration", "volume"],
//     // });
//     // this.playerIris = new Plyr(`#${element2}`);
//     // this.player = document.querySelector("audio");
//     this.tracks = [];
//     this.tracksIris = [];
//     this.howlTracks = [];
//     this.currentTrackIndex;
//     this.currentTime;
//     this.currentTrack;
//     this.currentIrisTrack;
//     this.irisActive = false;
//     // this.audioElement = document.querySelector("audio");
//     this.getTracks();
//     // this.initPlayer();
//     // this.initAudioContext();
//     this.events();
//     // this.gainNode1;
//     // this.gainNode2;
//   }

//   // Handles all events assoicated with the Player
//   events() {
//     const prevBtn = document.getElementById("prevBtn");
//     const nextBtn = document.getElementById("nextBtn");
//     const irisBtn = document.getElementById("irisBtn");
//     const playBtn = document.getElementById("playBtn");
//     const pauseBtn = document.getElementById("pauseBtn");

//     prevBtn.addEventListener("click", () => this.previousTrack());
//     nextBtn.addEventListener("click", () => this.nextTrack());
//     irisBtn.addEventListener("click", () => this.initIris());
//     playBtn.addEventListener("click", () => this.play());
//     pauseBtn.addEventListener("click", () => this.pause());

//     // this.player.onplay = () => {
//     //   if (!this.audioContext) {
//     //     this.initAudioContext();
//     //   }
//     //   this.play();
//     // };
//     // this.player.onpause = () => this.pause();
//     // this.player.onseeking = () => this.syncPlayers();
//     // this.player.onseeked = () => this.syncPlayers();
//   }

//   // Player methods

//   initAudioContext() {
//     // const AudioContext = window.AudioContext || window.webkitAudioContext;
//     // this.audioContext = new AudioContext();
//     // let track1 = this.audioContext.createMediaElementSource(this.player);
//     // let track2 = this.audioContext.createMediaElementSource(this.irisPlayer);
//     // this.gainNode1 = this.audioContext.createGain();
//     // this.gainNode2 = this.audioContext.createGain();
//     // this.gainNode2.gain.value = 0;
//     // track1.connect(this.gainNode1).connect(this.audioContext.destination);
//     // track2.connect(this.gainNode2).connect(this.audioContext.destination);
//     // const AudioContext = window.AudioContext || window.webkitAudioContext;
//     // this.audioContext = new AudioContext();
//     // this.audioContext
//     //   .decodeAudioData(this.tracks[0])
//     //   .then(function (decodedData) {
//     //     console.log(decodedData);
//     //   });
//   }

//   // Gets all elements from DOM with a data-track attribute and fills two seperate arrays of source tracks, one for normal and one for IRIS
//   getTracks() {
//     const tracks = Array.from(document.querySelectorAll("[data-track]"));
//     tracks.forEach((el) => {
//       const track = {
//         normal: new Howl({
//           src: [` ../audio/${el.dataset.track}.mp3`],
//           // mute: true,
//         }),
//         iris: new Howl({
//           src: [`../audio/${el.dataset.track}-iris.mp3`],
//           volume: 0,
//           // mute: true,
//         }),
//       };

//       this.tracks.push(track);
//     });
//     this.currentTrackIndex = 0;
//   }

//   // Initiates player on creation and loads first track while muting the IRIS player
//   initPlayer() {
//     // this.playerIris = document.createElement("audio");
//     // document.body.appendChild(this.playerIris);
//     // this.currentTrackIndex = 0;
//     // [this.player, this.irisPlayer] = Array.from(
//     //   document.querySelectorAll("audio")
//     // );
//     // this.player.src = this.tracks[this.currentTrackIndex];
//     // this.irisPlayer.src = this.tracksIris[this.currentTrackIndex];
//     // this.tracks.forEach((track, index) => {
//     //   this.howlTracks[index] = new Howl({
//     //     src: track,
//     //   });
//     // });
//     // console.log(this.howlTracks);
//   }

//   // Ensures IRIS player is played at the same time as the player
//   play() {
//     // this.irisPlayer.play();
//     this.currentTrack = this.tracks[this.currentTrackIndex].normal.play();
//     this.currentIrisTrack = this.tracks[this.currentTrackIndex].iris.play();
//     // console.log(this.tracks[this.currentTrackIndex].normal.volume);
//     // console.log(this.tracks[this.currentTrackIndex].iris.volume);
//   }

//   // Ensures IRIS player is paused at the same time as the player
//   pause() {
//     this.tracks[this.currentTrackIndex].normal.pause();
//     this.tracks[this.currentTrackIndex].iris.pause();
//   }

//   // Ensures IRIS player is synced at the same time as the player if seeked
//   syncPlayers() {
//     this.currentTime = this.player.currentTime;
//     this.irisPlayer.currentTime = this.currentTime;
//   }

//   previousTrack() {
//     if (this.currentTrackIndex === 0) return;
//     this.currentTrackIndex--;
//     this.player.source = this.tracks[this.currentTrackIndex];
//     this.playerIris.source = this.tracksIris[this.currentTrackIndex];
//     this.checkIris();
//   }

//   nextTrack() {
//     if (this.currentTrackIndex === this.tracks.length) return;
//     this.currentTrackIndex++;
//     this.player.source = this.tracks[this.currentTrackIndex];
//     this.playerIris.source = this.tracksIris[this.currentTrackIndex];
//     this.checkIris();
//   }

//   // If IRIS is active when switching tracks ensure the correct player is muted
//   checkIris() {
//     if (this.irisActive) {
//       this.player.volume = 0;
//       this.playerIris.volume = 1;
//     }
//   }

//   initIris() {
//     console.log(this.tracks[this.currentTrackIndex].iris.volume());
//     if (this.irisActive) {
//       this.tracks[this.currentTrackIndex].iris.volume(0, this.currentIrisTrack);
//       this.tracks[this.currentTrackIndex].normal.volume(1, this.currentTrack);
//       this.irisActive = false;
//     } else {
//       this.tracks[this.currentTrackIndex].normal.volume(0, this.currentTrack);
//       this.tracks[this.currentTrackIndex].iris.volume(1, this.currentIrisTrack);
//       this.irisActive = true;
//     }
//   }
// }

export default Player;
