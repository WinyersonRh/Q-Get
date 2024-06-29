// VARIABLES
const W = window;
const D = document;

const PATIENT_CALLED = {
  containerInfo: D.getElementById("current-patient"),
  numberInfo: D.getElementById("number-called"),
  nameInfo: D.getElementById("name-called"),
  secureInfo: D.getElementById("secure-called"),
};

const POSITION_INFO = {
  positionContainer: D.getElementById("position-info"),
  positionNumber: D.getElementById("position-info-number"),
  positionService: D.getElementById("position-info-service"),
};

const ACTIONS = {
  nextPatient: D.getElementById("next"),
  recallPatient: D.getElementById("recall"),
  absentPatient: D.getElementById("absent"),
  transferModal: D.getElementById("transfer"),
  transferPatient: D.getElementById("transfer-submit"),
  pausePatient: D.getElementById("pause"),
  backOffice: D.getElementById("form-backoffice-btn"),
  backOffice2: D.getElementById("form-backoffice-btn-continue"),
  backOfficeContinue: D.getElementById("continue"),
};

const LISTS = {
  TITLE: D.getElementById("title"),
  CATEGORYS: {
    pendings: D.getElementById("list-pendings"),
    paused: D.getElementById("list-paused"),
    emergency: D.getElementById("list-emergency"),
    catered: D.getElementById("list-catered"),
    myList: D.getElementById("my-patients-list"),
  },
  OF: {
    all: D.getElementById("all"),
    query: D.getElementById("query"),
    laboratory: D.getElementById("laboratory"),
    radiology: D.getElementById("radiology"),
    particular: D.getElementById("particular"),
  },
};

const PATIENTS_CATERED = [];

const T_DATABASE = D.getElementById("database");
const DB_CONTAINER = D.importNode(T_DATABASE.content, true);

const DATABASE = {
  pendings: DB_CONTAINER.children[0],
  paused: DB_CONTAINER.children[1],
  emergency: DB_CONTAINER.children[2],
  catered: DB_CONTAINER.children[3],
  myList: DB_CONTAINER.children[4],
};

let patientsToCall = [];

// FUNCIONES
export default class ActionsPanel {
  constructor(patientCalled, positionInfo, controls, lists, patientsCatered, database) {
    this.patientCalled = patientCalled;
    this.positionInfo = positionInfo;
    this.controls = controls;
    this.lists = lists;
    this.patientsCatered = patientsCatered;
    this.database = database;
  }

  // ---------- UTILIDAD
  VOICE_CALL(SERVICE, NUMBER, POSITION) {
    if (!"speechSynthesis" in window) return alert("Lo siento, tu navegador no soporta esta tecnología");

    const CALL_PATIENT = new SpeechSynthesisUtterance();

    CALL_PATIENT.lang = "es-US";
    CALL_PATIENT.volume = 1;
    CALL_PATIENT.voice = speechSynthesis.getVoices()[0];
    CALL_PATIENT.rate = 0.8;
    CALL_PATIENT.pitch = 1;

    if (SERVICE === "query") CALL_PATIENT.text = `PACIENTE DE CONSULTA, NUMERO ${NUMBER} . PUESTO ${POSITION}`;
    if (SERVICE === "radiology") CALL_PATIENT.text = `PACIENTE DE RADIOLOGíA, NUMERO ${NUMBER} . PUESTO ${POSITION}`;
    if (SERVICE === "laboratory") CALL_PATIENT.text = `PACIENTE DE LABORATORIO, NUMERO ${NUMBER} . PUESTO ${POSITION}`;
    if (SERVICE === "particular") CALL_PATIENT.text = `PACIENTE PARTICULAR, NUMERO ${NUMBER} . PUESTO ${POSITION}`;

    return speechSynthesis.speak(CALL_PATIENT);
  }
  PATIENT_DETAILS(SERVICE = undefined, color = undefined) {
    if (SERVICE === undefined && color === undefined) {
      this.patientCalled.containerInfo.dataset.service = "";
      this.patientCalled.numberInfo.style.cssText = "";
      this.patientCalled.containerInfo.style.cssText = "";
      return true;
    } else {
      this.patientCalled.containerInfo.dataset.service = SERVICE;
      this.patientCalled.numberInfo.style.color = color;
      this.patientCalled.containerInfo.style.boxShadow = `0px 0px 4px 2px ${color}`;
      return true;
    }
  }
  CALL_PATIENT(PATIENT) {
    const ALL_LISTS = [
      ...this.lists.OF.query.children,
      ...this.lists.OF.laboratory.children,
      ...this.lists.OF.radiology.children,
      ...this.lists.OF.particular.children,
    ];

    for (const PATIENT_OF of ALL_LISTS) {
      // SI EL NOMBRE DEL PACIENTE ES IGUAL A ALGUN NOMBRE DE PACIENTE DEL RESTO DE LAS LISTAS
      if (PATIENT.dataset.patient === PATIENT_OF.dataset.patient) {
        if (PATIENT.dataset.service === "query") this.PATIENT_DETAILS("query", "#61ffb0");
        if (PATIENT.dataset.service === "laboratory") this.PATIENT_DETAILS("laboratory", "#00eaff");
        if (PATIENT.dataset.service === "radiology") this.PATIENT_DETAILS("radiology", "#ff7e7e");
        if (PATIENT.dataset.service === "particular") this.PATIENT_DETAILS("particular", "#ffb981");

        // MOSTRAR EN EL CUADRO EL NUMERO DE PACIENTE, NOMBRE Y SEGURO
        this.patientCalled.numberInfo.textContent = PATIENT.dataset.number;
        this.patientCalled.nameInfo.textContent = PATIENT.dataset.patient;
        this.patientCalled.secureInfo.textContent = PATIENT.dataset.secure;

        // AGREGAR DATOS DEL PACIENTE EN FORMA DE OBJETO A UN ARREGLO
        this.patientsCatered.push({
          name: PATIENT.dataset.patient,
          service: PATIENT.dataset.service,
          category: PATIENT.dataset.category,
          number: PATIENT.dataset.number,
          secure: PATIENT.dataset.secure,
        });

        const myStorage = window.localStorage;
        const KEY = PATIENT.dataset.number;

        myStorage.setItem(KEY, JSON.stringify(this.patientsCatered));

        PATIENT.remove();
        PATIENT_OF.remove();
      }
    }
  }
  CALL_PREVIEW() {
    const SCREEN_PREVIEW = D.getElementById("called-patient-preview");
    const CALLING_POSITION = D.getElementById("calling-positions");
    const NUMBER_PREVIEW = D.getElementById("patient-number-preview");
    const SERVICE_PREVIEW = D.getElementById("patient-service-preview");
    const POSITION_PREVIEW = D.getElementById("patient-position-preview");

    const PATIENT = patientsToCall[0];

    this.VOICE_CALL(PATIENT.service, PATIENT.number, PATIENT.position);

    for (const position of CALLING_POSITION.children) {
      if (position.dataset.number === PATIENT.position)
        position.textContent = `Puesto ${PATIENT.position} - Numero ${PATIENT.number}`;
    }

    if (PATIENT.service === "query") PATIENT.service = "Consulta";
    if (PATIENT.service === "laboratory") PATIENT.service = "Laboratorio";
    if (PATIENT.service === "radiology") PATIENT.service = "Radiología";
    if (PATIENT.service === "particular") PATIENT.service = "Particular";

    NUMBER_PREVIEW.textContent = PATIENT.number;
    SERVICE_PREVIEW.textContent = PATIENT.service;
    POSITION_PREVIEW.textContent = `Puesto ${PATIENT.position}`;

    SCREEN_PREVIEW.classList.add("show");

    setTimeout(() => {
      patientsToCall.shift();
      SCREEN_PREVIEW.classList.remove("show");
    }, 5000);
  }
  // -------------------->

  myCateredPatients() {
    const myStorage = window.localStorage;
    const KEY = Object.keys(myStorage);

    for (let i = 0; i < KEY.length; i++) {
      const GET_PATIENT = JSON.parse(myStorage.getItem(KEY[i]));

      if (GET_PATIENT.length === myStorage.length) {
        for (let i = 0; i < myStorage.length; i++) {
          const PATIENT = D.createElement("button");
          const PATIENT_NUMBER = D.createElement("span");
          const PATIENT_SECURE = D.createElement("span");

          PATIENT.className = `patient ${GET_PATIENT[i].service}`;
          PATIENT.textContent = GET_PATIENT[i].name;
          PATIENT.dataset.patient = GET_PATIENT[i].name;
          PATIENT.dataset.service = GET_PATIENT[i].service;
          PATIENT.dataset.category = GET_PATIENT[i].category;
          PATIENT.dataset.number = GET_PATIENT[i].number;
          PATIENT.dataset.secure = GET_PATIENT[i].secure;

          PATIENT_NUMBER.className = "patient-number";
          PATIENT_SECURE.className = "patient-secure";

          PATIENT_NUMBER.textContent = GET_PATIENT[i].number;
          PATIENT_SECURE.textContent = GET_PATIENT[i].secure;

          PATIENT.appendChild(PATIENT_NUMBER);
          PATIENT.appendChild(PATIENT_SECURE);

          setTimeout(() => {
            if (PATIENT.dataset.service === "query") this.lists.OF.query.appendChild(PATIENT.cloneNode(true));
            if (PATIENT.dataset.service === "laboratory") this.lists.OF.laboratory.appendChild(PATIENT.cloneNode(true));
            if (PATIENT.dataset.service === "radiology") this.lists.OF.radiology.appendChild(PATIENT.cloneNode(true));
            if (PATIENT.dataset.service === "particular") this.lists.OF.particular.appendChild(PATIENT.cloneNode(true));
            return this.lists.OF.all.appendChild(PATIENT.cloneNode(true));
          }, 2000);
        }
      }
    }
  }

  nextPatient() {
    const ALL_PATIENTS = this.lists.OF.all.children;
    // SI HAY UN NUMERO DE PUESTO FIJADO CONTINUAMOS
    if (/\d/gi.test(parseInt(this.positionInfo.positionNumber.textContent))) {
      // SOLO LLAMAR PACIENTES EN LISTA DE PENDIENTES, PAUSADOS O EMERGENCIAS POR OBVIEDAD
      if (
        this.lists.TITLE.textContent === "PENDIENTES" ||
        this.lists.TITLE.textContent === "PAUSADOS" ||
        this.lists.TITLE.textContent === "EMERGENCIAS"
      ) {
        const PRIORITY = this.positionInfo.positionService.dataset.selected;

        const SEND_TO_CALL = (PATIENT) => {
          const PATIENT_TO_CALL = {
            number: PATIENT.dataset.number,
            service: PATIENT.dataset.service,
            position: this.positionInfo.positionNumber.textContent,
          };
          patientsToCall.push(PATIENT_TO_CALL);
          return this.CALL_PATIENT(PATIENT);
        };

        for (const PATIENT of ALL_PATIENTS) {
          if (PRIORITY === "all") return SEND_TO_CALL(PATIENT);
          else if (PRIORITY === "query" && PATIENT.dataset.service === "query") return SEND_TO_CALL(PATIENT);
          else if (PRIORITY === "laboratory" && PATIENT.dataset.service === "laboratory") return SEND_TO_CALL(PATIENT);
          else if (PRIORITY === "radiology" && PATIENT.dataset.service === "radiology") return SEND_TO_CALL(PATIENT);
          else if (PRIORITY === "particular" && PATIENT.dataset.service === "particular") return SEND_TO_CALL(PATIENT);
        }
      }
    } //SI NO HAY NUMERO DE PUESTO FIJADO SOLICITAMOS SELECCIONAR UNO
    else {
      document.body.style.overflowY = "hidden";
      const alertPosition = D.getElementById("alert-position");
      alertPosition.classList.add("show");
    }
  }

  recallPatient() {
    if (
      this.patientCalled.containerInfo.dataset.service === undefined &&
      this.patientCalled.numberInfo.textContent === "0" &&
      this.patientCalled.nameInfo.textContent === "Paciente" &&
      this.patientCalled.secureInfo.textContent === "Seguro"
    )
      alert("No hay paciente a quien rellamar");
    else {
      const PATIENT_TO_CALL = {
        number: this.patientCalled.numberInfo.textContent,
        service: this.patientCalled.containerInfo.dataset.service,
        position: this.positionInfo.positionNumber.textContent,
      };
      patientsToCall.push(PATIENT_TO_CALL);
    }
  }

  absentPatient() {
    if (
      this.patientCalled.nameInfo.textContent === "Paciente" &&
      this.patientCalled.numberInfo.textContent === "0" &&
      this.patientCalled.secureInfo.textContent === "Seguro"
    ) {
      // NO LLAMAR PACIENTES YA QUE NO HAY
    } else {
      const PATIENT = D.createElement("button");
      const PATIENT_NUMBER = D.createElement("span");
      const PATIENT_SECURE = D.createElement("span");

      PATIENT.dataset.patient = this.patientCalled.nameInfo.textContent;
      PATIENT.dataset.service = this.patientCalled.containerInfo.dataset.service;
      PATIENT.dataset.category = "absent";
      PATIENT.dataset.number = this.patientCalled.numberInfo.textContent;
      PATIENT.dataset.secure = this.patientCalled.secureInfo.textContent;

      PATIENT.textContent = `${PATIENT.dataset.patient}`;
      PATIENT.className = `patient ${PATIENT.dataset.service} ${PATIENT.dataset.category}`;

      PATIENT_NUMBER.className = "patient-number";
      PATIENT_SECURE.className = "patient-secure";

      PATIENT_NUMBER.textContent = this.patientCalled.numberInfo.textContent;
      PATIENT_SECURE.textContent = this.patientCalled.secureInfo.textContent;

      PATIENT.appendChild(PATIENT_NUMBER);
      PATIENT.appendChild(PATIENT_SECURE);

      if (PATIENT.dataset.service === "query") this.lists.OF.query.appendChild(PATIENT.cloneNode(true));
      if (PATIENT.dataset.service === "laboratory") this.lists.OF.laboratory.appendChild(PATIENT.cloneNode(true));
      if (PATIENT.dataset.service === "radiology") this.lists.OF.radiology.appendChild(PATIENT.cloneNode(true));
      if (PATIENT.dataset.service === "particular") this.lists.OF.particular.appendChild(PATIENT.cloneNode(true));
      this.lists.OF.all.appendChild(PATIENT.cloneNode(true));

      this.patientCalled.nameInfo.textContent = "Paciente";
      this.patientCalled.numberInfo.textContent = "0";
      this.patientCalled.secureInfo.textContent = "Seguro";
      return this.PATIENT_DETAILS();
    }
  }

  transferPatient(action) {
    if (
      this.patientCalled.containerInfo.dataset.service === undefined &&
      this.patientCalled.numberInfo.textContent === "0" &&
      this.patientCalled.nameInfo.textContent === "Paciente" &&
      this.patientCalled.secureInfo.textContent === "Seguro"
    ) {
      D.getElementById("transfer-container").classList.remove("show");
      document.body.style.overflowY = "visible";
      return alert("No hay paciente a quien transferir");
    }

    if (action === "req") {
      const NUMBER = D.getElementById("transfer-info-number");
      const NAME = D.getElementById("transfer-info-name");
      const SERVICE = D.getElementById("transfer-info-service");
      const SECURE = D.getElementById("transfer-info-secure");

      NUMBER.textContent = this.patientCalled.numberInfo.textContent;
      NAME.textContent = this.patientCalled.nameInfo.textContent;
      SECURE.textContent = this.patientCalled.secureInfo.textContent;

      if (this.patientCalled.containerInfo.dataset.service === "query") SERVICE.textContent = "Consulta";
      if (this.patientCalled.containerInfo.dataset.service === "laboratory") SERVICE.textContent = "Laboratorio";
      if (this.patientCalled.containerInfo.dataset.service === "radiology") SERVICE.textContent = "Radiologia";
      if (this.patientCalled.containerInfo.dataset.service === "particular") SERVICE.textContent = "Particular";
    }
    if (action === "res") {
      console.log("Respuesta");
    }
    if (action === "get") {
      console.log("Obtener transferencia");
    }
  }

  pausedPatient() {
    console.log("pausedPatient");
  }

  backOffice() {
    const note = D.getElementById("backoffice-note");
    const user = D.getElementById("backoffice-user");
    const record = D.getElementById("backoffice-record");
    const animation = D.getElementById("backoffice-animation");
    const myStorage = window.localStorage;

    note.textContent = D.getElementById("note-input").value;
    user.textContent = D.getElementById("username").textContent;
    animation.src = D.getElementById("select-gif").value || "models/img/backoffice-anim-1.gif";
    record.textContent = myStorage.length;
  }
}

// EVENTOS
const INSTANCE = new ActionsPanel(PATIENT_CALLED, POSITION_INFO, ACTIONS, LISTS, PATIENTS_CATERED, DATABASE);

ACTIONS.nextPatient.addEventListener("click", (e) => INSTANCE.nextPatient());
ACTIONS.recallPatient.addEventListener("click", (e) => INSTANCE.recallPatient());
ACTIONS.absentPatient.addEventListener("click", (e) => INSTANCE.absentPatient());
ACTIONS.transferModal.addEventListener("click", (e) => INSTANCE.transferPatient("req"));
ACTIONS.transferPatient.addEventListener("click", (e) => INSTANCE.transferPatient("res"));
ACTIONS.pausePatient.addEventListener("click", (e) => INSTANCE.pausedPatient());
ACTIONS.backOffice.addEventListener("click", (e) => INSTANCE.backOffice());

LISTS.CATEGORYS.myList.addEventListener("click", (e) => INSTANCE.myCateredPatients());

const INTERVAL = setInterval(() => {
  if (patientsToCall.length > 0) INSTANCE.CALL_PREVIEW();
}, 6000);
