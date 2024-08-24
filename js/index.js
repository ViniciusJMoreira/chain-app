"use-strict";
const nav = document.querySelector(".header__nav");
const navMenu = document.querySelector(".nav__menu");
const sections = document.querySelectorAll("section[id]");
const serviceSection = document.querySelector("#services");
const servicesCard = document.querySelector(".section__services-card");
const reviewsPosts= document.querySelector(".section__reviews-posts");

//HEEADER
// NAV HEADER
const navHighlighter = function () {
  // Get current scroll position
  let scrollY = window.scrollY;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav__link .active").classList.remove("active");
      document.querySelector(".nav__link a[href*=" + sectionId + "]").classList.add("active");
    }
  });
};
window.addEventListener("scroll", navHighlighter);

nav.addEventListener("click", function(e) {
  if(e.target.closest(".nav__menu-hamburger")) {
    if(nav.classList.contains("menu__hidden-hamburger")) {
      nav.classList.remove("menu__hidden-hamburger");
      navMenu.classList.add("nav__hidden-menu");
    }else {
      nav.classList.add("menu__hidden-hamburger");
      navMenu.classList.remove("nav__hidden-menu");
    }
  };
  if(e.target.closest(".nav__link")) {
    document.querySelector(".nav__link .active").classList.remove("active");
    e.target.classList.add("active");
    if(nav.classList.contains("menu__hidden-hamburger")) {
      nav.classList.remove("menu__hidden-hamburger");
      navMenu.classList.add("nav__hidden-menu");
    }
  }
})
const stickNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) nav.classList.add("sticky");
  if (!entry.isIntersecting && entry.boundingClientRect.top > 0) nav.classList.remove("sticky");
};
const navObserver = new IntersectionObserver(stickNav, {root: null,threshold:0, rootMargin: `-${nav.clientHeight}px`})
navObserver.observe(serviceSection);

// SECTION SERVICES
const servicesCardInHover = function(e) {
  const currentCard = e.target.closest(".services__card");
  if (!currentCard) return;
  const dataCard = currentCard.dataset.card;
  currentCard.style.cssText = `
    background-image: url("../images/service-bg.jpg");
    background-size: cover;
    background-position: top right;
    color: #fff;
  `;
  currentCard.querySelector(
    "img"
  ).src = `./images/service-icon-hover-${dataCard}.png`;
  currentCard.querySelector(".card__description").style.color = "#fff";
  currentCard.querySelector(".card__link").style.color = "#fff";
}
const servicesCardOutHover = function (e) {
  const currentCard = e.target.closest(".services__card");
  if (!currentCard) return;
  const dataCard = currentCard.dataset.card;
  currentCard.style.cssText = `
  background-image: none;
  color: #000;
`;
  currentCard.querySelector(
    "img"
  ).src = `./images/service-icon-${dataCard}.png`;
  currentCard.querySelector(".card__description").style.color = "#afafaf";
  currentCard.querySelector(".card__link").style.color = "#4b8ef1";
};
servicesCard.addEventListener("mouseover", servicesCardInHover);
servicesCard.addEventListener("mouseout", servicesCardOutHover);
servicesCard.addEventListener("mouseup", servicesCardOutHover);

// SECTION REVIEWS
const reviewsData = {
  1: {
    fullname: "David M.",
    company: "Martino Co",
    staff: "CEO of David Company",
  },
  2: {
    fullname: "Jake H. Nyo",
    company: "Harris Nyo",
    staff: "Founder of Harris Company",
  },
  3: {
    fullname: "May C.",
    company: "Catherina",
    staff: "Manager Catherina Company",
  },
  4: {
    fullname: "Random U.",
    company: "Random Co",
    staff: "Founder of Random Company",
  },
  5: {
    fullname: "Mark J.",
    company: "Mark Co",
    staff: "CEO of Mark Company",
  },
};
reviewsPosts.addEventListener("click", function(e) {
  const currentPost = e.target.closest(".review__content");
  if(!currentPost) return;
  document.querySelector(".section__reviews-menu .active").classList.remove("active");
  currentPost.classList.add("active");
  const dataPost = currentPost.dataset.review;
  document.querySelector(".post__name").textContent = reviewsData[dataPost].company;
  document.querySelector(".review__staff h3").textContent = reviewsData[dataPost].fullname;
  document.querySelector(".review__staff p").textContent = reviewsData[dataPost].staff;
});