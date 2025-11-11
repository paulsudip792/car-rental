document.addEventListener("DOMContentLoaded", () => {
   // Aos js
  AOS.init();
  // Initialize Isotope
  var iso = new Isotope("#vehicle-list", {
    itemSelector: ".element-item",
    layoutMode: "fitRows",
  });

  // Filter functionality
  var filtersElem = document.querySelector("#filters");
  filtersElem.addEventListener("click", function (event) {
    if (!event.target.classList.contains("expo-list")) return;

    var filterValue = event.target.getAttribute("data-filter");

    // “In Stock”
    if (filterValue === "*") {
      iso.arrange({ filter: "*" });
    } else {
      iso.arrange({ filter: filterValue });
    }

    // active class toggle
    document
      .querySelectorAll(".expo-list")
      .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
  });
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

  AOS.refresh();
  
});
// about us counter
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter-cntn h1");
  const duration = 2000; // animation duration in ms

  const startCounter = (counter) => {
    const text = counter.getAttribute("data-final") || counter.textContent.trim();
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
    const text = counter.getAttribute("data-final") || counter.textContent.trim();
    const suffix = text.replace(/[0-9.]/g, "");
    counter.textContent = "0" + suffix;
  };

  // Save final values for reference
  counters.forEach((c) => c.setAttribute("data-final", c.textContent.trim()));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const counter = entry.target;
      if (entry.isIntersecting) {
        startCounter(counter);
      } else {
        resetCounter(counter); // reset when out of view
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => observer.observe(counter));
});