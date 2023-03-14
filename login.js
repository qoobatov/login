const formLogin = document.getElementById("form-login");
const eyeOffPassLogin = document.querySelector(".eye-off-pass-login");
const eyeOnPassLogin = document.querySelector(".eye-on-pass-login");
const email = document.getElementById("email");
const password = document.getElementById("password");
const blankFieldEmail = document.querySelector(".blank-field-login__email");
const blankFieldPass = document.querySelector(".blank-field-login__pass");
const btnHeaderChangeToBack = document.querySelector(".btn-for-2fa-header");
const btnHeaderSignIn = document.querySelector(".btn-tab-sign");
const loader = document.querySelector(".loader-page");

eyeOffPassLogin.addEventListener("click", function (event) {
  const target = event.target;
  if (target) {
    eyeOnPassLogin.style.display = "block";
    eyeOffPassLogin.style.display = "none";
    password.type = "text";
  }
});

eyeOnPassLogin.addEventListener("click", function (e) {
  if (e.target) {
    eyeOnPassLogin.style.display = "none";
    eyeOffPassLogin.style.display = "block";
    password.type = "password";
  }
});

const validateEmail = (email) => {
  let regex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

function validateForm(emailVal, passwordVal) {
  if (emailVal.trim() === "" && passwordVal.trim() === "") {
    blankFieldEmail.classList.add("blank-field-login__email__error");
    blankFieldPass.classList.add("blank-field-login__pass__error");
    email.style.borderColor = "red";
    password.style.borderColor = "red";
    blankFieldEmail.innerHTML = "* Это обязательное поле";
    blankFieldPass.innerHTML = "* Это обязательное поле";
    console.log("Пустой email");
  } else {
    blankFieldEmail.classList.remove("blank-field-login__email__error");
    blankFieldPass.classList.remove("blank-field-login__pass__error");
    email.style.borderColor = "#55dcaa";
    password.style.borderColor = "#55dcaa";
    blankFieldEmail.innerHTML = "";
    blankFieldPass.innerHTML = "";
  }
}
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tabContentLogin = document.querySelector(".tab-content-login");
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  const tabContent2FA = document.querySelector(".tab-content-2fa");
  const contentWrongPassAndLogin = document.querySelector(
    ".tab-content-wrong-pass-and-login"
  );
  const wrongPassLoginOverFife = document.querySelector(
    ".wrong-pass-and-login-over-fife"
  );

  console.log(emailValue, passwordValue);

  validateForm(emailValue, passwordValue);

  const response = await fetch(
    "https://web.chat2desk.kg/api/user/sign_in?lang=eng",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: 217,
        email: emailValue,
        password: passwordValue,
        country_id: "115",
      }),
    }
  );

  // заставка

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    if (data.status == "success") {
      location.href = "https://web.chat2desk.kg?auth_key=" + data.auth_key;
      console.log(data);
    } else if (data.errors.password) {
      contentWrongPassAndLogin.style.display = "block";
    } else if (data.login_attempts_info.failed_attempts_number > 5) {
      wrongPassLoginOverFife.style.display = "block";
      setTimeout(() => {
        wrongPassLoginOverFife.style.display = "none";
      }, 3000);

      console.log(
        "вы ввели неверные данные больше 5 раз, рекомендуем сбросить пароль"
      );
    }

    // ------------

    // ---------

    if (data.errors.otp_required) {
      //не забыть сменить на 'success'
      tabContent2FA.style.display = "block"; // здесь я скрыл форму логина для того, чтобы открыть форму для ввода одноразового кода
      tabContentLogin.style.display = "none";
      btnHeaderChangeToBack.innerText = "Назад";
      btnHeaderSignIn.addEventListener("click", function (e) {
        if (e.target) {
          tabContent2FA.style.display = "none"; //
        }
      });

      btnHeaderChangeToBack.addEventListener("click", function (e) {
        if (e.target) {
          tabContentLogin.style.display = "block";
          tabContent2FA.style.display = "none"; //
          btnHeaderChangeToBack.innerText = "Войти";
        }
      });
    }
  }
});

//   {
//     "status": "error",
//     "errors": {
//         "otp_required": [
//             ""
//         ]
//     },
//     "login_attempts_info": {
//         "max_attempts_number": 5,
//         "failed_attempts_number": 1,
//         "failed_login_attempt_date": 1678771958
//     }
// }
