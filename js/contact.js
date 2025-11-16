// Aos js
AOS.init();
AOS.refresh();
// vanila js
VanillaTilt.init(document.querySelector(".choose-main"), {
  max: 25, // maximum tilt rotation (degrees)
  speed: 400, // speed of the enter/exit transition
  glare: true, // enables glare effect
  "max-glare": 0.3, // maximum glare opacity
  scale: 1.05, // slightly zoom in while tilting
});
