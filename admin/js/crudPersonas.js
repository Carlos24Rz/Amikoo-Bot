const activeURL = "http://34.230.152.92:8080";
// const activeURL = "http://34.230.152.92:8080";

//////////////////////////////
// HTML TEMPLATES
//////////////////////////////

/*
 * Obtener html de las preguntas a mostrar
 * @param  {string} text    Preguntas a mostrar
 * @return {string} ---     Preguntas en formato html
 */
const htmlPersonas = function (...personas) {
  const htmlPersonas = personas
    .map(
      (persona) => `
  <div class="grid-row">
    <div class="grid-item grid-item--id">${persona.id}</div>
    <div class="grid-item grid-item--nombre">${persona.nombre}</div>
    <div class="grid-item grid-item--correo">${persona.correo}</div>
    <div class="grid-item grid-item--fecha">${persona.fecha}</div>
    <div class="grid-item grid-item--descripcion">${persona.descripcion}</div>
    <div class="grid-item grid-item--botones">
      <button type="button" class="btn-delete grid-button-delete" value="${persona.id}">Delete</button>
    </div>
  </div>`
    )
    .join("");

  return htmlPersonas;
};

/*
 * Obtener html cuando no haya preguntas
 * @return {string} ---     Mensaje a mostrar en el html
 */
const htmlNoPersonas = function () {
  return `
  <div class="grid-row grid-row-error">
    <div class="grid-item">No hay personas</div>
  </div>`;
};

/*
 * Obtener modal window cuando se borre una pregunta
 * @param  {string} text    Pregunta a borrar
 * @return {string} ---     Modal window html con los datos de la pregunta a borrar
 */
const htmlModalDelete = function () {
  return `
  <div class="modal">
    <header class="modal-header"><h2>¿Deseas borrar esta persona?</h2></header>

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

const URL = `${activeURL}/persona/show?`; // url para mostrar a las personas
const URLNOMBRE = `${activeURL}/persona/show?name=`; // url para buscar una persona por nombre
const URLCORREO = `${activeURL}/persona/show?correo=`; // url para buscar una persona por correo
const inputName = document.querySelector("#user-input"); // input del nombre
const inputMail = document.querySelector("#email-input"); // input del correo
const btnName = document.querySelector("#btn-user"); // boton de busqueda del nombre
const btnEmail = document.querySelector("#btn-email"); // boton de busqueda del correo
const containerTable = document.querySelector(".container-database-info"); // Container en donde se insertan las rows con personas
const btnAllUsers = document.querySelector(".btn-all-users"); // boton para seleccionar todas las personas
const btnClear = document.querySelector(".btn-clear"); // boton para limpiar la busqueda

/*
 * Obtener datos de la base de datos
 * @param  {string} url   Url para hacerle fetch
 * @param  {string} query Valor para concaternarlo a la url y completarla
 * @param  {string} by    Seleccionar si la query es por usuario o por correo
 * @return {string} data  Informacion obtenida del fetch a la url completa
 */
const getDataDB = async function (url, query, by = "user") {
  // Cuando se quiere buscar por usuario y el input esta vacio
  if (by == "user") {
    query == "" ? (query = "NONAMEDETECTED") : query;
  }
  // Cuando se quiere buscar por correo y el input esta vacio
  if (by == "mail") {
    query == "" ? (query = "NOEMAILDETECTED@hotmail.com") : query;
  }

  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  return data;
};

/*
 * Insertar las personas por nombre
 * @param  {string} url   Url para hacerle fetch
 */
const insertHtmlPersonasByName = async function (url) {
  const userValue = inputName.value;

  await getDataDB(url, userValue).then((personas) => {
    // Se elimina el contenido que ya esta en el containerTable
    containerTable.innerHTML = "";

    // Si no hay personas, se imprime un mensaje de que no hay
    if (personas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPersonas());
    }
    // Si sí hay preguntas, se muestran
    else {
      containerTable.insertAdjacentHTML("beforeend", htmlPersonas(...personas));
    }
  });
};

/*
 * Insertar las personas por correo
 * @param  {string} url   Url para hacerle fetch
 */
const insertHtmlPersonasByCorreo = async function (url) {
  const userValue = inputMail.value;

  // Se elimina el contenido que ya esta en el containerTable
  containerTable.innerHTML = "";
  await getDataDB(url, userValue, "mail").then((personas) => {
    // Si no hay personas, se imprime un mensaje de que no hay
    if (personas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPersonas());
    }
    // Si sí hay preguntas, se muestran
    else {
      containerTable.insertAdjacentHTML("beforeend", htmlPersonas(...personas));
    }
  });
};

/*
 * Por cada persona agregada, se le habilita su boton de borrar la pregunta
 */
const initializeButtons = function () {
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      insertHtmlModalDelete(event.target.value);
    });
  });
};

// Para buscar por nombre de persona con el boton de busqueda
btnName.addEventListener("click", function () {
  insertHtmlPersonasByName(URLNOMBRE).then(() => {
    initializeButtons();
  });
});

// Para buscar por correo de persona con el boton de busqueda
btnEmail.addEventListener("click", function () {
  insertHtmlPersonasByCorreo(URLCORREO).then(() => {
    initializeButtons();
  });
});

// Para buscar por nombre de persona al darle enter al input
inputName.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPersonasByName(URLNOMBRE).then(() => {
      initializeButtons();
    });
  }
});

// Para buscar por correo de persona al darle enter al input
inputMail.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPersonasByCorreo(URLCORREO).then(() => {
      initializeButtons();
    });
  }
});

// Cuando se le da click al boton de todas las personas
btnAllUsers.addEventListener("click", function () {
  insertHtmlPersonasByName(URL).then(() => {
    initializeButtons();
  });
});

// Cuando se le da click al boton de limpiar las personas
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
 * Insertar la modal window para borrar una persona
 * @param  {int} id   Id de la persona a borrar
 */
const insertHtmlModalDelete = async function (id) {
  const html = htmlModalDelete();
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsDelete(id);
};

// url para borrar una pregunta por id
const URLDELETEPREGUNTA = function (id) {
  return `${activeURL}/persona/delete/${id}`;
};

/*
 * Borrar la persona por id de la base de datos
 * @param  {int}      id    Persona a borrar
 * @return {Promise}  ---   Fetch de la url para borrar la persona
 */
const deletPreguntaDB = async function (id) {
  const options = {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(URLDELETEPREGUNTA(id), options);
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
    deletPreguntaDB(id)
      .then((res) => res.json())
      .then((data) => {
        showMsg(data);
      });
  });
};

// Lista de mensajes correctos que no son errores
const listMsgCorrect = [
  "Movida y actualizado el nuevo padre",
  "Movida",
  "Movida y actualizado el padre anterior",
  "Actualizada",
  "Eliminada",
  "Persona eliminada",
  "Calificacion eliminada",
];

// Lista de mensajes correctos para refrescar la pagina
const listMsgReload = [
  "Eliminada",
  "Persona eliminada",
  "Calificacion eliminada",
];

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
  if (!listMsgCorrect.includes(data)) {
    modalContent.insertAdjacentHTML("beforeend", htmlMessageError(data));
  }
  // No hay error en el data y se debe mostrar el htmlMessageNoError
  else {
    modalContent.insertAdjacentHTML("beforeend", htmlMessageNoError(data));
    // Se verifica si se remueve la modal window o no
    if (removeModal == true) {
      setTimeout(() => {
        removeModalBackDrop();

        if (listMsgReload.includes(data)) {
          location.reload();
        }
      }, 2000);
    }
  }
};
