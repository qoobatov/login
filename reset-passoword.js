const resetPasswordForm = document.getElementById("form-reset-password");

resetPasswordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("reset-email").value;

  const response = await fetch("/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  const { success } = await response.json();

  if (success) {
    console.log(
      "На ваш адрес электронной почты отправлено сообщение для сброса пароля."
    );
  } else {
    console.log("Произошла ошибка при отправке сообщения. Попробуйте позже.");
  }
});
