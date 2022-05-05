const activeURL = "http://127.0.0.1:8000";
// const activeURL = "http://34.230.152.92:8080";

//////////////////////////////
// HTML TEMPLATES
//////////////////////////////

/*
 * Obtener html de las preguntas a mostrar
 * @param  {string} text    Preguntas a mostrar
 * @return {string} ---     Preguntas en formato html
 */
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
            <button type="button" class="btn-update grid-button-update" value="${pregunta.nombre}">Update</button>
            <button type="button" class="btn-delete grid-button-delete" value="${pregunta.nombre}">Delete</button>
        </div>
    </div>`
    )
    .join("");

  return htmlPreguntas;
};

/*
 * Obtener html cuando no haya preguntas
 * @return {string} ---     Mensaje a mostrar en el html
 */
const htmlNoPreguntas = function () {
  return `
    <div class="grid-row grid-row-error">
      <div class="grid-item">No hay preguntas</div>
    </div>`;
};

/*
 * Obtener backdrop para el fondo
 * @return {string} ---     Backdrop en html
 */
const htmlBackdrop = `
    <div class="backdrop"> </div>
`;

/*
 * Obtener modal window cuando se cree una pregunta
 * @param  {string} text    Titulo a mostrar en el modal
 * @return {string} ---     Modal window html
 */
const htmlModalCreate = function (title) {
  return `
        <div class="modal">
        <header class="modal-header"><h2>${title}</h2></header>

        <div class="modal-content">
            <div class="modal-row-input">
              <label for="padre-input">Ingresa padre</label>
              <input id="padre-input" type="text" placeholder="Nosotros" />
            </div>
            <div class="modal-row-input">
              <label for="nombre-pregunta-input">Ingresa nombre</label>
              <input
                  id="nombre-pregunta-input"
                  type="text"
                  placeholder="Nuestra app"
              />
            </div>
            <div class="modal-row-input">
              <label for="emoji-input">Ingresa emoji</label>
              <input id="emoji-input" type="text" placeholder=":)" />
            </div>
            <div class="modal-row-input modal-row-input--textarea">
              <label for="texto-input">Ingresa texto</label>
              <textarea
                id="texto-input"
                placeholder="(Menos de 100 palabras)"
              ></textarea>
            </div>

            
        </div>

        <footer class="modal-actions">
            <button id="btn-modal-cancelar">Cancelar</button>
            <button id="btn-modal-crear">Crear</button>
        </footer>
        </div>
    `;
};

/*
 * Obtener modal window cuando se actualice una pregunta
 * @param  {string} text    Pregunta a actualizar
 * @return {string} ---     Modal window html con los datos de la pregunta a actualizar
 */
const htmlModalUpdate = function (pregunta) {
  return `
  <div class="modal">
    <header class="modal-header"><h2>Actualizando pregunta</h2></header>

    <div class="modal-content">
        <div class="modal-row-input">
        <label for="id-input">Id</label>
        <input id="id-input" type="text" value="${pregunta.id}" disabled />
        </div>
        <div class="modal-row-input">
        <label for="padre-input">Padre</label>
        <input id="padre-input" type="text" value="${pregunta.padre_id}" ${
    pregunta.nombre == "Inicio" ? "disabled" : ""
  } />
        </div>
        <div class="modal-row-input">
        <label for="nombre-pregunta-input">Nombre</label>
        <input id="nombre-pregunta-input" type="text" value="${
          pregunta.nombre
        }" ${pregunta.nombre == "Inicio" ? "disabled" : ""}/>
        </div>
        <div class="modal-row-input">
        <label for="emoji-input">Emoji</label>
        <input id="emoji-input" type="text" value="${pregunta.emoji}" />
        </div>

        <div class="modal-row-input modal-row-input--textarea">
          <label for="texto-input">Ingresa texto</label>
          <textarea
            id="texto-input"
            placeholder="(Menos de 100 palabras)"
          >${pregunta.texto}</textarea>
        </div>
    </div>

    <footer class="modal-actions">
        <button id="btn-modal-cancelar">Cancelar</button>
        <button id="btn-modal-actualizar">Actualizar</button>
    </footer>
    </div>
      `;
};

/*
 * Obtener modal window cuando se borre una pregunta
 * @param  {string} text    Pregunta a borrar
 * @return {string} ---     Modal window html con los datos de la pregunta a borrar
 */
const htmlModalDelete = function (pregunta) {
  return `
  <div class="modal">
    <header class="modal-header"><h2>¿Deseas borrar esta pregunta?</h2></header>

    <div class="modal-content">
        <div class="modal-row-input">
        <label for="id-input">Id</label>
        <input id="id-input" type="text" value="${pregunta.id}" disabled />
        </div>
        <div class="modal-row-input">
        <label for="padre-input">Padre</label>
        <input id="padre-input" type="text" value="${pregunta.padre_id}" disabled/>
        </div>
        <div class="modal-row-input">
        <label for="nombre-pregunta-input">Nombre</label>
        <input id="nombre-pregunta-input" type="text" value="${pregunta.nombre}" disabled/>
        </div>
        <div class="modal-row-input">
        <label for="emoji-input">Emoji</label>
        <input id="emoji-input" type="text" value="${pregunta.emoji}" disabled />
        </div>
        <div class="modal-row-input modal-row-input--textarea">
          <label for="texto-input">Ingresa texto</label>
          <textarea
            id="texto-input"
            placeholder=""
            disabled
          ></textarea>
        </div>
    </div>

    <footer class="modal-actions">
        <button id="btn-modal-cancelar">Cancelar</button>
        <button id="btn-modal-borrar">Borrar</button>
    </footer>
    </div>
      `;
};

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

const URL = `${activeURL}/pregunta/show?`; // url para mostrar las preguntas
const URLPREGUNTA = `${activeURL}/pregunta/show?nombre=`; // url para buscar una pregunta en base a su nombre

const containerTable = document.querySelector(".container-database-info"); // Container en donde se insertan las rows con personas
const inputPregunta = document.querySelector("#nombre-input");
const btnUser = document.querySelector("#btn-nombre");

const btnAllPreguntas = document.querySelector(".btn-all-preguntas");
const btnClear = document.querySelector(".btn-clear");

/*
 * Obtener datos de la base de datos
 * @param  {string} url   Url para hacerle fetch
 * @param  {string} query Valor para concaternarlo a la url y completarla
 * @return {string} data  Informacion obtenida del fetch a la url completa
 */
const getDataDB = async function (url, query = "") {
  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  return data;
};

/*
 * Insertar las preguntas en la pagina
 * @param  {string} url   Url para hacerle fetch
 */
const insertHtmlPreguntas = async function (url) {
  const nombreValue = inputPregunta.value;

  await getDataDB(url, nombreValue).then((preguntas) => {
    containerTable.innerHTML = "";
    // Si no tenemos preguntas
    if (preguntas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPreguntas());
    }
    // Si tenemos preguntas
    else {
      containerTable.insertAdjacentHTML(
        "beforeend",
        htmlPreguntas(...preguntas)
      );
    }
  });
};

/*
 * Por cada pregunta agregada, se le habilitan sus correspondientes botones
 */
const initializeButtons = function () {
  document.querySelectorAll(".grid-button-update").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      insertHtmlModalUpdate(event.target.value);
    });
  });
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      insertHtmlModalDelete(event.target.value);
    });
  });
};

// Para buscar por nombre de pregunta
btnUser.addEventListener("click", function () {
  insertHtmlPreguntas(URLPREGUNTA).then(() => {
    initializeButtons();
  });
});

// Cuando se le da enter al input de pregunta
inputPregunta.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPreguntas(URLPREGUNTA).then(() => {
      initializeButtons();
    });
  }
});

// Cuando se le da click al boton de todas las preguntas
btnAllPreguntas.addEventListener("click", function () {
  insertHtmlPreguntas(URL).then(() => {
    initializeButtons();
  });
});

// Cuando se le da click al boton de limpiar las preguntas
btnClear.addEventListener("click", function () {
  containerTable.innerHTML = "";
});

const btnNewPregunta = document.querySelector(".btn-crear-nueva-pregunta");

// Boton para crear una nueva pregunta
btnNewPregunta.addEventListener("click", function () {
  insertHtmlModalCreate("Crear nueva pregunta");
  initializeButtonsCreate();
});

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
 * Mostrar el mensaje generado por una promesa
 * @param  {string}     data           Info generada por la promesa como respuesta
 * @param  {bool}       removeModal    Se quita el modal window o no
 * @return {Promise}  ---         Fetch de la url para publicar la pregunta y sus opciones
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
    data != "Pregunta creada" &&
    data != "Movida y actualizado el nuevo padre" &&
    data != "Movida" &&
    data != "Movida y actualizado el padre anterior" &&
    data != "Actualizada" &&
    data != "Eliminada"
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

// En el body se insertaran el backdrop y el modal window
const bodyEl = document.body;

/*
 * Insertar la modal window para crear una pregunta
 * @param  {string} title   Titulo para poner en el modal window
 */
const insertHtmlModalCreate = function (title) {
  const html = htmlModalCreate(title);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
};

/*
 * Cuando se crea um modal window, se inicializan los botones de la ventana
 */
const initializeButtonsCreate = function () {
  // Boton para cancelar la ventana
  const btnCancelar = document.querySelector("#btn-modal-cancelar");
  btnCancelar.addEventListener("click", function () {
    removeModalBackDrop();
  });

  // Boton para creear la pregunta
  const btnCrear = document.querySelector("#btn-modal-crear");
  btnCrear.addEventListener("click", function () {
    // Se guardan los valores de los input
    const padreValue = document.querySelector("#padre-input").value;
    const nombreValue = document.querySelector("#nombre-pregunta-input").value;
    const emojiValue = document.querySelector("#emoji-input").value;
    const textoValue = document.querySelector("#texto-input").value;
    const objPregunta = {
      padre: padreValue,
      nombre: nombreValue,
      emoji: emojiValue,
      texto: textoValue,
    };

    // Se publica la pregunta en la DB
    postPreguntaDB(objPregunta)
      .then((res) => res.json())
      .then((data) => {
        // Se muestra el mensaje generado por el postPreguntaDB()
        showMsg(data);
      });
  });
};

const URLPOSTPREGUNTA = `${activeURL}/pregunta/create`; // url para publicar la pregunta

/*
 * Publicar la pregunta en la base de datos
 * @param  {obj}      pregunta    Pregunta a guardar
 * @return {Promise}  ---         Fetch de la url para publicar la pregunta y sus opciones
 */
const postPreguntaDB = async function (pregunta) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pregunta),
  };

  return fetch(URLPOSTPREGUNTA, options);
};

//
//
//
//
//
//
//

/*
 * Publicar la pregunta en la base de datos
 * @param  {obj}      pregunta    Pregunta a guardar
 * @return {Promise}  ---         Fetch de la url para publicar la pregunta y sus opciones
 */
const URLUPDATEPREGUNTA = function (nombre) {
  const url = `${activeURL}/pregunta/${nombre}/details`;
  return url;
};

/*
 * Insertar la modal window para actualizar una pregunta
 * @param  {string} query   Nombre de la pregunta a actualizar
 */
const insertHtmlModalUpdate = async function (query) {
  const pregunta = await getDataDB(URLUPDATEPREGUNTA(query));

  const html = htmlModalUpdate(pregunta[0]);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsUpdate();
};

/*
 * Cuando se crea um modal window, se inicializan los botones de la ventana
 */
const initializeButtonsUpdate = function () {
  // Boton para cerrar el modal window
  const btnCancelar = document.querySelector("#btn-modal-cancelar");
  btnCancelar.addEventListener("click", function () {
    console.log("Click");
    removeModalBackDrop();
  });

  // Boton para actualizar la pregunta
  const btnActualizar = document.querySelector("#btn-modal-actualizar");

  btnActualizar.addEventListener("click", function () {
    // Se guarda la pregunta que se debe actualizar
    const idValue = document.querySelector("#id-input").value;
    const padreValue = document.querySelector("#padre-input").value;
    const nombreValue = document.querySelector("#nombre-pregunta-input").value;
    const emojiValue = document.querySelector("#emoji-input").value;
    const textoValue = document.querySelector("#texto-input").value;
    const objPregunta = {
      id: idValue,
      padre: padreValue,
      nombre: nombreValue,
      emoji: emojiValue,
      texto: textoValue,
    };

    // Se publica la actualizacion del cuerpo (nombre, emoji, texto) de la pregunta en la DB
    putPreguntaBodyDB(objPregunta).then(
      (res) => res.json().then((data) => showMsg(data, false)) // Al final se muestra la respuesta de la promesa
    );

    // Se publica la actualizacion de padre de la pregunta en la DB
    putPreguntaPadreDB(objPregunta).then(
      (res) => res.json().then((data) => showMsg(data)) // Al final se muestra la respuesta de la promesa
    );
  });
};

// url para actualizar la pregunta (nombre, emoji, texto) a base del id
const URLPUTPREGUNTABODY = function (id) {
  return `${activeURL}/pregunta/${id}/update/`;
};

/*
 * Publicar la el cuerpo de la pregunta en la base de datos
 * @param  {obj}      pregunta    Pregunta a actualizar
 * @return {Promise}  ---         Fetch de la url para actualizar la pregunta (cuerpo)
 */
const putPreguntaBodyDB = async function (pregunta) {
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pregunta),
  };

  return fetch(`${URLPUTPREGUNTABODY(pregunta.id)}`, options);
};

// url para actualizar el padre de la pregunta a base del id
const URLPUTPREGUNTAPADRE = function (id) {
  return `${activeURL}/pregunta/${id}/move/`;
};

/*
 * Publicar el nuevo padre de la pregunta en la base de datos
 * @param  {obj}      pregunta    Pregunta a actualizar
 * @return {Promise}  ---         Fetch de la url para actualizar la pregunta (padre)
 */
const putPreguntaPadreDB = async function (pregunta) {
  const options = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pregunta),
  };

  return fetch(`${URLPUTPREGUNTAPADRE(pregunta.id)}`, options);
};

//
//
//
//

/*
 * Insertar la modal window para borrar una pregunta
 * @param  {string} query   Pregunta a borrar
 */
const insertHtmlModalDelete = async function (query) {
  const pregunta = await getDataDB(URLUPDATEPREGUNTA(query));

  const html = htmlModalDelete(pregunta[0]);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsDelete();
};

// url para borrar la pregunta
const URLDELETEPREGUNTA = function (id) {
  return `${activeURL}/pregunta/${id}/delete`;
};

/*
 * Borrar la pregunta por id de la base de datos
 * @param  {int}      id    Pregunta a borrar
 * @return {Promise}  ---   Fetch de la url para borrar la pregunta
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
const initializeButtonsDelete = function () {
  const btnCancelar = document.querySelector("#btn-modal-cancelar");

  btnCancelar.addEventListener("click", function () {
    removeModalBackDrop();
  });

  const btnBorrar = document.querySelector("#btn-modal-borrar");
  btnBorrar.addEventListener("click", function () {
    const idValue = document.querySelector("#id-input").value;
    deletPreguntaDB(idValue)
      .then((res) => res.json())
      .then((data) => {
        showMsg(data);
      });
  });
};
