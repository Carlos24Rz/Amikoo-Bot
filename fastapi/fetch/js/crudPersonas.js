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

const getDataDB = async function (url, query) {
  query == "" ? (query = "NONAMEDETECTED") : query;
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
// OLD CODE

document.getElementById("clearText").addEventListener("click", clearText);

document.getElementById("getText").addEventListener("click", getText);

// document
//   .getElementById("getBoton")
//   .addEventListener("click", initializeButtons);

// FIX: Make this function callback as a promise
document.getElementById("getUsers").addEventListener("click", () => {
  getUsers();
  // initializeButtons();
});

// TODO TODO TODO TODO TODO

// function initializeButtons() {
//   document.querySelectorAll(".grid-button-update").forEach(function (elem) {
//     elem.addEventListener("click", function (event) {
//       console.log("Update: " + event.target.value);
//     });
//   });
//   document.querySelectorAll(".grid-button-delete").forEach(function (elem) {
//     elem.addEventListener("click", function (event) {
//       console.log("Delete: " + event.target.value);
//     });
//   });
// }

function clearText() {
  document.getElementById("output").innerHTML = "";
  document.getElementById("grid-output").innerHTML = "";
  console.clear();
}

function getText() {
  fetch("./files/sample.txt")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("output").innerHTML = data;
    })
    .catch((err) => console.log(err));
}

// getDataDB(URLNOMBRE, "Angel");

function getUsers() {
  let user = document.getElementById("getUserName").value;
  let email = document.getElementById("getUserEmail").value;
  let url = "${activeURL}/persona/show";
  if (user != "" || email != "") {
    url = url.concat("?");
    if (user != "") {
      url = url.concat(`name=${user}&`);
    }
    if (email != "") {
      url = url.concat(`correo=${email}&`);
    }
  }

  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let output = "";
      data.forEach(function (persona) {
        output += `
      <div class="grid-row">
        <div class="grid-item grid-id">${persona.id}</div>
        <div class="grid-item grid-name">${persona.nombre}</div>
        <div class="grid-item grid-email">${persona.correo}</div>
        <div class="grid-item grid-time">${persona.fecha}</div>
        <div class="grid-item grid-description">${persona.descripcion}</div>
        <div class="grid-item grid-button-box">
          <button type="button" class="btn btn-warning grid-button grid-button-update" value="${persona.id}">Update</button>
          <button type="button" class="btn btn-danger grid-button grid-button-delete" value="${persona.id}">Delete</button>
        </div>
      </div>`;
      });
      document.getElementById("grid-output").innerHTML = output;
    })
    .catch((err) => console.log(err));
}
