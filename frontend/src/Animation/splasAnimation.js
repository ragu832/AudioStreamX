// src/Animation/splasAnimation.js
import gsap from "gsap";

export const splashAnim = () => {
  gsap.from(".text-container", {
    opacity: 0,
    y: 0,
    duration: 2,
    ease: "power3.out",
  });
  
  gsap.to(".text-container", {
    opacity: 1,
    y: 0,
    duration: 3,
    delay: 2,  // This delay gives time for the initial animation to finish
    ease: "power3.out",
  });
};
