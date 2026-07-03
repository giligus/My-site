const header = document.querySelector("[data-header]");
const year = document.querySelector("[data-year]");
const emailModal = document.querySelector("[data-email-modal]");
const emailForm = document.querySelector("[data-email-form]");
const openEmail = document.querySelector("[data-open-email]");
const closeEmail = document.querySelector("[data-close-email]");

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateHeader = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 8);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const closeEmailModal = () => {
  if (!emailModal) {
    return;
  }

  if (typeof emailModal.close === "function") {
    emailModal.close();
  } else {
    emailModal.removeAttribute("open");
  }
};

if (openEmail && emailModal) {
  openEmail.addEventListener("click", () => {
    if (typeof emailModal.showModal === "function") {
      emailModal.showModal();
    } else {
      emailModal.setAttribute("open", "");
    }
  });
}

if (closeEmail) {
  closeEmail.addEventListener("click", closeEmailModal);
}

if (emailModal) {
  emailModal.addEventListener("click", (event) => {
    if (event.target === emailModal) {
      closeEmailModal();
    }
  });
}

if (emailForm) {
  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(emailForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const subject = `Message from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    window.location.href = `mailto:giligus@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeEmailModal();
    emailForm.reset();
  });
}
