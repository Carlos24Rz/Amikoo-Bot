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
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      console.log("Delete: " + event.target.value);
      insertHtmlModalDelete(event.target.value);
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

//
//
//
//
//
//
//
//
//
//
//

const bodyEl = document.body;
console.log(bodyEl);

const htmlBackdrop = `
    <div class="backdrop"> </div>
`;

const removeModalBackDrop = function () {
  const modal = document.querySelector(".modal");
  const backdrop = document.querySelector(".backdrop");
  modal.remove();
  backdrop.remove();
};

const htmlModalDelete = function () {
  return `
  <div class="modal">
    <header class="modal-header"><h2>¿Deseas borrar esta calificacion?</h2></header>

    <div class="modal-content">
    </div>
    
    <footer class="modal-actions">
        <button id="btn-modal-cancelar">Cancelar</button>
        <button id="btn-modal-borrar">Borrar</button>
    </footer>
    </div>
      `;
};

const insertHtmlModalDelete = async function (query) {
  console.log("QUERY");
  console.log(query);

  const html = htmlModalDelete();
  console.log(html);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsDelete(query);
};

const URLDELETECALIFICACION = function (id) {
  return `${activeURL}/calificacion/delete/${id}`;
};

const deletPreguntaDB = async function (id) {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(URLDELETECALIFICACION(id), options);
};

const initializeButtonsDelete = function (id) {
  console.log("CLICKKKKKKK");
  const btnCancelar = document.querySelector("#btn-modal-cancelar");

  btnCancelar.addEventListener("click", function () {
    console.log("Click");
    removeModalBackDrop();
  });

  const btnBorrar = document.querySelector("#btn-modal-borrar");
  btnBorrar.addEventListener("click", function () {
    deletPreguntaDB(id)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showMsg(data);
      });
  });
};

const htmlMessageError = function (text) {
  return `
  
    <div class="modal-row-input modal-row-input--msg modal-row-input--msg--error"> 
      <p>${text}</p>
    </div>
  
  `;
};

const htmlMessageNoError = function (text) {
  return `
  
    <div class="modal-row-input modal-row-input--msg modal-row-input--msg--noerror"> 
      <p>${text}</p>
    </div>
  
  `;
};

const showMsg = function (data, removeModal = true) {
  const lastMsg = document.querySelector(".modal-row-input--msg");
  if (lastMsg != null) {
    lastMsg.remove();
  }

  const modalContent = document.querySelector(".modal-content");
  console.log(data);
  if (
    data != "Movida y actualizado el nuevo padre" &&
    data != "Movida" &&
    data != "Movida y actualizado el padre anterior" &&
    data != "Actualizada" &&
    data != "Eliminada" &&
    data != "Persona eliminada" &&
    data != "Calificacion eliminada"
  ) {
    modalContent.insertAdjacentHTML("beforeend", htmlMessageError(data));
  } else {
    modalContent.insertAdjacentHTML("beforeend", htmlMessageNoError(data));
    if (removeModal == true) {
      setTimeout(() => {
        removeModalBackDrop();
      }, 2000);
    }
  }
};
