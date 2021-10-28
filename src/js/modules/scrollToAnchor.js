const scrollToAnchor = function () {
  const links = document.querySelectorAll(".menu__link");
  let speed = 0.3;
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const blockID = link.getAttribute('href');
      const header = document.querySelector(".header");
      const headerHeaight = header.offsetHeight;
      window.scrollTo({
        top: document.querySelector(`${blockID}`).offsetTop - headerHeaight,
        behavior: "smooth"
    });
    });
  });
};
export default scrollToAnchor;
