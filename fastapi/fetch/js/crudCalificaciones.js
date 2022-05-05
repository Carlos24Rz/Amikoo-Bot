const activeURL = "http://127.0.0.1:8000";
// const activeURL = "http://34.230.152.92:8080";

//////////////////////////////
// HTML TEMPLATES
//////////////////////////////

/*
 * Obtener html de las calificaciones a mostrar
 * @param  {string} text    Calificaciones a mostrar
 * @return {string} ---     Calificaciones en formato html
 */
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

/*
 * Obtener html cuando no haya calificaciones
 * @return {string} ---     Mensaje a mostrar en el html
 */
const htmlNoCalificaciones = function () {
  return `
    <div class="grid-row grid-row-error">
      <div class="grid-item">No hay calificaciones</div>
    </div>`;
};

/*
 * Obtener modal window cuando se borre una calificacione
 * @param  {string} text    Pregunta a borrar
 * @return {string} ---     Modal window html con los datos de la calificacion a borrar
 */
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

/*
 * Obtener backdrop para el fondo
 * @return {string} ---     Backdrop en html
 */
const htmlBackdrop = `
    <div class="backdrop"> </div>
`;

/*
 * Mostrar mensaje de error en el modal window
 * @param  {string} text    Error a mostrar
 * @return {string} ---     Html con el error
 */
const htmlMessageError = function (text) {
  return `
  
    <div class="modal-row-input modal-row-input--msg modal-row-input--msg--error"> 
      <p>${text}</p>
    </div>
  
  `;
};

/*
 * Mostrar mensaje de no error en el modal window
 * @param  {string} text    Mensaje a mostrar
 * @return {string} ---     Html con el mensaje
 */
const htmlMessageNoError = function (text) {
  return `
  
    <div class="modal-row-input modal-row-input--msg modal-row-input--msg--noerror"> 
      <p>${text}</p>
    </div>
  
  `;
};

const URL = `${activeURL}/calificacion/show?`; // url para mostrar las calificaciones

// url para mostrar las calificaciones entre fechas
const urlFechas = function (dateBegin, dateEnd) {
  return `${URL}dateBegin=${dateBegin}&dateEnd=${dateEnd}`;
};

const inputDateBegin = document.querySelector("#date-begin");
const inputDateEnd = document.querySelector("#date-end");
const btnSubmit = document.querySelector("#btn-submit");
const containerTable = document.querySelector(".container-database-info");
const btnAllCalificaciones = document.querySelector(".btn-all-calificaciones");
const btnClear = document.querySelector(".btn-clear");

/*
 * Obtener datos de la base de datos
 * @param  {string} url   Url para hacerle fetch que ya viene con las calificiones en la url
 * @return {string} data  Informacion obtenida del fetch a la url completa
 */
const getDataDB = async function (url) {
  const data = await fetch(url)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  return data;
};

/*
 * Insertar las calificaciones
 * @param  {bool} btnAll   Verificar si se muestran todas las calificaciones o entre fechas
 */
const insertHtmlCalificaciones = async function (btnAll = false) {
  const valueDateBegin = inputDateBegin.value;
  const valueDateEnd = inputDateEnd.value;

  // Se ajusta la url para buscar todas las calificaciones o por fechas
  let urlDB;
  btnAll == true
    ? (urlDB = URL)
    : (urlDB = urlFechas(valueDateBegin, valueDateEnd));

  await getDataDB(urlDB).then((calificaciones) => {
    // Se elimina el contenido que ya esta en el containerTable
    containerTable.innerHTML = "";

    // Si no hay calificaciones, se imprime un mensaje de que no hay
    if (calificaciones.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoCalificaciones());
    }
    // Si sí hay calificaciones, se muestran
    else {
      containerTable.insertAdjacentHTML(
        "beforeend",
        htmlCalificaciones(...calificaciones)
      );
    }
  });
};

// Habilitar boton para buscar calificaciones por fechas
btnSubmit.addEventListener("click", function () {
  insertHtmlCalificaciones().then(() => initializeButtons());
});

/*
 * Por cada calificacion agregada, se le habilita su boton de borrar la calificacion
 */
const initializeButtons = function () {
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      insertHtmlModalDelete(event.target.value);
    });
  });
};

// Habilitar boton para buscar todas las calificaciones
btnAllCalificaciones.addEventListener("click", function () {
  insertHtmlCalificaciones(true).then(() => {
    initializeButtons();
  });
});

// Habilitar boton para limpiar la pantalla de las calificaciones
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

/*
 * Remover el backdrop y la window modal
 */
const removeModalBackDrop = function () {
  const modal = document.querySelector(".modal");
  const backdrop = document.querySelector(".backdrop");
  modal.remove();
  backdrop.remove();
};

/*
 * Insertar la modal window para borrar una calificacion
 * @param  {int} id   Id de la calificacion a borrar
 */
const insertHtmlModalDelete = async function (id) {
  const html = htmlModalDelete();
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsDelete(query);
};

// url para borrar una calificacion que debe ser po id
const URLDELETECALIFICACION = function (id) {
  return `${activeURL}/calificacion/delete/${id}`;
};

/*
 * Borrar la calificacion por id de la base de datos
 * @param  {int}      id    Calificacion a borrar
 * @return {Promise}  ---   Fetch de la url para borrar la calificacion
 */
const deleteCalificacionDB = async function (id) {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(URLDELETECALIFICACION(id), options);
};

/*
 * Cuando se crea um modal window, se inicializan los botones de la ventana
 */
const initializeButtonsDelete = function (id) {
  // Boton para cerrar el modal window
  const btnCancelar = document.querySelector("#btn-modal-cancelar");
  btnCancelar.addEventListener("click", function () {
    removeModalBackDrop();
  });

  // Boton para borrar a la persona
  const btnBorrar = document.querySelector("#btn-modal-borrar");
  btnBorrar.addEventListener("click", function () {
    deleteCalificacionDB(id)
      .then((res) => res.json())
      .then((data) => {
        showMsg(data);
      });
  });
};

/*
 * Mostrar el mensaje generado por una promesa
 * @param  {string}     data           Info generada por la promesa como respuesta
 * @param  {bool}       removeModal    Se quita el modal window o no
 * @return {Promise}  ---         Fetch de la url
 */
const showMsg = function (data, removeModal = true) {
  const lastMsg = document.querySelector(".modal-row-input--msg");
  // Si hay un mensaje (error/noerror) en la ventana se elimina
  if (lastMsg != null) {
    lastMsg.remove();
  }

  const modalContent = document.querySelector(".modal-content");
  // Hay error en el data y se debe mostrar el htmlMessageError
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
  }
  // No hay error en el data y se debe mostrar el htmlMessageNoError
  else {
    modalContent.insertAdjacentHTML("beforeend", htmlMessageNoError(data));
    // Se verifica si se remueve la modal window o no
    if (removeModal == true) {
      setTimeout(() => {
        removeModalBackDrop();
      }, 2000);
    }
  }
};
