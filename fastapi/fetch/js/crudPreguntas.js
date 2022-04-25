// NEW CODE

const htmlPreguntas = function (...preguntas) {
  const htmlPreguntas = preguntas
    .map(
      (pregunta) => `
    <div class="grid-row">
        <div class="grid-item grid-item--id">${pregunta.id}</div>
        <div class="grid-item grid-item--padre-id">${pregunta.padre_id}</div>
        <div class="grid-item grid-item--nombre">${pregunta.nombre}</div>
        <div class="grid-item grid-item--emoji">${pregunta.emoji}</div>
        <div class="grid-item grid-item--texto">${pregunta.texto}</div>
        <div class="grid-item grid-item--visitas">${pregunta.visitas}</div>
        <div class="grid-item grid-item--is-final">${pregunta.is_final}</div>
        <div class="grid-item grid-item--botones">
            <button type="button" class="btn-update grid-button-update" value="${pregunta.id}">Update</button>
            <button type="button" class="btn-delete grid-button-delete" value="${pregunta.id}">Delete</button>
        </div>
    </div>`
    )
    .join("");

  return htmlPreguntas;
};

const htmlNoPreguntas = function () {
  return `
    <div class="grid-row grid-row-error">
      <div class="grid-item">No hay preguntas</div>
    </div>`;
};

const URL = "http://127.0.0.1:8000/pregunta/show?";
const URLPREGUNTA = "http://127.0.0.1:8000/pregunta/show?pregunta=";
const inputPregunta = document.querySelector("#nombre-input");
const btnUser = document.querySelector("#btn-nombre");
const containerTable = document.querySelector(".container-database-info");

const btnAllPreguntas = document.querySelector(".btn-all-preguntas");
const btnClear = document.querySelector(".btn-clear");

const getDataDB = async function (url, query) {
  query == "" ? (query = JSON.stringify(query)) : query;

  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  console.log(data);
  return data;
};

const insertHtmlPreguntas = async function (url) {
  const nombreValue = inputPregunta.value;

  await getDataDB(url, nombreValue).then((preguntas) => {
    containerTable.innerHTML = "";
    if (preguntas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPreguntas());
    } else {
      containerTable.insertAdjacentHTML(
        "beforeend",
        htmlPreguntas(...preguntas)
      );
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

// Para buscar por nombre pregunta
btnUser.addEventListener("click", function () {
  insertHtmlPreguntas(URLPREGUNTA).then(() => {
    initializeButtons();
  });
});

inputPregunta.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPreguntas(URLPREGUNTA).then(() => {
      initializeButtons();
    });
  }
});

btnAllPreguntas.addEventListener("click", function () {
  insertHtmlPreguntas(URL).then(() => {
    initializeButtons();
  });
});

btnClear.addEventListener("click", function () {
  containerTable.innerHTML = "";
});
