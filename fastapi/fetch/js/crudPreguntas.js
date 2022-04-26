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
            <button type="button" class="btn-update grid-button-update" value="${pregunta.nombre}">Update</button>
            <button type="button" class="btn-delete grid-button-delete" value="${pregunta.nombre}">Delete</button>
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
const URLPREGUNTA = "http://127.0.0.1:8000/pregunta/show?nombre=";
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
      insertHtmlModalUpdate(event.target.value);
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
            <div class="modal-row-input">
            <label for="texto-input">Ingresa texto</label>
            <input id="texto-input" type="text" placeholder="Esta pregunta..." />
            </div>
        </div>

        <footer class="modal-actions">
            <button id="btn-modal-cancelar">Cancelar</button>
            <button id="btn-modal-crear">Crear</button>
        </footer>
        </div>
    `;
};

const insertHtmlModalCreate = function (title) {
  const html = htmlModalCreate(title);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
};

// insertHtmlModalCreate("Mi titulo", "Mi contenido");

const btnNewPregunta = document.querySelector(".btn-crear-nueva-pregunta");

btnNewPregunta.addEventListener("click", function () {
  insertHtmlModalCreate("Niceeee");
  initializeButtonsCreate();
});

const initializeButtonsCreate = function () {
  const btnCancelar = document.querySelector("#btn-modal-cancelar");
  btnCancelar.addEventListener("click", function () {
    const modal = document.querySelector(".modal");
    const backdrop = document.querySelector(".backdrop");
    modal.remove();
    backdrop.remove();
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
    console.log(objPregunta);
    putPreguntaDB(objPregunta);
  });
};

const URLPOSTPREGUNTA = "http://127.0.0.1:8000/pregunta/create";
const putPreguntaDB = async function (pregunta) {
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
const URLUPDATEPREGUNTA = "http://127.0.0.1:8000/pregunta/show?nombre=";

const htmlModalUpdate = function (pregunta) {
  return `
  <div class="modal">
    <header class="modal-header"><h2>---------</h2></header>

    <div class="modal-content">
        <div class="modal-row-input">
        <label for="id-input">Id</label>
        <input id="id-input" type="text" placeholder="${pregunta.id}" />
        </div>
        <div class="modal-row-input">
        <label for="padre-input">Padre</label>
        <input id="padre-input" type="text" placeholder="${pregunta.padre_id}" />
        </div>
        <div class="modal-row-input">
        <label for="nombre-pregunta-input">Nombre</label>
        <input id="nombre-pregunta-input" type="text" placeholder="${pregunta.nombre}" />
        </div>
        <div class="modal-row-input">
        <label for="emoji-input">Emoji</label>
        <input id="emoji-input" type="text" placeholder="${pregunta.emoji}" />
        </div>
        <div class="modal-row-input">
        <label for="texto-input">Texto</label>
        <input id="texto-input" type="text" placeholder="${pregunta.texto}" />
        </div>
    </div>

    <footer class="modal-actions">
        <button id="btn-modal-cancelar">Cancelar</button>
        <button id="btn-modal-actualizar">Actualizar</button>
    </footer>
    </div>
      `;
};

const insertHtmlModalUpdate = async function (query) {
  const pregunta = await getDataDB(URLUPDATEPREGUNTA, query);

  const html = htmlModalUpdate(pregunta[0]);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
};
