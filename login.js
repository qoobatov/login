const formLogin = document.getElementById("form-login");
const eyeOffPassLogin = document.querySelector(".eye-off-pass-login");
const eyeOnPassLogin = document.querySelector(".eye-on-pass-login");

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

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  console.log(email, password);

  const response = await fetch(
    "https://web.chat2desk.kg/api/user/sign_in?lang=ru",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  // заставка

  if (response.ok) {
    const data = await response.json();
    console.log(data);
  } else {
    console.log("Неверный пароль или email");
  }
});
