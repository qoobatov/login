const formLogin = document.getElementById("form-login");

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
