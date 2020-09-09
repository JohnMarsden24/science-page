import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  newScrollAnimationMultiple,
  newScrollAnimationFlowBother,
  newScrollAnimationFlowBotherText,
  createScrollAnimationSingle,
  createScrollAnimationMultiple,
  createScrollFadeInAnimationTimeline,
  lottieLoader,
  toggleActive,
  parallaxAnimation,
} from "./basePage";

gsap.registerPlugin(ScrollTrigger);

const animatedCards = document.querySelectorAll(".animated-card");
// const flowBotherCards = document.querySelectorAll(".flow-bother-card");
const newFlowBotherCards = document.querySelectorAll(".new-flow-bother-card");
const newFlowBotherGrid = document.querySelectorAll(".new-flow-bother-grid");
const newFlowBotherText = document.querySelectorAll(".new-flow-bother-text");

const flowBotherTitle = document.querySelector(".flow-bother-title");
const flowKeyMarkers = document.querySelector(".flow-key-markers");
const waveTitles = document.querySelector(".wave-container__titles");

// waveTitles.addEventListener("click", toggleActive);

// const totalHeight = Array.from(flowBotherCards).reduce(
//   (acc, curr) => acc + curr.offsetHeight,
//   0
// );

// const flowBotherTitleOptions = {
//   trigger: flowBotherCards[0],
//   pin: flowBotherTitle,
//   scrub: true,
//   start: "center center",
//   end: `+=${totalHeight}px`,
//   // markers: true,
//   pinSpacing: false,
// };

newScrollAnimationMultiple(animatedCards);
// newScrollAnimationFlowBother(newFlowBotherCards);
newScrollAnimationFlowBother(newFlowBotherGrid);
newScrollAnimationFlowBotherText(newFlowBotherText);

// createScrollAnimationMultiple(targetCards);
// createScrollAnimationMultiple(flowBotherCards);
// createScrollAnimationSingle(flowBotherTitleOptions);
createScrollFadeInAnimationTimeline();
lottieLoader();
// parallaxAnimation();

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
