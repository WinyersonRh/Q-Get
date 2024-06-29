// VARIABLES
const D = document;
const W = window;

const CALL_PATIENT = D.getElementById("call-patient");

const MODALS = {
  CONTAINER: D.getElementById("modals-container"),
  POSITIONS: {
    container: D.getElementById("positions"),
    btn: D.getElementById("select-position"),
    btn2: D.getElementById("alert-select-position"),
  },
  ALERT_POSITION: {
    container: D.getElementById("alert-position"),
    btn: D.getElementById("next"),
  },
  SERVICES: {
    container: D.getElementById("services"),
    btn: D.getElementById("select-service"),
  },
  ADD_PATIENT: {
    container: D.getElementById("add-patient-modal"),
    btn: D.getElementById("add-patient"),
  },
  INFORMATIVE_SCREEN: {
    container: D.getElementById("informative-screen"),
    btn: D.getElementById("informative-screen-btn"),
  },
  CHANGE_KEY: {
    container: D.getElementById("change-key"),
    btn: D.getElementById("key"),
  },
  SETTINGS: {
    container: D.getElementById("panel-settings"),
    btn: D.getElementById("settings"),
  },
  FIRED: {
    container: D.getElementById("fired"),
    btn: D.getElementById("exit"),
  },
  BACKOFFICE: {
    formContainer: D.getElementById("form-backoffice-container"),
    container: D.getElementById("backoffice-modal"),
    back: D.getElementById("backoffice-back"),
    btn: D.getElementById("backoffice"),
    btn2: D.getElementById("form-backoffice-btn"),
    btn3: D.getElementById("form-backoffice-btn-continue"),
  },
  TRANSFER: {
    container: D.getElementById("transfer-container"),
    btn: D.getElementById("transfer"),
  },
  CONTACT: {
    container: D.getElementById("contact-modal"),
    btn: D.getElementById("contact"),
  },
  INFO: {
    container: D.getElementById("info-modal"),
    btn: D.getElementById("info"),
  },
};

// FUNCIONES
export default class Modals_Actions {
  constructor(modal) {
    if (modal === CALL_PATIENT) this.callBtn = modal;
  }

  static showModal(modal, action) {
    if (action === true) {
      document.body.style.overflowY = "hidden";
      modal.classList.add("show");
    } else {
      document.body.style.overflowY = "visible";
      for (const elem of modal.children) elem.classList.remove("show");
    }
  }

  showCallBtn(e) {
    const ELEM_POSITION = e.target.getBoundingClientRect();

    this.quitCallBtn();

    //  PARAMETROS:
    // EL getBoundingClientRect() ES LA DISTANCIA DE EL TARGET HASTA EL TOP DEL DOCUMENTO
    // EL 55 ES EL ALTO (HEIGHT) DE DICHO BOTON DEL PACIENTE, ESTO PARA MEDIR CON MAS EXACTITUD
    // EL 12 ES EL ALTO DE LA FLECHA DEL BOTON "LLAMAR" PARA MEDIR CON EXACTITUD
    setTimeout(() => {
      this.callBtn.classList.add("show");

      this.callBtn.style.top = `${parseInt(ELEM_POSITION.top) + 25}px`;
      this.callBtn.style.left = `${parseInt(ELEM_POSITION.left) + 40}px`;

      setTimeout(() => (this.callBtn.style.top = `${parseInt(ELEM_POSITION.top) + 55 + 12}px`), 50);
    }, 50);
  }
  quitCallBtn() {
    this.callBtn.classList.remove("show");
    this.callBtn.style.top = "unset";
    this.callBtn.style.left = "unset";
  }
}

// EVENTOS
MODALS.POSITIONS.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.POSITIONS.container, true));
MODALS.POSITIONS.btn2.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.POSITIONS.container, true));
MODALS.SERVICES.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.SERVICES.container, true));
MODALS.ADD_PATIENT.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.ADD_PATIENT.container, true));
MODALS.INFORMATIVE_SCREEN.btn.addEventListener("click", (e) => {
  Modals_Actions.showModal(MODALS.INFORMATIVE_SCREEN.container, true);
});
MODALS.CHANGE_KEY.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.CHANGE_KEY.container, true));
MODALS.SETTINGS.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.SETTINGS.container, true));
MODALS.FIRED.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.FIRED.container, true));
MODALS.BACKOFFICE.back.addEventListener("click", (e) => {
  const password = D.getElementById("password-input");
  const passwordIncorrect = D.getElementById("password-incorrect");

  password.classList.remove("incorrect");
  passwordIncorrect.classList.remove("show-message");
  Modals_Actions.showModal(MODALS.BACKOFFICE.formContainer, false);
  Modals_Actions.showModal(MODALS.BACKOFFICE.container, true);
});
MODALS.BACKOFFICE.btn.addEventListener("click", (e) => {
  D.getElementById("note-input").focus();
  Modals_Actions.showModal(MODALS.BACKOFFICE.container, false);
  Modals_Actions.showModal(MODALS.BACKOFFICE.formContainer, true);
});
MODALS.BACKOFFICE.btn2.addEventListener("click", (e) => {
  D.getElementById("continue").focus();
  D.getElementById("backoffice-back").classList.remove("show");
  D.getElementById("note-label").textContent = "Deja una nota";
  Modals_Actions.showModal(MODALS.BACKOFFICE.formContainer, false);
  Modals_Actions.showModal(MODALS.BACKOFFICE.container, true);
});
MODALS.TRANSFER.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.TRANSFER.container, true));
MODALS.CONTACT.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.CONTACT.container, true));
MODALS.INFO.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.INFO.container, true));

// EVENTOS "CLICK" DEL DOCUMENTO
D.addEventListener("click", (e) => {
  if (e.target.matches(".patient") || e.target.matches(".patient *")) new Modals_Actions(CALL_PATIENT).showCallBtn(e);
  if (!e.target.matches(".patient *") || e.target.matches(".patient *")) new Modals_Actions(CALL_PATIENT).quitCallBtn();
  if (e.target.id === "modal-quit") Modals_Actions.showModal(MODALS.CONTAINER, false);
  if (
    e.target.id !== "next" &&
    e.target.id !== "select-position" &&
    e.target.id !== "alert-position-content" &&
    !e.target.matches(".alert-position-content *") &&
    e.target.id !== "select-service" &&
    e.target.id !== "add-patient" &&
    e.target.id !== "add-patient-modal" &&
    !e.target.matches(".add-patient-modal *") &&
    e.target.id !== "informative-screen-btn" &&
    e.target.id !== "informative-screen" &&
    !e.target.matches(".informative-screen *") &&
    e.target.id !== "key" &&
    !e.target.matches(".change-key *") &&
    e.target.id !== "settings" &&
    !e.target.matches(".panel-settings *") &&
    e.target.id !== "exit" &&
    e.target.id !== "backoffice" &&
    !e.target.matches(".backoffice-modal") &&
    e.target.id !== "backoffice-back" &&
    e.target.id !== "form-backoffice-container" &&
    e.target.id !== "form-backoffice" &&
    e.target.id !== "note-input" &&
    e.target.id !== "select-gif" &&
    !e.target.matches("#select-gif *") &&
    e.target.id !== "password-input" &&
    e.target.id !== "form-backoffice-btn" &&
    e.target.id !== "form-backoffice-btn-continue" &&
    e.target.id !== "transfer" &&
    !e.target.matches(".transfer-container *") &&
    e.target.id !== "contact" &&
    !e.target.matches(".contact-modal *") &&
    e.target.id !== "info" &&
    !e.target.matches(".info-modal *") &&
    e.target.id !== "copyright" &&
    !e.target.matches(".copyright-modal *")
  )
    Modals_Actions.showModal(MODALS.CONTAINER, false);
  // EXCEPCIONES ESPECIALES
  if (e.target.id === "quit-add-patient-modal") Modals_Actions.showModal(MODALS.CONTAINER, false);
  if (e.target.id === "form-backoffice-container" && MODALS.BACKOFFICE.btn2.hidden) {
    const passwordIncorrect = D.getElementById("password-incorrect");
    const message = D.getElementById("validate-password-message");

    passwordIncorrect;
    message.classList.add("show");
    setTimeout(() => message.classList.remove("show"), 5000);
  }
  if (e.target.id === "form-backoffice-container" && MODALS.BACKOFFICE.btn3.hidden) {
    Modals_Actions.showModal(MODALS.CONTAINER, false);
  }
  if (e.target.id === "continue") {
    const back = D.getElementById("backoffice-back");
    const note = D.getElementById("note-label");
    const inpuNote = D.getElementById("note-input");
    const selectAnim = D.getElementById("select-gif");
    const inputSubmit1 = D.getElementById("form-backoffice-btn");
    const inputPassword = D.getElementById("password-input");
    const inputSubmit2 = D.getElementById("form-backoffice-btn-continue");

    D.getElementById("form-backoffice").appendChild(inputSubmit1);
    back.classList.add("show");
    note.textContent = "Inserta tu contraseña";
    inpuNote.hidden = true;
    inpuNote.disabled = true;
    selectAnim.hidden = true;
    selectAnim.disabled = true;
    inputSubmit1.hidden = true;
    inputSubmit1.disabled = true;
    inputPassword.hidden = false;
    inputPassword.disabled = false;
    inputSubmit2.hidden = false;
    inputSubmit2.disabled = false;
    inputPassword.focus();

    Modals_Actions.showModal(MODALS.BACKOFFICE.container, false);
    Modals_Actions.showModal(MODALS.BACKOFFICE.formContainer, true);
  }
  if (e.target.id === "form-backoffice-btn-continue") {
    const user = D.getElementById("username");
    const password = D.getElementById("password-input");
    const passwordIncorrect = D.getElementById("password-incorrect");

    if (user.textContent === password.value) {
      const form = D.getElementById("form-backoffice");
      const back = D.getElementById("backoffice-back");
      const note = D.getElementById("note-label");
      const inpuNote = D.getElementById("note-input");
      const selectAnim = D.getElementById("select-gif");
      const inputSubmit1 = D.getElementById("form-backoffice-btn");
      const inputPassword = D.getElementById("password-input");
      const inputSubmit2 = D.getElementById("form-backoffice-btn-continue");

      form.appendChild(inputSubmit2);
      back.classList.remove("show");
      note.textContent = "Deja una nota";
      inpuNote.value = "";
      inputPassword.value = "";
      inpuNote.hidden = false;
      inpuNote.disabled = false;
      selectAnim.hidden = false;
      selectAnim.disabled = false;
      inputSubmit1.hidden = false;
      inputSubmit1.disabled = false;
      inputPassword.hidden = true;
      inputPassword.disabled = true;
      inputSubmit2.hidden = true;
      inputSubmit2.disabled = true;

      Modals_Actions.showModal(MODALS.CONTAINER, false);
    } else {
      password.focus();
      password.value = "";
      password.classList.add("incorrect");
      passwordIncorrect.classList.add("show-message");
      setTimeout(() => passwordIncorrect.classList.remove("show-message"), 5000);
    }
  }
});

D.getElementById("password-input").addEventListener("keydown", (e) => {
  const password = D.getElementById("password-input");
  const passwordIncorrect = D.getElementById("password-incorrect");
  const message = D.getElementById("validate-password-message");

  message.classList.remove("show");
  password.classList.remove("incorrect");
  passwordIncorrect.classList.remove("show-message");
});

// EVENTOS "SCROLL" DEL DOCUMENTO
D.addEventListener("scroll", (e) => new Modals_Actions(CALL_PATIENT).quitCallBtn());

// EVENTOS "KEY" DEL DOCUMENTO
D.addEventListener("keydown", (e) => {
  if (MODALS.INFORMATIVE_SCREEN.container.classList.contains("show") && e.ctrlKey && e.which === 81) {
    Modals_Actions.showModal(MODALS.CONTAINER, false);
  }
});
