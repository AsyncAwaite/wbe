"use strict";
import { openModal, closeModal } from './modules/popups'
window.addEventListener("DOMContentLoaded", function () {
  const page = document.querySelector(".page");
  const header = page.querySelector(".header");
  const hero = document.querySelector(".hero");

  const heroHeight = hero.scrollHeight;
  let menuStatus = false;
  window.addEventListener("scroll", headerFixed);
  function headerFixed() {
    if (window.pageYOffset >= heroHeight && menuStatus === false) {
      header.classList.add("header_fixed");
      menuStatus = true;
    } else if (window.pageYOffset < 100 && menuStatus === true) {
      menuStatus = false;
      header.classList.remove("header_fixed");
    }
  }
  const btns = document.querySelectorAll('.btn');
  btns.forEach(btn => {
    if(btn.getAttribute('data-modal') == '' )
    btn.addEventListener('click', () => {
      openModal('.popup');
    })
  })
  const popup = document.querySelector('.popup');
  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target.getAttribute("data-close") == "") {
      closeModal(".popup");
    }
  })

});
