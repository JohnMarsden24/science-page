const lottie = require("lottie-web");
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function toggleActive(event) {
  const closestText = event.target.closest("p");
  if (closestText) {
    const waveType = closestText.dataset.wave;
    const previousWaveList = document.querySelectorAll(".active");
    previousWaveList.forEach((elem) => elem.classList.remove("active"));
    const waveList = document.querySelectorAll(`[data-wave='${waveType}']`);
    waveList.forEach((elem) => elem.classList.add("active"));
  }
}

export function parallaxAnimation() {
  if (window.innerWidth > 768) {
    const targets = document.querySelectorAll(".improve-container");
    targets.forEach((elem, index) => {
      const [title, text, img] = [...elem.childNodes];
      gsap.to(img, {
        // yPercent: -40,
        y: "-200px",
        ease: "none",
        scrollTrigger: {
          trigger: title,
          start: "center center",
          // start: "top bottom", // the default values
          // end: "+=200px",
          scrub: true,
          // markers: true,
        },
      });
      if (index === targets.length - 1) {
        gsap.to(elem, {
          // yPercent: -40,
          paddingTop: "200px",
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "center center",
            // start: "top bottom", // the default values
            // end: "+=200px",
            scrub: true,
            // markers: true,
          },
        });
      }
    });
  }
}

export function createScrollFadeInAnimationTimeline(options) {
  if (window.innerWidth > 768) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".flow-key-markers__container",
          start: "top 80%",
          //   markers: true,
          toggleActions: "restart none none reset",
        },
      })
      .from(".flow-key-markers__block", {
        duration: 0.5,
        opacity: 0,
        delay: 0.4,
        stagger: 0.1,
      });
  } else {
    const targets = document.querySelectorAll(".flow-key-markers__block");
    targets.forEach((target) => {
      gsap.from(target, {
        scrollTrigger: {
          trigger: target,
          //   markers: true,
          start: "top 80%",
          toggleActions: "restart none none reset",
        },
        duration: 0.5,
        opacity: 0,
        delay: 0.4,
      });
    });
  }
}

export function createScrollAnimationMultiple(arr, options) {
  let { loadLottie, parallax } = options;
  arr.forEach((elem, index) => {
    const reversed = index % 2 !== 0;
    const [img, textBlock] = [...elem.childNodes];
    const [title, text] = [...textBlock.childNodes];
    if (loadLottie) loadLottieAnimation(img);

    const timeline = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: "slow(0.5, 0.4, false)",
        opacity: 0,
        y: "50px",
      },
      scrollTrigger: {
        trigger: elem,
        toggleActions: "restart none none reverse",
        // markers: true,
        start: "top 75%",
        end: "bottom center",
      },
    });

    const elements = { img, title, text, elem, timeline, options };

    if (window.innerWidth < 768 && parallax) {
      if (img.dataset.mob) {
        changeImgForMobile(img);
      }
      parallaxImgMobile(img, elem);
    } else if (parallax) {
      parallaxImg(img, elem);
    }

    if (window.innerWidth < 768) {
      addToTimelineMobile(elements);
    } else if (reversed) {
      addToTimelineRight(elements);
    } else {
      addToTimelineLeft(elements);
    }
  });
}

function addToTimelineLeft(elements) {
  const { timeline, img, title, text, elem, options } = elements;
  timeline.from(title, {}, "-=.2").from(text, {}, "-=.2").from(img, {});
}

function addToTimelineRight(elements) {
  const { timeline, img, title, text, elem, options } = elements;

  timeline.from(img, {}).from(title, {}, "-=.2").from(text, {}, "-=.2");
}

function addToTimelineMobile(elements) {
  const { timeline, img, title, text, elem, options } = elements;
  timeline.from(title, {}, "-=.2").from(text, {}, "-=.2").from(img, {});
}

function parallaxImg(img, trigger) {
  gsap.to(img, {
    scrollTrigger: {
      trigger,
      start: "top center",
      scrub: 1,
      end: "bottom center",
      // markers: true,
    },
    y: -100,
    ease: "slow(0.5, 0.4, false)",
  });
}

function parallaxImgMobile(img, trigger) {
  gsap.from(img, {
    scrollTrigger: {
      trigger,
      start: "top 75%",
      scrub: 1,
      end: "bottom center",
      // markers: true,
    },
    y: 100,
    ease: "slow(0.5, 0.4, false)",
  });
}

function loadLottieAnimation(container) {
  const animationName = container.dataset.animation;
  lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: `../animations/${animationName}.json`,
  });
}

function changeImgForMobile(img) {
  img.src = img.dataset.mob;
}

const container = document.querySelector(".new-flow-bother-container");

export function newScrollAnimationFlowBotherText(arr) {
  arr.forEach((target, index) => {
    const opacityFirst = index === 0 ? 1 : 0.2;
    const opacitySecond = index === arr.length - 1 ? 1 : 0.2;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: target,
          start: "top 60%",
          end: `+=${target.offsetHeight}px`,
          toggleActions: "restart none reverse reverse",
          scrub: true,
          // markers: true,
          onEnter: () => changeImg(target),
          onEnterBack: () => changeImg(target),
        },
      })
      .from(target, { opacity: opacityFirst, duration: 0.2 }, 0)
      .to(target, { opacity: opacitySecond, duration: 0.2 }, 0.8);
  });
}

function changeImg(elem) {
  const originalImg = document.querySelector(".img-show");
  originalImg.classList.remove("img-show");
  const newImg = document.getElementById(`flow-bother-${elem.dataset.img}`);
  newImg.classList.add("img-show");

  // const newSource = elem.dataset.img;
  container.style.backgroundColor = elem.dataset.bgcolor;
  container.style.color = elem.dataset.textcolor;

  // img.src = newSource;
}

export function lottieLoader() {
  function loadCircles() {
    lottie.loadAnimation({
      container: document.getElementById("a1"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "../animations/hero_circles.json",
    });
  }

  let animation2 = lottie.loadAnimation({
    container: document.getElementById("a2"),
    renderer: "svg",
    loop: false,
    autoplay: true,
    path: "../animations/iris_switch.json",
  });

  animation2.addEventListener("complete", loadCircles);
}
