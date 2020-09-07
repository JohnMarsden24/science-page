import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".test-container");
const block = document.querySelector(".test-block");

export function createTestAnimation() {
  if (container && block) {
    const topContainerHeight =
      container.offsetHeight / 2 - block.offsetHeight / 2;
    gsap.to(".side-1", {
      x: -1000,
      scrollTrigger: {
        trigger: ".side-1",
        start: "center center",
        end: `+=${topContainerHeight}px`,
        // endTrigger: ".lower-container",
        // markers: true,
        toggleActions: "restart none reverse reset",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    gsap.to(".side-2", {
      x: 1000,
      scrollTrigger: {
        trigger: ".side-2",
        start: "center center",
        end: `+=${topContainerHeight}px`,
        // endTrigger: ".test-container",

        // endTrigger: ".test-title",
        // markers: true,
        toggleActions: "restart none reverse reset",
        scrub: true,
        pin: true,
        pinSpacing: false,
      },
    });

    gsap.to(".test-block", {
      rotation: 360,
      scrollTrigger: {
        trigger: ".test-block",
        scrub: true,
        pin: true,
        start: "center center",
        end: `+=${topContainerHeight}px`,
        // endTrigger: ".lower-container",
        // markers: true,
        pinSpacing: false,
      },
    });

    const testBlocks = document.querySelectorAll(".lower__test-block");

    testBlocks.forEach((elem) => {
      console.log(`+=${elem.parentNode.offsetHeight}px`);
      let tl2 = gsap
        .timeline({
          // defaults: { duration: 1 },
          scrollTrigger: {
            trigger: elem,
            start: "center center",
            pin: true,
            end: `+=${elem.offsetHeight}px`,
            toggleActions: "restart none reverse reset",
            // markers: true,
            scrub: true,
          },
        })
        .from(elem, { opacity: 0, duration: 0.2 }, 0)
        .to(elem, { opacity: 0, duration: 0.2 }, 0.8);
    });

    let newVal = screen.width;

    const newTl = gsap
      .timeline({
        scrollTrigger: {
          trigger: ".lower__test-block-new",
          start: "center center",
          pin: true,
          end: "+=2000px",
          scrub: true,
          toggleActions: "restart none reverse reset",
          markers: true,
        },
      })
      .from(".lower__test-block-new", {
        x:
          -newVal / 2 +
          document.querySelector(".lower__test-block-new").clientWidth,
        y: 0,
      })
      .to(".lower__test-block-new", {
        x: 0,
        y: 0,
      })
      .to(".lower__test-block-new", {
        x: 300,
        y: 300,
        rotation: 360,
      });
  }
}
