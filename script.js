window.addEventListener("DOMContentLoaded", () => {
  // start modal window for login ***************************************

  const modalTrigger = document.querySelector("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }
  modalTrigger.addEventListener("click", openModal);

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }
  modalCloseBtn.addEventListener("click", closeModal);

  // это если че для Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  //   modal.addEventListener("click", (e) => {  эта функция нужна для закрытия модального окна, если клиент кликнет по любой части модалки.
  //     if (e.target === modal) {
  //       closeModal();
  //     }
  //   });

  // ********************************* tabs *******************************************************

  const btns = document.querySelectorAll(".button"),
    tabsContent = document.querySelectorAll(".tab-content"),
    btnsParent = document.querySelector(".tab-btns-block"),
    resetLinkParent = document.querySelector(".reset-password-parent"),
    resetBtnParent = document.querySelector(".reset-btns-block"),
    addedMargin = document.querySelector(".container-login");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });
  }

  function showTabContent(i) {
    tabsContent[i].style.display = "block";
    if (i != 1) {
      addedMargin.style.marginTop = "70px";
    } else {
      addedMargin.style.marginTop = "0px";
    }
  }

  hideTabContent();
  showTabContent(0);

  btnsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("button")) {
      btns.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  resetLinkParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("forgot-password")) {
      hideTabContent();
      showTabContent(2);
    }
  });

  resetBtnParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("btn-reset-cancel")) {
      hideTabContent();
      showTabContent(0);
    }
  });

  // ************************************ end tabs ******************************************************

  // ************************************ forms validation in block registration ******************************************
  // form and inputs
  // input values
  const formRegistration = document.getElementById("form-registration");
  const companyName = document.getElementById("company-name");
  const email = document.getElementById("registr-email");
  const name = document.getElementById("registr-name");
  const phone = document.getElementById("phone");
  const password = document.getElementById("new-password");
  const confirmPassword = document.getElementById("confirm-password");
  const checkTerms = document.getElementById("check-terms");
  const fields = document.querySelectorAll(".field");
  const errorMessage = document.querySelector(".error-message");
  const error = document.querySelector(".error-registr");
  const errorEmail = document.querySelector(".error-email");
  const errorName = document.querySelector(".error-name");
  const errorPhone = document.querySelector(".error-phone");
  const errorPassword = document.querySelector(".error-password");
  const errorConfirmPassword = document.querySelector(
    ".error-confirm-password"
  );

  formRegistration.addEventListener("click", function (event) {
    event.preventDefault();
    //----------------------------------------------------------values--------------------------------------------
    let companyNameValue = companyName.value.trim();
    const emailValue = email.value.trim();
    const nameValue = name.value.trim();
    const phoneValue = phone.value;
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    console.log("value companyName", companyNameValue);
    console.log("value email", emailValue);
    console.log("value name", nameValue);
    console.log("value phone", phoneValue);
    console.log("value password", passwordValue);
    console.log("value confirmPassword", confirmPasswordValue);

    fields.forEach((field) => {
      if (field.value==='') {

      }
    });

    validateNotEmpty(
      companyName,
      error,
      "* Пожалуйста, введите название компании."
    );
    validateNotEmpty(email, errorEmail, "* Это поле не может быть пустым.");
    validateNotEmpty(name, errorName, "* Заполните имя.");
    validateNotEmpty(phone, errorPhone, "* Введите номер.");
    validateNotEmpty(
      password,
      errorPassword,
      "* Поле 'Пароль' не может быть пустым"
    );
    validateNotEmpty(
      confirmPassword,
      errorConfirmPassword,
      "* Поле не может быть пустым"
    );

    // if (!companyNameValue) {
    //   error.classList.add("blank-company-name");
    //   companyName.style.borderColor = "red";
    //   error.innerText = "* это обязательное поле";
    //   companyName.parentElement.insertBefore(error, companyName);
    // }

    // function validateEmail(input) {
    //   const atIndex = input.indexOf("@");
    //   const dotIndex = input.lastIndexOf(".");
    //   if (
    //     atIndex < 1 ||
    //     dotIndex < atIndex + 2 ||
    //     dotIndex + 2 >= input.length
    //   ) {
    //     alert("Введите корректный адрес электронной почты");
    //     return false;
    //   }
    //   return true;
    // }

    // function validateRange(input, min, max) {
    //   const value = parseFloat(input.value);
    //   if (value < min || value > max) {
    //     alert(`Поле должно содержать значение от ${min} до ${max}`);
    //     return false;
    //   }
    //   return true;
    // }

    // function validatePassword(input) {
    //   // Проверка длины пароля
    //   if (input.length < 10) {
    //     alert("Пароль должен содержать не менее 8 символов");
    //     return false;
    //   }

    //   // Проверка наличия цифр
    //   if (!/\d/.test(input)) {
    //     alert("Пароль должен содержать хотя бы одну цифру");
    //     return false;
    //   }

    //   // Проверка наличия букв в верхнем и нижнем регистрах
    //   if (!/[a-z]/.test(input) || !/[A-Z]/.test(input)) {
    //     alert("Пароль должен содержать буквы в верхнем и нижнем регистрах");
    //     return false;
    //   }

    //   // Проверка наличия специальных символов
    //   if (!/[!@#$%^&*()_+{}\[\]:;'"<>,.?\/\\~-]/.test(input)) {
    //     alert("Пароль должен содержать хотя бы один специальный символ");
    //     return false;
    //   }

    //   return true;
    // }
  });
  function validateNotEmpty(input, err, inText) {
    input.onblur = function () {
      if (input.value.length === 0) {
        input.classList.add("invalid");
        err.innerHTML = inText;
      }
    };
    input.onfocus = function () {
      if (this.classList.contains("invalid")) {
        // удаляем индикатор ошибки, т.к. пользователь хочет ввести данные заново
        this.classList.remove("invalid");
        err.innerHTML = "";
      }
    };
  }
});
