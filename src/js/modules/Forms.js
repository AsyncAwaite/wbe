import IMask from "imask";
export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.textarea = document.querySelectorAll("textarea");
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с вами свяжемся!",
      failure: "Что-то пошло не так...",
    };
    this.path = "./assets/telegramBot.php";
    this.req = {
      phone: false,
      name: false,
    };
  }

  clearInputs() {
    this.inputs.forEach((item) => {
      item.value = "";
      item.classList.remove("valid");
      this.req.phone = false;
      this.req.name = false;
      item.nextElementSibling.textContent = '';
    });
    this.textarea.forEach((item) => {
      item.value = "";
    });
  }
  createMask(input) {
    let maskOptions = {
      mask: "+38 (000) 000 - 00 - 00",
      lazy: false,
    };
    let mask = new IMask(input, maskOptions);
  }

  checkNameInputs() {
    let inputs = document.querySelectorAll('[name="name"]');
    inputs.forEach((input) => {
      input.addEventListener('keypress', function(e) {
        if (e.key.match(/[\d]/ig)) {
            e.preventDefault();
        }
    });
      input.addEventListener("input", () => {
        if (input.value.length > 2) {
          input.classList.add("valid");
          input.nextElementSibling.textContent = "";
          this.req.name = true;
        } else {
          input.classList.remove("valid");
          input.nextElementSibling.textContent = "Введите Ваше имя";
        }
      });
    });
  }
  checkPhoneInputs() {
    let inputs = document.querySelectorAll('[name="phone"]');
    inputs.forEach((input) => {
      this.createMask(input);
      input.addEventListener("input", () => {
        if (input.value.indexOf("_") === -1) {
          input.classList.add("valid");
          input.nextElementSibling.textContent = "";
          this.req.phone = true;
        } else {
          input.classList.remove("valid");
          input.nextElementSibling.textContent =
            "Введите номер согласно шаблона";
        }
      });
    });
  }

  async postData(url, data) {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  }

  init() {
    this.checkPhoneInputs();
    this.checkNameInputs();
    this.forms.forEach((item) => {
      item.addEventListener("submit", (e) => {
        const btn = item.querySelector(".btn__form");
        let statusMessage = btn.nextElementSibling;
        e.preventDefault();
        if (this.req.phone && this.req.name) {
          statusMessage.textContent = this.message.loading;
          const formData = new FormData(item);
          this.postData(this.path, formData)
            .then((res) => {
              console.log(res);
              statusMessage.classList.add("form__message_ok");
              statusMessage.textContent = this.message.success;
            })
            .catch(() => {
              statusMessage.textContent = this.message.failure;
            })
            .finally(() => {
              this.clearInputs();

              setTimeout(() => {
                statusMessage.classList.remove("form__message_ok");
                statusMessage.textContent = "";
              }, 5000);
            });
        } else {
          if (!this.req.phone && !this.req.name) {
            statusMessage.textContent = `пожалуйста заполните номер телефона и Ваше имя`;
            setTimeout(() => {
              statusMessage.textContent = "";
            }, 5000);
          } else if (!this.req.name) {
            statusMessage.textContent = `введите Ваше имя`;
            setTimeout(() => {
              statusMessage.textContent = "";
            }, 5000);
          } else {
            statusMessage.textContent = `пожалуйста заполните номер телефона`;
            setTimeout(() => {
              statusMessage.textContent = "";
            }, 5000);
          }
        }
      });
    });
  }
}
