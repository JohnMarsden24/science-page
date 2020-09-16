import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  createScrollAnimationMultiple,
  createFadeInAnimation,
  lottieLoader,
} from "./basePage";

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
