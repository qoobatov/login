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
});
