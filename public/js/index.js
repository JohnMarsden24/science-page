import "regenerator-runtime/runtime";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  createScrollAnimationMultiple,
  createFadeInAnimation,
  lottieLoader,
} from "./basePage";
import Player from "./player";

gsap.registerPlugin(ScrollTrigger);

const animatedCards = document.querySelectorAll(".card--animated");
const parallaxCards = document.querySelectorAll(".parallax");
const waveCards = document.querySelectorAll(".wave-card");

const animateOpts = { loadLottie: true, parallax: false };
const parallaxOpts = { loadLottie: false, parallax: true };
const waveOpts = { loadLottie: false, parallax: false };

ScrollTrigger.refresh();

createScrollAnimationMultiple(animatedCards, animateOpts);
createScrollAnimationMultiple(parallaxCards, parallaxOpts);
createScrollAnimationMultiple(waveCards, waveOpts);

createFadeInAnimation();
lottieLoader();

// Audio Player testing

const playList = document.getElementById("playlist");

if (playList) {
  new Player("player1", "player2");
}

const tracks = [
  {
    type: "audio",
    title: "track 0",
    sources: [
      {
        src: "../audio/track-0.mp3",
        type: "audio/mp3",
      },
    ],
  },
  {
    type: "audio",
    title: "track 1",
    sources: [
      {
        src: "../audio/track-1.mp3",
        type: "audio/mp3",
      },
    ],
  },
];

// const player = new Player("player1", tracks);

// const AudioContext = window.AudioContext || window.webkitAudioContext;

// const audioContext = new AudioContext();

// // get the audio element
// const audioElements = document.querySelectorAll("audio");
// let track1 = audioContext.createMediaElementSource(audioElements[0]);
// let track2 = audioContext.createMediaElementSource(audioElements[1]);

// // pass it into the audio context

// const playButton = document.getElementById("playBtn");

// playButton.addEventListener(
//   "click",
//   function () {
//     // play or pause track depending on state
//     if (audioContext.state === "suspended") {
//       audioContext.resume();
//       this.dataset.playing = "true";
//     } else {
//       audioElements[0].play();
//       audioElements[1].play();

//       this.dataset.playing = "false";
//     }
//   },
//   false
// );

// // audioElement.addEventListener(
// //   "ended",
// //   () => {
// //     playButton.dataset.playing = "false";
// //   },
// //   false
// // );

// const gainNode = audioContext.createGain();
// const gainNode2 = audioContext.createGain();

// track1.connect(gainNode).connect(audioContext.destination);
// track2.connect(gainNode2).connect(audioContext.destination);
// gainNode2.gain.value = 0;

// const volumeControl = document.querySelector("#volume");

// volumeControl.addEventListener(
//   "input",
//   function () {
//     if (irisOn) {
//       gainNode2.gain.value = this.value;
//     } else {
//       gainNode.gain.value = this.value;
//     }
//   },
//   false
// );

// let irisOn = false;

// const irisBtn = document.getElementById("irisBtn");
// irisBtn.addEventListener("click", () => {
//   if (irisOn) {
//     gainNode.gain.value = 1;
//     gainNode2.gain.value = 0;
//     console.log("Iris off");
//     irisOn = false;
//   } else {
//     gainNode.gain.value = 0;
//     gainNode2.gain.value = 1;
//     console.log("Iris on");

//     irisOn = true;
//   }
// });
