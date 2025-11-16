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

// about us counter
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-cntn h1");
  const duration = 2000; // animation duration in ms

  const startCounter = (counter) => {
    const text =
      counter.getAttribute("data-final") || counter.textContent.trim();
    const number = parseFloat(text.replace(/[^0-9.]/g, ""));
    const suffix = text.replace(/[0-9.]/g, "");
    let count = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      count = Math.floor(progress * number);
      counter.textContent = count + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        counter.textContent = text;
      }
    };

    requestAnimationFrame(animate);
  };

  const resetCounter = (counter) => {
    const text =
      counter.getAttribute("data-final") || counter.textContent.trim();
    const suffix = text.replace(/[0-9.]/g, "");
    counter.textContent = "0" + suffix;
  };

  // Save final values for reference
  counters.forEach((c) => c.setAttribute("data-final", c.textContent.trim()));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const counter = entry.target;
        if (entry.isIntersecting) {
          startCounter(counter);
        } else {
          resetCounter(counter); // reset when out of view
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
});
// Aos js
AOS.init();