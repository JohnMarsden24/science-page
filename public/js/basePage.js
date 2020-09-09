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

export function createScrollAnimationSingle(options) {
  ScrollTrigger.create(options);
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
        delay: 0.5,
        stagger: 0.1,
      });
  } else {
    const targets = document.querySelectorAll(".flow-key-markers__block");
    targets.forEach((target) => {
      gsap.from(target, {
        scrollTrigger: {
          trigger: target,
          //   markers: true,
          start: "top center",
          toggleActions: "restart none none reset",
        },
        duration: 0.5,
        opacity: 0,
        delay: 0.5,
      });
    });
  }
}

export function createScrollAnimationMultiple(arr) {
  arr.forEach((target, index) => {
    const pinSpacing = index === arr.length - 1 ? "true" : false;
    const end =
      index === arr.length - 1
        ? `+=${target.offsetHeight}px`
        : `+=${arr[index + 1].offsetHeight}px`;
    const opacityFirst = index === 0 ? 1 : 0;
    const opacitySecond = index === arr.length - 1 ? 1 : 0;
    const tl = gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: target,
          pin: true,
          scrub: true,
          start: "center center",
          end,
          // markers: true,
          toggleActions: "restart none reverse reset",
          pinSpacing: pinSpacing,
          snap: 0.25,
        },
      })
      .from(target, { opacity: opacityFirst, duration: 0.2 }, 0)
      .to(target, { opacity: opacitySecond, duration: 0.2 }, 0.8);
  });
}

export function newScrollAnimationMultiple(arr) {
  arr.forEach((elem, index) => {
    const reversed = index % 2 !== 0;
    const [img, textBlock] = [...elem.childNodes];
    const [title, text] = [...textBlock.childNodes];
    loadLottie(img);
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.6,
        ease: "slow(0.5, 0.4, false)",
        opacity: 0,
      },
      scrollTrigger: {
        trigger: elem,
        toggleActions: "restart none none reverse",
        // markers: true,
        start: "top center",
      },
    });

    const elements = { img, title, text, elem, timeline };

    if (window.innerWidth < 768) {
      addToTimelineMobile(elements);
    } else if (reversed) {
      addToTimelineRight(elements);
    } else {
      addToTimelineLeft(elements);
    }
  });
}

function addToTimelineLeft(options) {
  const { timeline, img, title, text, elem } = options;
  timeline
    .from(img, { x: "-50px", onComplete: parallaxImg(img, elem) })
    .from(title, { x: "50px" }, "-=.2")
    .from(text, { x: "50px" }, "-=.2");
}

function addToTimelineRight(options) {
  const { timeline, img, title, text, elem } = options;
  timeline
    .from(title, { x: "-50px", onComplete: parallaxImg(img, elem) })
    .from(text, { x: "-50px" }, "-=.2")
    .from(img, { x: "50px" }, "-=.2");
}

function addToTimelineMobile(options) {
  const { timeline, img, title, text, elem } = options;
  timeline
    .from(img, { y: "50px", onComplete: parallaxImg(img, elem) })
    .from(title, { y: "50px" }, "-=.2")
    .from(text, { y: "50px" }, "-=.2");
}

function parallaxImg(img, trigger) {
  gsap.to(img, {
    scrollTrigger: {
      trigger,
      start: "center center",
      scrub: 1,
      // markers: true,
    },
    // y: "-200px",
    yPercent: -40,
    ease: "slow(0.5, 0.4, false)",
  });
}

function loadLottie(container) {
  const animationName = container.dataset.animation;
  lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: `../animations/${animationName}.json`,
  });
}

export function newScrollAnimationFlowBother(arr) {
  arr.forEach((target, index) => {
    const img = target.childNodes[0];
    const opacityFirst = index === 0 ? 1 : 0;
    const opacitySecond = index === arr.length - 1 ? 1 : 0;
    const end = index === arr.length - 1 ? "bottom bottom" : "bottom top";
    const pinSpacing = index === arr.length - 1 ? true : false;
    gsap.timeline({
      scrollTrigger: {
        trigger: img,
        start: "top top",
        pin: true,
        // scrub: 1,
        markers: true,
        // end,
        // snap: 1,
        // pinSpacing,
      },
    });
    // .to(img, { y: -50 });
    // .from(img, { opacity: opacityFirst, duration: 0.2 });
    // .to(img, { opacity: opacitySecond, duration: 0.2 });

    // const pinSpacing = index === arr.length - 1 ? "true" : false;
    // const end =
    //   index === arr.length - 1
    //     ? `+=${target.offsetHeight}px`
    //     : `+=${arr[index + 1].offsetHeight}px`;
    // const opacityFirst = index === 0 ? 1 : 0;
    // const opacitySecond = index === arr.length - 1 ? 1 : 0;
    // const tl = gsap.timeline({
    //   // defaults: { duration: 1 },
    //   scrollTrigger: {
    //     trigger: target,
    //     pin: true,
    //     scrub: true,
    //     start: "center center",
    //     end,
    //     markers: true,
    //     toggleActions: "restart none reverse reset",
    //     pinSpacing: pinSpacing,
    //     snap: 0.25,
    //   },
    // });
    // .from(target, { opacity: opacityFirst, duration: 0.2 }, 0)
    // .to(target, { opacity: opacitySecond, duration: 0.2 }, 0.8);
  });
}

const container = document.querySelector(".new-flow-bother-container");

export function newScrollAnimationFlowBotherText(arr) {
  // const arr = elem.childNodes;
  arr.forEach((target, index) => {
    const opacityFirst = index === 0 ? 1 : 0.2;
    const opacitySecond = index === arr.length - 1 ? 1 : 0.2;
    // const end = index === arr.length - 1 ? "bottom bottom" : "bottom top";
    // const pinSpacing = index === arr.length - 1 ? true : false;
    gsap
      .timeline({
        scrollTrigger: {
          trigger: target,
          start: "top 60%",
          end: `+=${target.offsetHeight}px`,
          toggleActions: "restart none reverse reverse",
          scrub: true,
          markers: true,
          onEnter: () => changeImg(target),
          onEnterBack: () => changeImg(target),
        },
      })
      .from(target, { opacity: opacityFirst, duration: 0.2 }, 0)
      .to(target, { opacity: opacitySecond, duration: 0.2 }, 0.8);
  });
}

function changeImg(elem) {
  const img = document.getElementById("flow-bother-img");
  const newSource = elem.dataset.img;
  container.style.backgroundColor = elem.dataset.bgcolor;
  container.style.color = elem.dataset.textcolor;

  img.src = newSource;
}

function changeBgColor(elem) {}

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
