// NEW CODE

const htmlPersonas = function (...personas) {
  const htmlPersonas = personas
    .map(
      (persona) => `
    <div class="grid-row">
        <div class="grid-item grid-item--id">Id</div>
        <div class="grid-item grid-item--padre-id">Padre id</div>
        <div class="grid-item grid-item--nombre">Nombre</div>
        <div class="grid-item grid-item--emoji">Emoji</div>
        <div class="grid-item grid-item--texto">Texto</div>
        <div class="grid-item grid-item--visitas">Visitas</div>
        <div class="grid-item grid-item--is-final">Is final</div>
        <div class="grid-item grid-item--botones">
            <button type="button" class="btn-update grid-button-update" value="${persona.id}">Update</button>
            <button type="button" class="btn-delete grid-button-delete" value="${persona.id}">Delete</button>
        </div>
    </div>`
    )
    .join("");

  return htmlPersonas;
};

const htmlNoPersonas = function () {
  return `
    <div class="grid-row grid-row-error">
      <div class="grid-item">No hay preguntas</div>
    </div>`;
};

const URL = "http://127.0.0.1:8000/persona/show?";
const URLNOMBRE = "http://127.0.0.1:8000/persona/show?name=";
const URLCORREO = "http://127.0.0.1:8000/persona/show?correo=";
const inputUser = document.querySelector("#user-input");
const inputCorreo = document.querySelector("#email-input");
const btnUser = document.querySelector("#btn-user");
const btnEmail = document.querySelector("#btn-email");
const containerTable = document.querySelector(".container-database-info");
const btnAllUsers = document.querySelector(".btn-all-users");
const btnClear = document.querySelector(".btn-clear");

const getDataDB = async function (url, query) {
  query == "" ? (query = JSON.stringify(query)) : query;

  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  // console.log(data);
  return data;
};

const insertHtmlPersonasByUser = async function (url) {
  const userValue = inputUser.value;

  await getDataDB(url, userValue).then((personas) => {
    containerTable.innerHTML = "";
    if (personas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPersonas());
    } else {
      containerTable.insertAdjacentHTML("beforeend", htmlPersonas(...personas));
    }
  });
};

const insertHtmlPersonasByCorreo = async function (url) {
  const userValue = inputCorreo.value;

  containerTable.innerHTML = "";
  await getDataDB(url, userValue).then((personas) => {
    if (personas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPersonas());
    } else {
      containerTable.insertAdjacentHTML("beforeend", htmlPersonas(...personas));
    }
  });
};

const initializeButtons = function () {
  document.querySelectorAll(".grid-button-update").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      console.log("Update: " + event.target.value);
    });
  });
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      console.log("Delete: " + event.target.value);
    });
  });
};

// Para buscar por usuario
btnUser.addEventListener("click", function () {
  insertHtmlPersonasByUser(URLNOMBRE).then(() => {
    initializeButtons();
  });
});

// Para buscar por correo
btnEmail.addEventListener("click", function () {
  insertHtmlPersonasByCorreo(URLCORREO).then(() => {
    initializeButtons();
  });
});

inputUser.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPersonasByUser(URLNOMBRE).then(() => {
      initializeButtons();
    });
  }
});

inputCorreo.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPersonasByCorreo(URLCORREO).then(() => {
      initializeButtons();
    });
  }
});

btnAllUsers.addEventListener("click", function () {
  insertHtmlPersonasByUser(URL).then(() => {
    initializeButtons();
  });
});

btnClear.addEventListener("click", function () {
  containerTable.innerHTML = "";
});
