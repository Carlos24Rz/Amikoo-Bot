const activeURL = "http://127.0.0.1:8000";
// const activeURL = "http://34.230.152.92:8080";

const htmlCalificaciones = function (...calificaciones) {
  const htmlPersonas = calificaciones
    .map(
      (calificacion) => `
    <div class="grid-row">
      <div class="grid-item grid-item--id">${calificacion.id}</div>
      <div class="grid-item grid-item--calificacion">${calificacion.calificacion}</div>
      <div class="grid-item grid-item--fecha">${calificacion.fecha}</div>
      <div class="grid-item grid-item--botones">
        <button type="button" class="btn-update grid-button-update" value="${calificacion.id}">Update</button>
        <button type="button" class="btn-delete grid-button-delete" value="${calificacion.id}">Delete</button>
      </div>
    </div>`
    )
    .join("");

  return htmlPersonas;
};

const htmlNoCalificaciones = function () {
  return `
    <div class="grid-row grid-row-error">
      <div class="grid-item">No hay calificaciones</div>
    </div>`;
};

const URL = `${activeURL}/calificacion/show?`;
const urlFechas = function (dateBegin, dateEnd) {
  return `${URL}dateBegin=${dateBegin}&dateEnd=${dateEnd}`;
};

const inputDateBegin = document.querySelector("#date-begin");
const inputDateEnd = document.querySelector("#date-end");
const btnSubmit = document.querySelector("#btn-submit");
const containerTable = document.querySelector(".container-database-info");
const btnAllCalificaciones = document.querySelector(".btn-all-calificaciones");
const btnClear = document.querySelector(".btn-clear");

const getDataDB = async function (url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  // console.log(data);
  return data;
};

const insertHtmlCalificaciones = async function (btnAll = false) {
  const valueDateBegin = inputDateBegin.value;
  const valueDateEnd = inputDateEnd.value;

  let urlDB;
  btnAll == true
    ? (urlDB = URL)
    : (urlDB = urlFechas(valueDateBegin, valueDateEnd));

  await getDataDB(urlDB).then((personas) => {
    containerTable.innerHTML = "";
    if (personas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoCalificaciones());
    } else {
      containerTable.insertAdjacentHTML(
        "beforeend",
        htmlCalificaciones(...personas)
      );
    }
  });
};

btnSubmit.addEventListener("click", function () {
  insertHtmlCalificaciones().then(() => initializeButtons());
});

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

btnAllCalificaciones.addEventListener("click", function () {
  insertHtmlCalificaciones(true).then(() => {
    initializeButtons();
  });
});

btnClear.addEventListener("click", function () {
  containerTable.innerHTML = "";
});
