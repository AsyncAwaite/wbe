import Form from "./forms";
const popups = function () {
  const popupBtns = document.querySelectorAll(".btn");
  const popup = document.querySelector(".popup");
  const closeBtn = popup.querySelector(".popup__close");
  popupBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (btn.classList.contains("btn_promo") ) {
        popup.classList.add("active");
        document.body.classList.add("active");
      } else if (btn.classList.contains("btn_price")) {
        document.body.classList.add("active");
        popup.classList.add("active");
        const form = popup.querySelector('form');
        const formTitle = form.querySelector('.form__title');
        const formBtn = form.querySelector('.btn');
        formTitle.textContent = 'Заполните эту форму прямо сейчас!';
        formBtn.textContent = 'Узнать подробнее';
      }
    });
  });
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup ()
    }
  });
  closeBtn.addEventListener("click", () => {
   
      closePopup ()
    
  });
  function closePopup () {
    popup.classList.remove("active");
    document.body.classList.remove("active");
    const form = new Form("form").clearInputs();
  }
};

export default popups;
