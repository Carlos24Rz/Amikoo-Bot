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
 * Obtener modal window cuando se cree una pregunta
 * @param  {string} text    Titulo a mostrar en el modal
 * @return {string} ---     Modal window html
 */
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

const URL = `${activeURL}/pregunta/show?`;
const URLPREGUNTA = `${activeURL}/pregunta/show?nombre=`;
const inputPregunta = document.querySelector("#nombre-input");
const btnUser = document.querySelector("#btn-nombre");
const containerTable = document.querySelector(".container-database-info");

const btnAllPreguntas = document.querySelector(".btn-all-preguntas");
const btnClear = document.querySelector(".btn-clear");

const getDataDB = async function (url, query = "") {
  // query == "" ? (query = JSON.stringify(query)) : query;

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
      insertHtmlModalUpdate(event.target.value);
    });
  });
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      console.log("Delete: " + event.target.value);
      insertHtmlModalDelete(event.target.value);
    });
  });
};

// Para buscar por nombre pregunta
btnUser.addEventListener("click", function () {
  insertHtmlPreguntas(URLPREGUNTA).then(() => {
    initializeButtons();
  });
});

// Cuando se le da enter
inputPregunta.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    insertHtmlPreguntas(URLPREGUNTA).then(() => {
      initializeButtons();
    });
  }
});

// Boton de todas las preguntas
btnAllPreguntas.addEventListener("click", function () {
  insertHtmlPreguntas(URL).then(() => {
    initializeButtons();
  });
});

// Boton de limpiar
btnClear.addEventListener("click", function () {
  containerTable.innerHTML = "";
});

//
//
//
//
//
//
const bodyEl = document.body;
console.log(bodyEl);

const insertHtmlModalCreate = function (title) {
  const html = htmlModalCreate(title);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
};

// insertHtmlModalCreate("Mi titulo", "Mi contenido");

const btnNewPregunta = document.querySelector(".btn-crear-nueva-pregunta");

btnNewPregunta.addEventListener("click", function () {
  insertHtmlModalCreate("Crear nueva pregunta");
  initializeButtonsCreate();
});

const removeModalBackDrop = function () {
  const modal = document.querySelector(".modal");
  const backdrop = document.querySelector(".backdrop");
  modal.remove();
  backdrop.remove();
};

const initializeButtonsCreate = function () {
  const btnCancelar = document.querySelector("#btn-modal-cancelar");
  btnCancelar.addEventListener("click", function () {
    removeModalBackDrop();
  });

  const btnCrear = document.querySelector("#btn-modal-crear");
  btnCrear.addEventListener("click", function () {
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

    console.log(objPregunta.texto.toString());
    console.log(objPregunta.texto.trim());
    postPreguntaDB(objPregunta)
      .then((res) => res.json())
      .then((data) => {
        const lastMsg = document.querySelector(".modal-row-input--msg");
        if (lastMsg != null) {
          lastMsg.remove();
        }

        const modalContent = document.querySelector(".modal-content");
        console.log(data);
        if (data != "Pregunta creada") {
          console.log(data);
          console.log("first");
          modalContent.insertAdjacentHTML("beforeend", htmlMessageError(data));
        } else {
          modalContent.insertAdjacentHTML(
            "beforeend",
            htmlMessageNoError(data)
          );
          setTimeout(() => {
            removeModalBackDrop();
          }, 2000);
        }
      });
  });
};

const URLPOSTPREGUNTA = `${activeURL}/pregunta/create`;
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
// const URLUPDATEPREGUNTA = `${activeURL}/pregunta/show?nombre=`;
// http://127.0.0.1:8000/pregunta/Nosotros%20con%20inicio/details
const URLUPDATEPREGUNTA = function (nombre) {
  console.log("NOMBRE: ", nombre);
  const url = `${activeURL}/pregunta/${nombre}/details`;
  console.log("URL: ", url);
  return url;
};

const insertHtmlModalUpdate = async function (query) {
  console.log("QUERY: ", query);
  const pregunta = await getDataDB(URLUPDATEPREGUNTA(query));

  const html = htmlModalUpdate(pregunta[0]);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsUpdate();
};

const initializeButtonsUpdate = function () {
  console.log("CLICKKKKKKK");
  const btnCancelar = document.querySelector("#btn-modal-cancelar");

  btnCancelar.addEventListener("click", function () {
    console.log("Click");
    removeModalBackDrop();
  });

  // Aqui va lo que se debe actualizar
  const btnActualizar = document.querySelector("#btn-modal-actualizar");
  btnActualizar.addEventListener("click", function () {
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
    console.log(objPregunta);

    putPreguntaBodyDB(objPregunta).then((res) =>
      res.json().then((data) => showMsg(data, false))
    );

    putPreguntaPadreDB(objPregunta).then((res) =>
      res.json().then((data) => showMsg(data))
    );
  });
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
    data != "Eliminada"
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

const URLPUTPREGUNTABODY = function (id) {
  return `${activeURL}/pregunta/${id}/update/`;
};

const putPreguntaBodyDB = async function (pregunta) {
  console.log("pregunta: ");
  console.log(pregunta);
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

//  "Movida y actualizado ambos padres" "Movida"

const URLPUTPREGUNTAPADRE = function (id) {
  return `${activeURL}/pregunta/${id}/move/`;
};

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

const insertHtmlModalDelete = async function (query) {
  console.log("QUERY");
  console.log(query);
  const pregunta = await getDataDB(URLUPDATEPREGUNTA(query));

  console.log("PREGUNTA");
  console.log(pregunta);

  const html = htmlModalDelete(pregunta[0]);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsDelete();
};

const URLDELETEPREGUNTA = function (id) {
  return `${activeURL}/pregunta/${id}/delete`;
};

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

const initializeButtonsDelete = function () {
  console.log("CLICKKKKKKK");
  const btnCancelar = document.querySelector("#btn-modal-cancelar");

  btnCancelar.addEventListener("click", function () {
    console.log("Click");
    removeModalBackDrop();
  });

  const btnBorrar = document.querySelector("#btn-modal-borrar");
  btnBorrar.addEventListener("click", function () {
    const idValue = document.querySelector("#id-input").value;
    console.log(idValue);
    deletPreguntaDB(idValue)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        showMsg(data);
      });
  });
};
