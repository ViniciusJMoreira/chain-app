"use-strict";
const nav = document.querySelector(".header__nav");

// NAV HEADER
nav.addEventListener("click", function(e) {
  if(e.target.classList.contains("nav__menu-mobile") || e.target.closest(".nav__menu-mobile")) {
    nav.classList.contains("nav__mobile")
      ? nav.classList.remove("nav__mobile")
      : nav.classList.add("nav__mobile");
  };
})