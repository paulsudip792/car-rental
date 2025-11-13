// initialize Isotope
var iso = new Isotope("#vehicle-list", {
  itemSelector: ".element-item",
  layoutMode: "fitRows",
});

// filter buttons
var filterButtons = document.querySelectorAll("[data-filter]");
filterButtons.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    var filterValue = btn.getAttribute("data-filter");
    iso.arrange({ filter: filterValue });

    // active class
    filterButtons.forEach((b) => b.classList.remove("active-filter-btn"));
    btn.classList.add("active-filter-btn");
  });
});
// Aos js
AOS.init();
AOS.refresh();
