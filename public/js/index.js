import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  createScrollAnimationMultiple,
  newScrollAnimationFlowBotherText,
  createScrollFadeInAnimationTimeline,
  lottieLoader,
  toggleActive,
  parallaxAnimation,
} from "./basePage";

gsap.registerPlugin(ScrollTrigger);

const animatedCards = document.querySelectorAll(".animated-card");
const parallaxCards = document.querySelectorAll(".parallax-card");
const newFlowBotherText = document.querySelectorAll(".new-flow-bother-text");
const waveTitles = document.querySelector(".wave-container__titles");

const animateOpts = { loadLottie: true, parallax: false };
const parallaxOpts = { loadLottie: false, parallax: true };

createScrollAnimationMultiple(animatedCards, animateOpts);
createScrollAnimationMultiple(parallaxCards, parallaxOpts);
newScrollAnimationFlowBotherText(newFlowBotherText);
createScrollFadeInAnimationTimeline();
lottieLoader();
// parallaxAnimation();

waveTitles.addEventListener("click", toggleActive);

// (function (doc, win) {
//   var docEl = doc.documentElement,
//     recalc = function () {
//       var clientWidth = docEl.clientWidth;
//       if (!clientWidth) return;
//       if (clientWidth < 1000) {
//         return (docEl.style.fontSize = "1rem");
//       }
//       docEl.style.fontSize = clientWidth / 1440 + "rem";
//       docEl.style.fontSize;
//       docEl.style.display = "none";
//       docEl.clientWidth; // Force relayout - important to new Androids
//       docEl.style.display = "";
//     };

//   // Abort if browser does not support addEventListener
//   if (!doc.addEventListener) return;

//   // Test rem support
//   var div = doc.createElement("div");
//   div.setAttribute("style", "font-size: 1rem");

//   // Abort if browser does not recognize rem
//   if (div.style.fontSize != "1rem") return;

//   win.addEventListener("resize", recalc, false);
//   doc.addEventListener("DOMContentLoaded", recalc, false);
// })(document, window);
