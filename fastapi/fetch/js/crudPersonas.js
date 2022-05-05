const activeURL = "http://127.0.0.1:8000";
// const activeURL = "http://34.230.152.92:8080";

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

const htmlNoPersonas = function () {
  return `
  <div class="grid-row grid-row-error">
    <div class="grid-item">No hay personas</div>
  </div>`;
};

const URL = `${activeURL}/persona/show?`;
const URLNOMBRE = `${activeURL}/persona/show?name=`;
const URLCORREO = `${activeURL}/persona/show?correo=`;
const inputUser = document.querySelector("#user-input");
const inputCorreo = document.querySelector("#email-input");
const btnUser = document.querySelector("#btn-user");
const btnEmail = document.querySelector("#btn-email");
const containerTable = document.querySelector(".container-database-info");
const btnAllUsers = document.querySelector(".btn-all-users");
const btnClear = document.querySelector(".btn-clear");

const getDataDB = async function (url, query, by = "user") {
  if (by == "user") {
    query == "" ? (query = "NONAMEDETECTED") : query;
  }
  if (by == "mail") {
    query == "" ? (query = "NOEMAILDETECTED@hotmail.com") : query;
  }

  console.log(query);
  console.log(url);

  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((err) => err);

  return data;
};

const insertHtmlPersonasByUser = async function (url) {
  const userValue = inputUser.value;

  await getDataDB(url, userValue).then((personas) => {
    containerTable.innerHTML = "";

    console.log("Personas: ", personas);

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
  await getDataDB(url, userValue, "mail").then((personas) => {
    if (personas.length <= 0) {
      containerTable.insertAdjacentHTML("beforeend", htmlNoPersonas());
    } else {
      containerTable.insertAdjacentHTML("beforeend", htmlPersonas(...personas));
    }
  });
};

const initializeButtons = function () {
  document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      console.log("Delete: " + event.target.value);
      insertHtmlModalDelete(event.target.value);
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

const insertHtmlModalDelete = async function (query) {
  console.log("QUERY");
  console.log(query);

  const html = htmlModalDelete();
  console.log(html);
  bodyEl.insertAdjacentHTML("beforeend", htmlBackdrop);
  bodyEl.insertAdjacentHTML("beforeend", html);
  initializeButtonsDelete(query);
};

const URLDELETEPREGUNTA = function (id) {
  return `${activeURL}/persona/delete/${id}`;
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
    data != "Persona eliminada"
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
