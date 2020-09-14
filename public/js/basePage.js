const lottie = require("lottie-web");
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function createFadeInAnimation(options) {
  if (window.innerWidth > 768) {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".flow-key-markers__container",
          start: "top 80%",
          //   markers: true,
          toggleActions: "play none none none",
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
          toggleActions: "play none none none",
        },
        duration: 0.5,
        opacity: 0,
        delay: 0.4,
      });
    });
  }
}

export function createScrollAnimationMultiple(arr, options) {
  // LOADS VALUES FROM OPTIONS
  let { loadLottie, parallax } = options;

  arr.forEach((elem, index) => {
    // GET ALL CHILD ELEMENTS AND FILTER THAT LIST TO KEEP H2, H3, P, DIV AND IMG
    const HTMLelements = elem.getElementsByTagName("*");
    const filteredElems = filterElements(HTMLelements);

    // REMOVE IMG FROM RETURNED FILTERED ARRAY AND PUT IT AT THE END
    const img = filteredElems.shift();
    filteredElems.push(img);

    // LOAD ANIMATION IF THE OPTION IS PASSED
    if (loadLottie) {
      const animationContainer = elem.getElementsByClassName(
        "animation-container"
      )[0];
      loadLottieAnimation(animationContainer);
    }

    // LOAD IMG PARALLAX IF THE OPTION IS PASSED AS WELL AS DETECT IF THE IMG SHOULD CHANGE FOR MOBILE
    if (window.innerWidth < 768 && parallax) {
      if (img.dataset.mob) {
        changeImgForMobile(img);
      }
      parallaxImgMobile(img, elem);
    } else if (parallax) {
      parallaxImg(img, elem);
    }

    // CREATE FADE IN ANIMATION ON FILTERED AND SORTED CHILDREN ARRAY
    gsap
      .timeline({
        scrollTrigger: {
          trigger: elem,
          start: "top 80%",
          markers: true,
          toggleActions: "play none none none",
        },
      })
      .from(filteredElems, {
        duration: 0.5,
        y: "50px",
        opacity: 0,
        delay: 0.4,
        stagger: 0.2,
      });
  });
}

function filterElements(HTMLelements) {
  // WILL FILTER OUT CHILD ARRAY TO PERSERVE ONLY THOSE ELEMENTS LISTED BELOW
  const elementTypes = ["H2", "H3", "P", "IMG", "DIV"];
  const allElemsArray = Array.from(HTMLelements);
  return allElemsArray.filter((elem) => elementTypes.includes(elem.tagName));
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
