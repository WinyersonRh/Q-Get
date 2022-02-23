// VARIABLES
const D = document;
const W = window;

const POSITION_INFO = {
  container: D.getElementById("position-info"),
  number: D.getElementById("position-info-number"),
  service: D.getElementById("position-info-service"),
  positions: D.querySelectorAll(".position"),
  lastPosition: undefined,
};
const SERVICES = {
  query: D.getElementById("query-btn"),
  laboratory: D.getElementById("laboratory-btn"),
  radiology: D.getElementById("radiology-btn"),
  particular: D.getElementById("particular-btn"),
  all: D.getElementById("all-btn"),
};
const ADD_PATIENT = {
  form: D.getElementById("add-patient-form"),
  patientName: D.getElementById("patient-name"),
  emergency: D.getElementById("patient-emergency"),
  insuredPatient: {
    yes: D.getElementById("insured-patient-yes"),
    no: D.getElementById("insured-patient-no"),
  },
  patientInsurance: D.getElementById("patient-insurance"),
  patientService: D.getElementById("patient-service"),
  submit: D.getElementById("add-patient-confirm"),
};
const CHANGE_KEY = {
  form: D.getElementById("change-password"),
  currentPassword: D.getElementById("current-password"),
  newPassword: D.getElementById("new-password"),
  confirmPassword: D.getElementById("confirm-password"),
  submit: D.getElementById("change-key-btn"),
};
const PANEL_SETTINGS = {
  changeTheme: D.getElementById("change-theme"),
  changeUsername: D.getElementById("change-username"),
  sound: D.getElementById("sound"),
};
const FIRED = D.getElementById("exit");

// FUNCIONES
// POSICIONES
export default class Header_Actions {
  constructor(POSITION_INFO, SERVICES, ADD_PATIENT, CHANGE_KEY, PANEL_SETTINGS) {
    this.positionInfo = POSITION_INFO.container;
    this.positionNumber = POSITION_INFO.number;
    this.positionService = POSITION_INFO.service;
    this.positions = POSITION_INFO.positions;
    this.lastPosition = POSITION_INFO.lastPosition;
    // --------------------------------------------------------------------------
    this.selectQuery = SERVICES.query;
    this.selectLaboratory = SERVICES.laboratory;
    this.selectRadiology = SERVICES.radiology;
    this.selectParticular = SERVICES.particular;
    this.selectAll = SERVICES.all;
    // --------------------------------------------------------------------------
    this.addPatientForm = ADD_PATIENT.form;
    this.patientName = ADD_PATIENT.patientName;
    this.patientEmergency = ADD_PATIENT.emergency;
    this.insuredPatientYes = ADD_PATIENT.insuredPatient.yes;
    this.insuredPatientNo = ADD_PATIENT.insuredPatient.no;
    this.selectSecure = ADD_PATIENT.patientInsurance;
    this.selectService = ADD_PATIENT.patientService;
    this.addPatientBtn = ADD_PATIENT.submit;
    // --------------------------------------------------------------------------
    this.changeKeyForm = CHANGE_KEY.form;
    this.currentPassword = CHANGE_KEY.currentPassword;
    this.newPassword = CHANGE_KEY.newPassword;
    this.confirmPassword = CHANGE_KEY.confirmPassword;
    this.changeKeyBtn = CHANGE_KEY.submit;
    // --------------------------------------------------------------------------
    this.changeTheme = PANEL_SETTINGS.changeTheme;
    this.changeUsername = PANEL_SETTINGS.changeUsername;
    this.sound = PANEL_SETTINGS.sound;
  }

  // PUESTOS
  selectPosition(position) {
    if (position.dataset.state === "available" && !position.dataset.user && position !== this.lastPosition) {
      position.disabled = true;
      position.classList.add("unavailable");
      position.dataset.state = "unavailable";
      position.children[2].classList.remove("show");
      position.children[3].classList.add("show");
      position.dataset.user = D.getElementById("username").textContent;
      position.children[1].textContent = position.dataset.user;

      this.positionInfo.classList.add("show");
      this.positionNumber.textContent = position.dataset.number;

      if (this.lastPosition) {
        this.lastPosition.disabled = false;
        this.lastPosition.dataset.user = "";
        this.lastPosition.dataset.state = "available";
        this.lastPosition.classList.remove("unavailable");
        this.lastPosition.children[2].classList.add("show");
        this.lastPosition.children[3].classList.remove("show");
        this.lastPosition.children[1].textContent = "Disponible";
      }

      this.lastPosition = position;

      if (!this.positionService.dataset.selected) this.positionService.dataset.selected = "all";
    }
  }

  // SERVICIOS
  selectServiceFunction(service) {
    this.positionInfo.classList.add("show");
    if (service.dataset.service === "Consulta") {
      this.positionService.dataset.selected = "query";
      this.positionNumber.style.color = "#5fffaf";
      this.positionService.style.color = "#5fffaf";
      this.positionInfo.style.boxShadow = "0px 0px 4px 2px #5fffaf";
    }
    if (service.dataset.service === "Laboratorio") {
      this.positionService.dataset.selected = "laboratory";
      this.positionNumber.style.color = "rgb(0, 234, 255)";
      this.positionService.style.color = "rgb(0, 234, 255)";
      this.positionInfo.style.boxShadow = "0px 0px 4px 2px rgb(0, 234, 255)";
    }
    if (service.dataset.service === "Radiologia") {
      this.positionService.dataset.selected = "radiology";
      this.positionNumber.style.color = "rgb(255, 126, 126)";
      this.positionService.style.color = "rgb(255, 126, 126)";
      this.positionInfo.style.boxShadow = "0px 0px 4px 2px rgb(255, 126, 126)";
    }
    if (service.dataset.service === "Particular") {
      this.positionService.dataset.selected = "particular";
      this.positionNumber.style.color = "rgb(255, 185, 129)";
      this.positionService.style.color = "rgb(255, 185, 129)";
      this.positionInfo.style.boxShadow = "0px 0px 4px 2px rgb(255, 185, 129)";
    }
    if (service.dataset.service === "Todos") {
      this.positionService.dataset.selected = "all";
      this.positionNumber.style.color = "#ccc";
      this.positionService.style.color = "#ccc";
      this.positionInfo.style.boxShadow = "0px 0px 4px 2px #ccc";
    }
    this.positionService.textContent = service.dataset.service;
  }

  // AÑADIR PACIENTES
  addPatients() {
    const T_DATABASE = D.getElementById("database");
    const DB_CONTAINER = D.importNode(T_DATABASE.content, true);
    const DATABASE = {
      pendings: DB_CONTAINER.children[0],
      paused: DB_CONTAINER.children[1],
      emergency: DB_CONTAINER.children[2],
      catered: DB_CONTAINER.children[3],
    };

    const LISTS = {
      title: D.getElementById("title"),
      all: D.getElementById("all"),
      query: D.getElementById("query"),
      laboratory: D.getElementById("laboratory"),
      radiology: D.getElementById("radiology"),
      particular: D.getElementById("particular"),
    };

    const NEW_PATIENT = D.createElement("button");
    const PATIENT_NUMBER = D.createElement("span");
    const PATIENT_SECURE = D.createElement("span");

    NEW_PATIENT.dataset.category = "pendings";
    NEW_PATIENT.dataset.patient = this.patientName.value;
    NEW_PATIENT.dataset.number = LISTS.all.childElementCount + 1;

    PATIENT_NUMBER.className = "patient-number";
    PATIENT_SECURE.className = "patient-secure";

    PATIENT_NUMBER.textContent = NEW_PATIENT.dataset.number;

    try {
      if (this.insuredPatientYes.checked) {
        if (!NEW_PATIENT.dataset.patient) NEW_PATIENT.textContent = "Indefinido";
        else NEW_PATIENT.textContent = NEW_PATIENT.dataset.patient;

        NEW_PATIENT.appendChild(PATIENT_NUMBER);
        NEW_PATIENT.appendChild(PATIENT_SECURE);
        NEW_PATIENT.className = `patient ${this.selectService.value}`;
        NEW_PATIENT.dataset.service = this.selectService.value;

        if (!this.selectSecure.value) NEW_PATIENT.dataset.secure = "Indefinido";
        else NEW_PATIENT.dataset.secure = this.selectSecure.value;

        PATIENT_SECURE.textContent = NEW_PATIENT.dataset.secure;

        if (this.patientEmergency.checked) {
          // NECESITAMOS INSERTAR EL ELEMENTO EN LA BASE DE DATOS Y AL CAMBIAR A LA LISTA DE EMERGENCIA QUE EL ELEMENTO AUN ESTE ALLI
          NEW_PATIENT.dataset.category = "emergency";
          NEW_PATIENT.dataset.number = DATABASE.emergency.childElementCount + 1;
          console.log(DATABASE.emergency);
          DATABASE.emergency.appendChild(NEW_PATIENT);
          console.log(DATABASE.emergency.lastElementChild);
        } else {
          for (const LIST of Object.values(LISTS)) {
            if (this.selectService.value === LIST.id) {
              LISTS.all.appendChild(NEW_PATIENT);
              LIST.appendChild(NEW_PATIENT.cloneNode(true));
              DATABASE.pendings.appendChild(NEW_PATIENT.cloneNode(true));

              this.patientName.focus();
              this.patientName.value = "";
              this.selectSecure.value = "";
              this.patientEmergency.checked = false;
              setTimeout(() => (this.selectService.value = ""), 0);
            }
          }
        }
      } else if (this.insuredPatientNo.checked) {
        if (!NEW_PATIENT.dataset.patient) NEW_PATIENT.textContent = "Indefinido";
        else NEW_PATIENT.textContent = NEW_PATIENT.dataset.patient;

        NEW_PATIENT.appendChild(PATIENT_NUMBER);
        NEW_PATIENT.appendChild(PATIENT_SECURE);
        NEW_PATIENT.className = `patient particular`;
        NEW_PATIENT.dataset.service = "particular";
        NEW_PATIENT.dataset.secure = "Particular";
        PATIENT_SECURE.textContent = "Particular";

        LISTS.all.appendChild(NEW_PATIENT);
        LISTS.particular.appendChild(NEW_PATIENT.cloneNode(true));
        DATABASE.pendings.appendChild(NEW_PATIENT.cloneNode(true));

        this.patientName.value = "";
        this.patientName.focus();
        ADD_PATIENT.emergency.checked = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // SALIR
  exit() {
    setTimeout(() => window.location.reload(), 500);
  }
}

// EVENTOS
const INSTANCE = new Header_Actions(POSITION_INFO, SERVICES, ADD_PATIENT, CHANGE_KEY, PANEL_SETTINGS);

POSITION_INFO.positions.forEach((elem) => elem.addEventListener("click", (e) => INSTANCE.selectPosition(elem)));

Object.values(SERVICES).forEach((elem) =>
  elem.addEventListener("click", (e) => INSTANCE.selectServiceFunction(e.target))
);

ADD_PATIENT.insuredPatient.yes.addEventListener("click", (e) => {
  const labelYes = D.getElementById("label-yes");
  const labelNo = D.getElementById("label-no");
  labelYes.classList.add("checked");
  labelNo.classList.remove("checked");
  ADD_PATIENT.insuredPatient.no.checked = false;
  ADD_PATIENT.patientInsurance.hidden = false;
  ADD_PATIENT.patientService.hidden = false;
});
ADD_PATIENT.insuredPatient.no.addEventListener("click", (e) => {
  const labelYes = D.getElementById("label-yes");
  const labelNo = D.getElementById("label-no");
  labelYes.classList.remove("checked");
  labelNo.classList.add("checked");
  ADD_PATIENT.insuredPatient.yes.checked = false;
  ADD_PATIENT.patientInsurance.hidden = true;
  ADD_PATIENT.patientService.hidden = true;
});
ADD_PATIENT.submit.addEventListener("click", (e) => {
  if (!ADD_PATIENT.insuredPatient.yes.checked && !ADD_PATIENT.patientInsurance.no) {
    const labelYes = D.getElementById("label-yes");
    const labelNo = D.getElementById("label-no");
    labelYes.classList.remove("checked");
    labelNo.classList.add("checked");
    ADD_PATIENT.insuredPatient.no.checked = true;
    ADD_PATIENT.patientInsurance.hidden = true;
    ADD_PATIENT.patientService.hidden = true;
  }
  INSTANCE.addPatients();
});

FIRED.addEventListener("click", (e) => INSTANCE.exit());

D.addEventListener("DOMContentLoaded", (e) => {
  const labelYes = D.getElementById("label-yes");
  const labelNo = D.getElementById("label-no");
  labelYes.classList.remove("checked");
  labelNo.classList.remove("checked");
  ADD_PATIENT.patientName.value = "";
  ADD_PATIENT.patientInsurance.value = "";
  ADD_PATIENT.patientService.value = "";
  ADD_PATIENT.emergency.checked = false;
  ADD_PATIENT.insuredPatient.no.checked = false;
  ADD_PATIENT.insuredPatient.yes.checked = false;
  ADD_PATIENT.patientInsurance.hidden = true;
  ADD_PATIENT.patientService.hidden = true;
});
