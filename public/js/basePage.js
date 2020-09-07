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
          markers: true,
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
            markers: true,
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
          //   markers: true,
          toggleActions: "restart none reverse reset",
          pinSpacing: pinSpacing,
          snap: 1,
        },
      })
      .from(target, { opacity: opacityFirst, duration: 0.2 }, 0)
      .to(target, { opacity: opacitySecond, duration: 0.2 }, 0.8);
  });
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

  let animation3 = lottie.loadAnimation({
    container: document.getElementById("a3"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "../animations/circle_breathing.json",
  });

  let animation4 = lottie.loadAnimation({
    container: document.getElementById("a4"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "../animations/iris_enables_flow.json",
  });

  let animation5 = lottie.loadAnimation({
    container: document.getElementById("a5"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "../animations/neuro.json",
  });
}
