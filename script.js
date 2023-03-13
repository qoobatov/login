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
    addedMargin = document.querySelector(".container-login"),
    btn2faParent = document.querySelector(".btn-2fa-parent");

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
  const formRegistration = document.getElementById("form-registration");
  const companyName = document.getElementById("company-name");
  const email = document.querySelector("#registr-email");
  const name = document.getElementById("registr-name");
  const phone = document.getElementById("phone");
  const password = document.getElementById("new-password");
  const confirmPassword = document.getElementById("confirm-password");
  const error = document.querySelector(".error-registr");
  const errorEmail = document.querySelector(".error-email");
  const errorName = document.querySelector(".error-name");
  const errorPhone = document.querySelector(".error-phone");
  const errorPassword = document.querySelector(".error-password");
  const errorConfirmPassword = document.querySelector(
    ".error-confirm-password"
  );
  const label = document.querySelector(".label");
  const fields = document.querySelectorAll(".field");
  const checkBox = document.getElementById("check-terms");
  const eyeOnPass = document.querySelector(".eye-on-pass");
  const eyeOffPass = document.querySelector(".eye-off-pass");
  const eyeConfirmOnPass = document.querySelector(".eye-confirm-on-pass");
  const eyeConfirmOffPass = document.querySelector(".eye-confirm-off-pass");

  // Функции для конкретных проверок  ---------------------------------------------------..

  const validateEmail = (email) => {
    let regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  };

  function validatePassword(password) {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;
    return passwordRegex.test(password);
  }

  eyeOffPass.addEventListener("click", function (event) {
    const target = event.target;
    if (target) {
      eyeOnPass.style.display = "block";
      eyeOffPass.style.display = "none";
      password.type = "text";
    }

    eyeOnPass.addEventListener("click", function (e) {
      if (e.target) {
        eyeOnPass.style.display = "none";
        eyeOffPass.style.display = "block";
        password.type = "password";
      }
    });
  });
  eyeConfirmOffPass.addEventListener("click", function (event) {
    const target = event.target;
    if (target) {
      eyeConfirmOnPass.style.display = "block";
      eyeConfirmOffPass.style.display = "none";
      confirmPassword.type = "text";
    }

    eyeConfirmOnPass.addEventListener("click", function (e) {
      if (e.target) {
        eyeConfirmOnPass.style.display = "none";
        eyeConfirmOffPass.style.display = "block";
        confirmPassword.type = "password";
      }
    });
  });

  // Form 'submit' ------------------------------------------------------------------------

  formRegistration.addEventListener("submit", async (event) => {
    event.preventDefault();

    let emptyInputs = Array.from(fields).filter((field) => field.value === "");
    let companyNameValue = companyName.value;
    let inputEmailValue = email.value;
    let inputNameValue = name.value;
    let inputPhoneValue = phone.value;
    let passwordValue = password.value;
    let confirmPasswordValue = confirmPassword.value;
    const notificationPass = document.querySelector(".notification-password");
    const textFailEmail = document.querySelector(".text-fail-email");
    const notMatch = document.querySelector(".not-match");

    console.log(
      companyNameValue,
      inputEmailValue,
      inputNameValue,
      inputPhoneValue,
      passwordValue,
      confirmPasswordValue
    );

    // отпрвка запроса на регистрацию.

    const response = await fetch("https://web.chat2desk.kg/api/user/sign_up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: 217,
        // company_name: companyNameValue,
        email: inputEmailValue,
        company_name: inputNameValue,
        // inputPhoneValue,
        password: passwordValue,
        password_confirmation: confirmPasswordValue,
        country_id: "115",
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.status == "success") {
        location.href = "https://web.chat2desk.kg?auth_key=" + data.auth_key;
        let createLead = await fetch(
          "https://vtiger.crm.kg/tildaGetLeads.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: first_name,
              company: company_name,
              Email: email,
              Phone: phone,
            }),
          }
        );
      }
    } else {
      console.log("Данные не отправлены");
    }

    fields.forEach((field) => {
      if (field.value === "") {
        field.classList.add("invalid");
      } else {
        field.classList.remove("invalid");
      }
    });

    if (emptyInputs.length !== 0) {
      console.log("input not filled");
    }

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

    if (!validateEmail(inputEmailValue)) {
      textFailEmail.classList.add("for-text-fail-email");
      email.style.borderColor = "red";
      textFailEmail.innerHTML =
        'Пустой email, поле должно содержать символ @ и знак "."';
      console.log("not valid email");
    } else {
      textFailEmail.classList.remove("for-text-fail-email");
      email.style.borderColor = "#55dcaa";
      textFailEmail.innerHTML = "";
    }

    if (!validatePassword(passwordValue)) {
      notificationPass.classList.add("notification-for-pass");
      password.style.borderColor = "red";
      notificationPass.innerHTML =
        "Пароль должен содержать min 10 символов, цифры и специальные знаки";
      console.log("Пароль не верен");
      console.log(passwordValue);
    } else {
      notificationPass.classList.remove("notification-for-pass");
      notificationPass.innerHTML = "";
      password.style.borderColor = "#55dcaa";
    }

    if (passwordValue !== confirmPasswordValue) {
      notMatch.classList.add("for-not-match-pass");
      confirmPassword.style.borderColor = "red";
      notMatch.innerHTML = "Пароли не совпатают, проверьте и повторите ввод";
      console.log("passwords do not match");
    } else {
      notMatch.classList.remove("notification-for-pass");
      notMatch.innerHTML = "";
      confirmPassword.style.borderColor = "#55dcaa";
      console.log("passwords match");
    }

    if (!checkBox.checked) {
      console.log("checkbox is not checked");
      label.classList.add("invalid");
      // return false;
    } else {
      label.classList.remove("invalid");
      label.style.color = "green";
    }

    // return false;
  });

  function validateNotEmpty(input, err, inText) {
    input.onblur = function () {
      if (input.value.length === 0) {
        input.classList.add("invalid");
        err.innerHTML = inText;
      } else {
        input.classList.remove("invalid");
        err.innerHTML = "";
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

  // ************************************ end forms validation in block registration ******************************************

  // ************************************ fetch forms *************************************************************************
});
