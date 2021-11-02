"use strict";
import { openModal, closeModal } from './modules/popups';
window.onscroll = function() {myFunction()};

function myFunction() {
  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progress-bar").style.width = scrolled + "%";
}
window.addEventListener('load', () => {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 3000)
});
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
