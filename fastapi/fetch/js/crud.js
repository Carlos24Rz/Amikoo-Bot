document.getElementById('clearText')
.addEventListener('click',clearText);

document.getElementById('getText')
.addEventListener('click',getText);

document.getElementById('getBoton')
.addEventListener('click', initializeButtons);

// FIX: Make this function callback as a promise
document.getElementById('getUsers')
.addEventListener('click', () => {
  getUsers();
  initializeButtons();
});

function initializeButtons() {
  document.querySelectorAll(".grid-button-update").forEach(function(elem) {
    elem.addEventListener("click", function(event) {
      console.log("Update: " + event.target.value);
    })
  });
  document.querySelectorAll(".grid-button-delete").forEach(function(elem) {
    elem.addEventListener("click", function(event) {
      console.log("Delete: " + event.target.value);
    })
  });
}


function clearText() {
  document.getElementById('output').innerHTML = '';
  document.getElementById('grid-output').innerHTML = '';
  console.clear();
}

function getText() {
  fetch('./files/sample.txt')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('output').innerHTML = data;
  })
  .catch((err) => console.log(err))
}

function getUsers() {
  let user = document.getElementById("getUserName").value
  let email = document.getElementById("getUserEmail").value
  let url = 'http://127.0.0.1:8000/persona/show'
  if (user != '' || email != '') {
    url = url.concat("?")
    if (user != '') {
      url = url.concat(`name=${user}&`)
    }
    if (email != '') {
      url = url.concat(`correo=${email}&`)
    }
  }

  fetch(url, {
    method: 'GET'})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    let output = '';
    data.forEach(function(persona) {
      output +=
      `
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
      </div>`
    })
  document.getElementById('grid-output').innerHTML = output;
  })
  .catch((err) => console.log(err))
}
