'use strict';

/**
 * add event on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    if (elements[i]) { // Safety check: element exist karta hai ya nahi
      elements[i].addEventListener(eventType, callback);
    }
  }
}

/**
 * MOBILE NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active"); // Fixed: directly using navToggler instead of 'this'
}

if (navToggler) {
  navToggler.addEventListener("click", toggleNav);
}

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);

/**
 * HEADER and BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header?.classList.add("active");
    backTopBtn?.classList.add("active");
  } else {
    header?.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);

/**
 * Button hover ripple effect
 */
const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  // Fix: Using getBoundingClientRect for more accurate ripple position
  const rect = this.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  this.style.setProperty("--top", `${y}px`);
  this.style.setProperty("--left", `${x}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);

/**
 * Scroll reveal
 */
const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    // Thoda delay ya offset add kiya hai taake animation smooth dikhe
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);
window.addEventListener("load", revealElementOnScroll);

/**
 * Custom cursor
 */
const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  if (cursor) {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor?.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor?.classList.remove("hovered");
});