import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  createScrollAnimationSingle,
  createScrollAnimationMultiple,
  createScrollFadeInAnimationTimeline,
  lottieLoader,
  toggleActive,
  parallaxAnimation,
} from "./basePage";

gsap.registerPlugin(ScrollTrigger);

const targetCards = document.querySelectorAll(".card");
const flowBotherCards = document.querySelectorAll(".flow-bother-card");
const flowBotherTitle = document.querySelector(".flow-bother-title");
const flowKeyMarkers = document.querySelector(".flow-key-markers");
const waveTitles = document.querySelector(".wave-container__titles");

waveTitles.addEventListener("click", toggleActive);

const totalHeight = Array.from(flowBotherCards).reduce(
  (acc, curr) => acc + curr.offsetHeight,
  0
);

const flowBotherTitleOptions = {
  trigger: flowBotherCards[0],
  pin: flowBotherTitle,
  scrub: true,
  start: "center center",
  end: `+=${totalHeight}px`,
  // markers: true,
  pinSpacing: false,
};

if (targetCards && flowBotherCards) {
  createScrollAnimationMultiple(targetCards);
  createScrollAnimationMultiple(flowBotherCards);
  createScrollAnimationSingle(flowBotherTitleOptions);
  createScrollFadeInAnimationTimeline();
  lottieLoader();
  parallaxAnimation();
}

// createTestAnimation();

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
