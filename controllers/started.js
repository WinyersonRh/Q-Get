// -------------  VARIABLES  ---------------- //
const D = document;
const W = window;

const HEADER = D.getElementById("header");
const CONTAINER = D.getElementById("container");

const LOGIN = {
  form: D.getElementById("login-form-container"),
  username: D.getElementById("insert-username"),
  confirm: D.getElementById("confirm"),
  textLab: D.getElementById("text-lab"),
  textAmbulance: D.getElementById("text-ambulance"),
  textService: D.getElementById("text-service"),
  textDoctors: D.getElementById("text-doctors"),
};

const NAME = D.getElementById("username");

const CATEGORYS = {
  pendingBtn: D.getElementById("list-pending"),
  pausedBtn: D.getElementById("list-paused"),
  emergencyBtn: D.getElementById("list-emergency"),
  cateredBtn: D.getElementById("list-catered"),
  myListBtn: D.getElementById("my-patients-list"),
};

const LISTS = {
  refresh: D.getElementById("refresh"),
  title: D.getElementById("title"),
  all: D.getElementById("all"),
  query: D.getElementById("query"),
  laboratory: D.getElementById("laboratory"),
  radiology: D.getElementById("radiology"),
  particular: D.getElementById("particular"),
};

const T_DATABASE = D.getElementById("database");
const DB_CONTAINER = D.importNode(T_DATABASE.content, true);

const DATABASE = {
  pendings: DB_CONTAINER.children[0],
  paused: DB_CONTAINER.children[1],
  emergency: DB_CONTAINER.children[2],
  catered: DB_CONTAINER.children[3],
  myList: DB_CONTAINER.children[4],
};
// -------------  FUNCIONES / CLASES  ---------------- //
export default class Start_QGET {
  constructor(HEADER, CONTAINER, LOGIN, NAME, LISTS, DATABASE) {
    this.header = HEADER;
    this.container = CONTAINER;
    this.form = LOGIN.form;
    this.username = LOGIN.username;
    this.formBtn = LOGIN.confirm;
    this.name = NAME;
    this.listTitle = LISTS.title;
    this.listAll = LISTS.all;
    this.listQuery = LISTS.query;
    this.listLaboratory = LISTS.laboratory;
    this.listRadiology = LISTS.radiology;
    this.listParticular = LISTS.particular;
    this.patientsDB = DATABASE;

    // NO RECARGAR PAGINA
    history.pushState(null, "", "?#");
  }

  // VALIDAR USUARIO
  static validUser(user) {
    const onlyABC = /^[a-z]+$/gi;
    if (onlyABC.test(user.value) && user.value.length <= 10) {
      user.value = user.value.toUpperCase();
    } else user.value = user.value.slice(0, -1);
  }

  // ARRANCAR Q-GET
  startApp() {
    if (!this.username.value) this.name.textContent = "UNDEFINED";
    else this.name.textContent = this.username.value.toUpperCase();

    this.patientsFlow();
    this.header.classList.add("show");
    this.container.classList.add("show");

    setTimeout((e) => this.form.classList.add("hide"), 400);
  }

  // FLUJO DE PACIENTES
  async patientsFlow(listToShow = "pendings") {
    await this.emptyLists();

    if (listToShow === "pendings") this.fillLists(this.patientsDB, "pendings");
    if (listToShow === "paused") this.fillLists(this.patientsDB, "paused");
    if (listToShow === "emergency") this.fillLists(this.patientsDB, "emergency");
    if (listToShow === "catered") this.fillLists(this.patientsDB, "catered");
    if (listToShow === "my-list") this.fillLists(this.patientsDB, "my-list");
  }

  // VACIAR LISTAS
  emptyLists() {
    return new Promise((resolve, reject) => {
      const animChangeList = D.getElementById("change-list-anim");
      animChangeList.classList.add("show");

      setTimeout(() => {
        [...this.listAll.children].forEach((child) => child.remove());
        [...this.listQuery.children].forEach((child) => child.remove());
        [...this.listLaboratory.children].forEach((child) => child.remove());
        [...this.listRadiology.children].forEach((child) => child.remove());
        [...this.listParticular.children].forEach((child) => child.remove());

        if (
          this.listAll.childElementCount === 0 &&
          this.listQuery.childElementCount === 0 &&
          this.listLaboratory.childElementCount === 0 &&
          this.listRadiology.childElementCount === 0 &&
          this.listParticular.childElementCount === 0
        ) {
          animChangeList.classList.remove("show");
          resolve();
        } else reject(new Error("No se logró vacíar la lista"));
      }, 300);
    }).catch(console.error);
  }

  // LLENAR LISTAS
  fillLists(DB, category) {
    for (const patientList of Object.values(DB)) {
      if (patientList.id === category) {
        const PATIENT_NUMBER = D.createElement("span");
        const PATIENT_SECURE = D.createElement("span");

        PATIENT_NUMBER.className = "patient-number";
        PATIENT_SECURE.className = "patient-secure";

        if (patientList.childElementCount === 0) {
          if (category === "pendings") {
            this.listTitle.textContent = "PENDIENTES";
            this.listTitle.dataset.category = category;
          }
          if (category === "paused") {
            this.listTitle.textContent = "PAUSADOS";
            this.listTitle.dataset.category = category;
          }
          if (category === "emergency") {
            this.listTitle.textContent = "EMERGENCIAS";
            this.listTitle.dataset.category = category;
          }
          if (category === "catered") {
            this.listTitle.textContent = "ATENDIDOS";
            this.listTitle.dataset.category = category;
          }
          if (category === "my-list") {
            this.listTitle.textContent = "MI LISTA";
            this.listTitle.dataset.category = category;
          }
        } else {
          for (const patient of patientList.children) {
            if (patient.dataset.number === "none") PATIENT_NUMBER.textContent = "-";
            else PATIENT_NUMBER.textContent = patient.dataset.number;
            if (patient.dataset.secure === "particular") PATIENT_SECURE.textContent = "Particular";
            else PATIENT_SECURE.textContent = patient.dataset.secure;

            patient.classList.add(patient.dataset.service);
            patient.textContent = patient.dataset.patient;
            patient.appendChild(PATIENT_NUMBER);
            patient.appendChild(PATIENT_SECURE);

            if (category === "pendings") {
              this.listTitle.textContent = "PENDIENTES";
              this.listTitle.dataset.category = category;
            }
            if (category === "paused") {
              this.listTitle.textContent = "PAUSADOS";
              this.listTitle.dataset.category = category;
            }
            if (category === "emergency") {
              this.listTitle.textContent = "EMERGENCIAS";
              this.listTitle.dataset.category = category;
            }
            if (category === "catered") {
              this.listTitle.textContent = "ATENDIDOS";
              this.listTitle.dataset.category = category;
            }
            if (category === "my-list") {
              this.listTitle.textContent = "MI LISTA";
              this.listTitle.dataset.category = category;
            }

            if (patient.dataset.service === "query") this.listQuery.appendChild(patient.cloneNode(true));
            if (patient.dataset.service === "laboratory") this.listLaboratory.appendChild(patient.cloneNode(true));
            if (patient.dataset.service === "radiology") this.listRadiology.appendChild(patient.cloneNode(true));
            if (patient.dataset.service === "particular") this.listParticular.appendChild(patient.cloneNode(true));
            this.listAll.appendChild(patient.cloneNode(true));
          }
        }
      }
    }
  }
}

// -------------  EVENTOS  ---------------- //
const InstancePrincipal = new Start_QGET(HEADER, CONTAINER, LOGIN, NAME, LISTS, DATABASE);

LOGIN.username.addEventListener("keypress", (e) => Start_QGET.validUser(LOGIN.username));
LOGIN.confirm.addEventListener("click", (e) => InstancePrincipal.startApp());

// REFRESCAR LIST
LISTS.refresh.addEventListener("click", (e) => InstancePrincipal.patientsFlow(LISTS.title.dataset.category));
// LISTA A MOSTRAR SEGUN LA CATEGORIA
CATEGORYS.pendingBtn.addEventListener("click", (e) => InstancePrincipal.patientsFlow("pendings"));
CATEGORYS.pausedBtn.addEventListener("click", (e) => InstancePrincipal.patientsFlow("paused"));
CATEGORYS.emergencyBtn.addEventListener("click", (e) => InstancePrincipal.patientsFlow("emergency"));
CATEGORYS.cateredBtn.addEventListener("click", (e) => InstancePrincipal.patientsFlow("catered"));
CATEGORYS.myListBtn.addEventListener("click", (e) => InstancePrincipal.patientsFlow("my-list"));

// EVENTOS "CLICK" DEL DOCUMENTO

// EVENTOS "SCROLL" DEL DOCUMENTO

// EVENTOS AL CARGAR DOCUMENTO
