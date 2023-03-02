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







  
});
