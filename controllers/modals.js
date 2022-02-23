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
  BACKOFFICE: {
    container: D.getElementById("backoffice-modal"),
    btn: D.getElementById("backoffice"),
  },
  SERVICES: {
    container: D.getElementById("services"),
    btn: D.getElementById("select-service"),
  },
  ADD_PATIENT: {
    container: D.getElementById("add-patient-modal"),
    btn: D.getElementById("add-patient"),
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
  CONTACT: {
    container: D.getElementById("contact-modal"),
    btn: D.getElementById("contact"),
  },
  INFO: {
    container: D.getElementById("info-modal"),
    btn: D.getElementById("info"),
  },
  COPYRIGHT: {
    container: D.getElementById("copyright-modal"),
    btn: D.getElementById("copyright"),
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
MODALS.BACKOFFICE.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.BACKOFFICE.container, true));
MODALS.SERVICES.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.SERVICES.container, true));
MODALS.ADD_PATIENT.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.ADD_PATIENT.container, true));
MODALS.CHANGE_KEY.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.CHANGE_KEY.container, true));
MODALS.SETTINGS.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.SETTINGS.container, true));
MODALS.FIRED.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.FIRED.container, true));
MODALS.CONTACT.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.CONTACT.container, true));
MODALS.INFO.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.INFO.container, true));
MODALS.COPYRIGHT.btn.addEventListener("click", (e) => Modals_Actions.showModal(MODALS.COPYRIGHT.container, true));

// EVENTOS "CLICK" DEL DOCUMENTO
D.addEventListener("click", (e) => {
  if (e.target.matches(".patient") || e.target.matches(".patient *")) new Modals_Actions(CALL_PATIENT).showCallBtn(e);
  if (!e.target.matches(".patient *") || e.target.matches(".patient *")) new Modals_Actions(CALL_PATIENT).quitCallBtn();
  if (e.target.id === "modal-quit") e.target.parentNode.parentNode.classList.remove("show");
  if (
    e.target.id !== "next" &&
    e.target.id !== "select-position" &&
    e.target.id !== "alert-position-content" &&
    !e.target.matches(".alert-position-content *") &&
    e.target.id !== "backoffice" &&
    !e.target.matches(".backoffice-modal") &&
    e.target.id !== "select-service" &&
    e.target.id !== "add-patient" &&
    !e.target.matches(".add-patient-modal *") &&
    e.target.id !== "key" &&
    !e.target.matches(".change-key *") &&
    e.target.id !== "settings" &&
    !e.target.matches(".panel-settings *") &&
    e.target.id !== "exit" &&
    e.target.id !== "contact" &&
    !e.target.matches(".contact-modal *") &&
    e.target.id !== "info" &&
    !e.target.matches(".info-modal *") &&
    e.target.id !== "copyright" &&
    !e.target.matches(".copyright-modal *")
  )
    Modals_Actions.showModal(MODALS.CONTAINER, false);
});

// EVENTOS "SCROLL" DEL DOCUMENTO
D.addEventListener("scroll", (e) => new Modals_Actions(CALL_PATIENT).quitCallBtn());
