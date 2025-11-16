document.addEventListener("DOMContentLoaded", () => {
  // Aos js
  AOS.init();
  // Initialize Swiper
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 25,
      },
      1280: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });
  // banner-counter
  const counters = document.querySelectorAll(".banner-box h1");
  const speed = 300; // slower animation (higher = slower)

  // Counter animation function
  function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.getAttribute("data-suffix") || "";
    const prefix = counter.getAttribute("data-prefix") || "";
    let count = 0;

    const updateCount = () => {
      const inc = target / speed;
      if (count < target) {
        count += inc;
        if (suffix === "M") {
          counter.textContent = `${prefix}${count.toFixed(1)}${suffix}`;
        } else {
          counter.textContent = `${prefix}${Math.ceil(count)}${suffix}`;
        }
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = `${prefix}${target}${suffix}`;
      }
    };

    updateCount();
  }

  // Intersection observer – triggers each time visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          counters.forEach((counter) => {
            counter.textContent = "0"; // reset
            animateCounter(counter);
          });
        }
      });
    },
    { threshold: 0.5 }
  ); // triggers when 50% visible

  observer.observe(document.querySelector(".box-banner"));
  // vanila js
  VanillaTilt.init(document.querySelector(".choose-main"), {
    max: 25, // maximum tilt rotation (degrees)
    speed: 400, // speed of the enter/exit transition
    glare: true, // enables glare effect
    "max-glare": 0.3, // maximum glare opacity
    scale: 1.05, // slightly zoom in while tilting
  });
  setTimeout(function () {
    var modal = new bootstrap.Modal(
      document.getElementById("createAccountModal")
    );
    modal.show();
  }, 2000); 
});
