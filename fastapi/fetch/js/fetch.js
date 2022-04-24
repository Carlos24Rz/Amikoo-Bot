
document.getElementById('getPreguntas')
.addEventListener('click',getPreguntas);

document.getElementById('getFormulario')
.addEventListener('click',getFormulario);





function getFormulario() {
  url = "http://127.0.0.1:8000/persona/create"

  // NOTE: Use form instead of each variable?
  // const formPersona = new FormData();
  //   formPersona.append("nombre", document.getElementById('nombreFormulario').value);
  //   formPersona.append("correo", document.getElementById('correoFormulario').value);
  //   formPersona.append("descripcion", document.getElementById('descripcionFormulario').value);

  formNomb = document.getElementById('nombreFormulario').value;
  formCorr = document.getElementById('correoFormulario').value;
  formDesc = document.getElementById('descripcionFormulario').value;

  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "nombre": formNomb,
      "correo": formCorr,
      "descripcion": formDesc
    })
  };

  // for (var key of formPersona.entries()) {
  //     console.log(key[0] + ': ' + key[1]);
  // }
  fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    datos = data
    let output = `<h2>Persona</h2>
    <div>${data}</div>`

    // data.forEach(function(persona) {
    //   output +=
    //   `<div>
    //     <div>${persona.nombre}</div>
    //   </div>`
    // })
  document.getElementById('output').innerHTML = output;
  })
  .catch((err) => console.log(err))

}

function getPreguntas() {
  let categoria = document.getElementById("categoria").value
  if (categoria == '') {
    url = 'http://127.0.0.1:8000/pregunta/show/'
  }
  else {
    url = `http://127.0.0.1:8000/pregunta/show?categoria=${categoria}`
  }
  fetch(url, {
    method: 'GET'})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    console.log(data.text)
    console.log(data.response)
    let output = '<h2>Posts</h2>';
    data.forEach(function(pregunta) {
      output +=
      `<div>
        <div>${pregunta.categoria_id} ${pregunta.nombre} ${pregunta.emoji}</div>
      </div>`
    })
  document.getElementById('output').innerHTML = output;
  })
  .catch((err) => console.log(err))
}


// function getText() {
//   fetch('sample.txt')
//   .then(function(response) {
//     return response.text();
//   })
//   .then(function(data) {
//     document.getElementById('output').innerHTML = data;
//   })
//   .catch((err) => console.log(err))
// }
//
// function getUsers() {
//   fetch('users.json')
//   .then(function(response) {
//     return response.json()
//   })
//   .then(function(data) {
//     let output = '<h2>Users</h2>';
//     console.log(output)
//     data.forEach(function(user) {
//       output += `
//       <ul>
//       <li>ID: ${user.id}</li>
//       <li>Name: ${user.name}</li>
//       <li>Email: ${user.email}</li>
//       </ul>
//       `;
//     });
//     document.getElementById('output').innerHTML = output;
//   })
// }
//
//

function clearText() {
  document.getElementById('output').innerHTML = '';
  console.clear();
}

document.getElementById('clearText')
.addEventListener('click',clearText);

document.getElementById('getText')
.addEventListener('click',getText);

document.getElementById('getUsers')
.addEventListener('click',getUsers);

document.getElementById('getPosts')
.addEventListener('click',getPosts);



function getText() {
  fetch('./files/sample.txt')
  .then((response) => response.text())
  .then((data) => {
    document.getElementById('output').innerHTML = data;
  })
  .catch((err) => console.log(err))
}

function getUsers() {
  fetch('./files/users.json')
  .then((response) => response.json())
  .then((data) => {
    let output = '<h2>Users</h2>';
    data.forEach(function(user) {
      output += `
        <ul>
          <li>ID: ${user.id}</li>
          <li>Name: ${user.name}</li>
          <li>Email: ${user.email}</li>
        </ul>
      `;
    });
    document.getElementById('output').innerHTML = output;
  })
}

function getPosts() {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((data) => {
    let output = '<h2>Posts</h2>';
    data.forEach(function(post) {
      output += `
      <div class="card text-white bg-info mb-3">
      <h3 class="card-header">${post.title}</h3>
      <div class="card text-white bg-dark mb-3">
        <h3 class="card-body">${post.body}</h3>
      </div>
      </div>
      `;
    });
    document.getElementById('output').innerHTML = output;
  })
  .catch((err) => console.log(err))
}
