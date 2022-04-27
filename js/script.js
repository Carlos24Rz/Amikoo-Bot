const timeLoader = 1;

// URL AWS
// http://ec2-34-235-152-206.compute-1.amazonaws.com/
// http://34.235.152.206/docs

const URL = "http://127.0.0.1:8000/pregunta/show?preguntaParent=";

// const URLTEXTO = "http://127.0.0.1:8000/pregunta/Inicio/show";
const URLTEXTO = function (query) {
  const url = `http://127.0.0.1:8000/pregunta/${query}/show`;
  // console.log("PRUEBA URL: ", url);
  return url;
};

const getDataDB = async function (url, query) {
  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data);

  // console.log("getDataBD", data);

  return data;
};

const URLCURRENT = "http://127.0.0.1:8000/pregunta/show?nombre=";

const URLGETCHILDREN = "http://127.0.0.1:8000/pregunta/show2?idChild=";
const URLBYID = "http://127.0.0.1:8000/pregunta/show?id=";

const insertHtmlOptionsDB = async function (
  query = "Inicio",
  backPregunta = false
) {
  let dataOptions;
  let dataText;

  // En caso de que se selecciona una opcion normal
  if (backPregunta == false) {
    dataOptions = await getDataDB(URL, query);
    dataText = await getDataDB(URLCURRENT, query);
  }
  // En caso de que se selecciona la opcion de regresar
  // Se obtienen las opciones de los hijos de la ultima opcion
  // El texto se obtiene de la ultima opcion id
  else {
    // console.log("MY NUMBER QUERY: ", query);
    dataOptions = await getDataDB(URLGETCHILDREN, query);
    dataText = await getDataDB(URLBYID, query);
  }

  // console.log(dataText);
  // console.log("DataText", dataText[0].texto);

  let titulo;
  dataText[0].texto.includes("\n")
    ? (titulo = dataText[0].texto.replaceAll("\n", "<br>"))
    : (titulo = dataText[0].texto);

  htmlOptions = dataOptions.map((option) => `${option.nombre} ${option.emoji}`);
  // console.log("hmltOptions", htmlOptions);

  insertHtmlChatbotOptions(titulo, dataText[0].padre_id, ...htmlOptions);

  // MOSTRAR EL FORMULARIO DE SATISFACCION SOLO CUANDO SEA NODO HOJA
  // if (dataCategoria[0].texto == "mostrarFormulario()") {
  //   console.log("SIUUUUUUUUU");
  //   insertHtmlFormEmail();
  //   return;
  // }

  if (dataOptions.length == 0) {
    showLoader(timeLoader).then(() => {
      removeLoader();
      insertHtmlChatbotReview();
      return;
    });
  }
};

// getDataDB()

//////////////////////////////
// HTML TEMPLATES
//////////////////////////////

const htmlChatbotText = (text) => {
  return `
  <div class="chatbot-msg">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

    <div class="chatbot-msg-content">
      <p class="chatbot-text">
        ${text}
      </p>
    </div>
  </div>
`;
};

const htmlChatbotTextNoface = (text) => {
  return `
  <div class="chatbot-msg chatbot-msg-no-face">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

    <div class="chatbot-msg-content">
      <p class="chatbot-text">
        ${text}
      </p>
    </div>
  </div>
`;
};

const htmlChatbotReview = () => {
  return `
  <div class="chatbot-msg">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

    <div class="container-stars chatbot-msg-content">
      <form class="form-stars" action="#">
        <div class="star-widget">
          <input
            class="input-star"
            type="radio"
            name="rate"
            id="rate-5"
            value="5"
          />
          <label for="rate-5" class="fa-solid fa-star"></label>
          <input
            class="input-star"
            type="radio"
            name="rate"
            id="rate-4"
            value="4"
          />
          <label for="rate-4" class="fa-solid fa-star"></label>
          <input
            class="input-star"
            type="radio"
            name="rate"
            id="rate-3"
            value="3"
          />
          <label for="rate-3" class="fa-solid fa-star"></label>
          <input
            class="input-star"
            type="radio"
            name="rate"
            id="rate-2"
            value="2"
          />
          <label for="rate-2" class="fa-solid fa-star"></label>
          <input
            class="input-star"
            type="radio"
            name="rate"
            id="rate-1"
            value="1"
          />
          <label for="rate-1" class="fa-solid fa-star"></label>
          <header class="title-star">&nbsp;</header>  
        </div>

        <div class="submit-box">
          <button class="btn-submit-form-stars" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
};

const htmlChatbotLoading = () => {
  return `
  <div class="chatbot-msg chatbot-loader">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

    <div class="chatbot-msg-content loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
`;
};

let backPregunta = "";

const htmlChatbotOptions = (text, queryAnterior, ...options) => {
  htmlOptions = options
    .map((option) => `<p class="chatbot-option">${option}</p>`)
    .join("");

  // console.log("Query anterior: ", queryAnterior);

  if (queryAnterior != null && htmlOptions != "") {
    htmlOptions += `<p class="chatbot-option chatbot-option--return">Pregunta anterior ◀</p>`;
  }
  // console.log("SSSSSS ", htmlOptions);

  // console.log(htmlOptions);

  return `
          <div class="chatbot-msg">
            <img class="logo--chat" src="./img/Logo-header.svg" alt="" />
            <div class="chatbot-msg-content">
              <div class="chatbot-options">
                <p class="chatbot-options-text">
                  ${text}
                </p>
                ${htmlOptions}
              </div>
            </div>
          </div>
  `;
};

const htmlUserInput = (text) => {
  return `
  <div class="chatbot-msg chatbot-msg-user">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />
    <div class="chatbot-msg-content">
      <p class="chatbot-text">${text}</p>
    </div>
  </div>`;
};

const htmlFormEmail = () => {
  return `
  <div class="chatbot-msg">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

    <div class="chatbot-msg-content">
      <form class="form-to-mail" action="#">
        <label for="name">Nombre</label>
        <input id="input-name" type="text" placeholder="Angel Gonzalez" />

        <label for="email">Correo electrónico</label>
        <input
          id="input-email"
          type="text"
          placeholder="angelGlez@hotmail.com"
        />

        <label for="msg">Pregunta/mensaje</label>
        <textarea
          id="input-msg"
          placeholder="(Menos de 100 palabras)"
        ></textarea>

        <button class="btn-submit-form-email" type="submit">
          Enviar
        </button>
      </form>
    </div>
  </div>`;
};

//////////////////////////////
// HTML INSERT TEMPLATES
//////////////////////////////
const chatbotBox = document.querySelector(".chatbot-box");
const chatbotChat = document.querySelector(".chatbot-chat");

const insertHtmlChatbotTex = function (text) {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotText(text));
  updateScrollBar();
};

const insertHtmlChatbotTextNoFace = function (text) {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotTextNoface(text));
  updateScrollBar();
};

const insertHtmlChatbotReview = function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotReview());
  updateScrollBar();

  formStars = [...document.querySelectorAll(".form-stars")].at(-1);
  activeFormStars();
};

const insertHtmlChatbotLoading = function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotLoading());
  updateScrollBar();
};

const insertHtmlChatbotOptions = function (text, queryAnterior, ...options) {
  // Cuando ya hay mas de un chatbotOptions, bloqueamos el ultimo chatbotOptions
  if (optionsBox !== undefined) {
    optionsBox.classList.add("block-chatbot-options");
  }

  // Formar normal
  chatbotChat.insertAdjacentHTML(
    "beforeend",
    htmlChatbotOptions(text, queryAnterior, ...options)
  );
  optionsBox = [...document.querySelectorAll(".chatbot-options")].at(-1);
  selectOptionHandler(queryAnterior);
  updateScrollBar();
};

const insertHtmlUserInput = function (text) {
  chatbotChat.insertAdjacentHTML("beforeend", htmlUserInput(text));
  updateScrollBar();
};

const insertHtmlFormEmail = function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlFormEmail());
  updateScrollBar();

  formToMail = [...document.querySelectorAll(".form-to-mail")].at(-1);
  activeFormData();
};

///////////////////////
///////////////////////
///////////////////////

// Function that put down the scroll bar
const updateScrollBar = function () {
  chatbotChat.scrollTo(0, chatbotChat.scrollHeight);
};

// Function to hide and show the chatbot box
const chatbotFace = document.querySelector(".chatbot-face");
const chatbotExit = document.querySelector(".chatbot-close-button");
let flagChatbotOpen = false;

const handleShowChatbot = function () {
  // Para abrir el chabtotChat al hacer click en la cara
  chatbotFace.addEventListener("click", function () {
    chatbotBox.classList.toggle("hidden");
    chatbotFace.classList.toggle("hidden");

    // Solo entra a este if cuando se abre por primera vez el chatbot
    if (!flagChatbotOpen) {
      showLoader(timeLoader).then(() => {
        removeLoader();
        insertHtmlChatbotTex("Hola, este es un mensaje de bienvenida");
        flagChatbotOpen = true;

        // PARA MOSTRAR LAS OPCIONES (puede que esto no sirva de nada)
        if (optionsBox !== undefined) {
          optionsBox.classList.add("block-chatbot-options");
        }

        // Insertamos las primeras opciones
        insertHtmlChatbotOptions(someText, 1, 2, 3, 4);
      });
    }
  });

  // Para cerrar el chatbotChat al hacer click en la x
  chatbotExit.addEventListener("click", function () {
    chatbotBox.classList.toggle("hidden");
    chatbotFace.classList.toggle("hidden");
  });

  updateScrollBar();
};
handleShowChatbot();

//////////////////////////////
// Menu to add texts box in the chatbot
//////////////////////////////

const btnChatbotText = document.querySelector(".btn-chatbot-text-face");
const btnChatbotTextNoface = document.querySelector(
  ".btn-chatbot-text-no-face"
);
const btnChatbotReview = document.querySelector(".btn-chatbot-review");
const btnChatbotLoading = document.querySelector(".btn-chatbot-loading");
const btnChatbotOptions = document.querySelector(".btn-chatbot-options");
const btnChatbotUser = document.querySelector(".btn-chatbot-user");
const btnChatbotForm = document.querySelector(".btn-form");

const someText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum libero, sit eum voluptates natus voluptatem dolorum. Beatae sit.";

btnChatbotText.addEventListener("click", function () {
  insertHtmlChatbotTex(someText);
});

btnChatbotTextNoface.addEventListener("click", function () {
  insertHtmlChatbotTextNoFace(someText);
});

btnChatbotLoading.addEventListener("click", function () {
  insertHtmlChatbotLoading();
});

btnChatbotOptions.addEventListener("click", function () {
  // Insertamos las nuevas opciones
  showLoader(timeLoader).then(() => {
    removeLoader();
    // insertHtmlChatbotOptions(someText, 1, 2, 3, 4);
    insertHtmlOptionsDB();
  });
});

btnChatbotUser.addEventListener("click", function () {
  insertHtmlUserInput(someText);
});

btnChatbotReview.addEventListener("click", function () {
  insertHtmlChatbotReview();
});

btnChatbotForm.addEventListener("click", function () {
  insertHtmlFormEmail();
});

///////////////////////
///////////////////////
///////////////////////

// SELECTING AN OPTION
// Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

let optionsBox = [...document.querySelectorAll(".chatbot-options")].at(-1);
const selectOptionHandler = function (queryAnterior) {
  optionsBox.addEventListener("click", function (e) {
    if (e.target.classList.contains("chatbot-option")) {
      insertHtmlUserInput(e.target.textContent);

      strNoEmoji = e.target.textContent.split(" ").slice(0, -1).join(" ");
      // console.log("Seleccionando opcion: ", strNoEmoji);

      if (strNoEmoji == "Pregunta anterior") {
        // console.log("ENTER EN PREGUNTA ANTERIOR");
        // console.log("QUERY_ANTERIOR: ", queryAnterior);
        insertHtmlOptionsDB(queryAnterior, true);
        return;
      }

      // OJO
      // Aqui el e.target.textContent es un nombre que se ve en el html, pero necesitamos la categoriaID de ese nombre para mostrarlo
      insertHtmlOptionsDB(strNoEmoji);
    }
  });
};

const URLPOSTCALIFICACION = "http://127.0.0.1:8000/calificacion/create";

const postCalificacionDB = async function (cali) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      calificacion: cali,
    }),
  };

  return fetch(URLPOSTCALIFICACION, options);
};

// Formulario stars
let formStars = [...document.querySelectorAll(".form-stars")].at(-1);
const activeFormStars = function () {
  formStars.addEventListener("submit", function (e) {
    e.preventDefault();

    const answer = document.querySelector('input[name="rate"]:checked')?.value;

    // En caso de que no se haya selecionado ninguna estrella
    if (!answer) {
      return;
    }

    formStars.style.pointerEvents = "none"; // Se bloquea el formulario para no aceptar más inputs
    showLoader(timeLoader).then(() => {
      removeLoader();
      insertHtmlChatbotTex("Hemos recibido tus datos, muchas gracias.");
      postCalificacionDB(answer)
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
  });
};

const URLPOSTPERSONA = "http://127.0.0.1:8000/persona/create";

const postPersonaDB = async function (persona) {
  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: persona.nombre,
      correo: persona.correo,
      descripcion: persona.descripcion,
    }),
  };

  return fetch(URLPOSTPERSONA, options);
};

// Formulario datos
let formToMail = [...document.querySelectorAll(".form-to-mail")].at(-1);
const activeFormData = function () {
  // Formulario de los datos
  formToMail.addEventListener("submit", function (e) {
    e.preventDefault();

    const errorName = "Error al ingresar el nombre. Intenta de nuevo";
    const errorEmail = "Error al ingresar mail. Intenta de nuevo";
    const errorMsg = "Error al ingresa el mensaje. Intenta de nuevo";

    const name = e.target[0].value;
    const email = e.target[1].value;
    const msg = e.target[2].value;

    let isError = false;

    if (!checkName(name)) {
      placeholderName = document.querySelector("#input-name");
      placeholderName.placeholder = errorName;
      placeholderName.classList.add("error-input-form");
      isError = true;
      e.target[0].value = "";
    }

    if (!checkEmail(email)) {
      placeholderEmail = document.querySelector("#input-email");
      placeholderEmail.placeholder = errorEmail;
      placeholderEmail.classList.add("error-input-form");
      isError = true;
      e.target[1].value = "";
    }

    if (!checkMessage(msg)) {
      placeholderMsg = document.querySelector("#input-msg");
      placeholderMsg.placeholder = errorMsg;
      placeholderMsg.classList.add("error-input-form");
      isError = true;
      e.target[2].value = "";
    }

    if (!isError) {
      // En caso de que no haya errores
      formToMail.style.pointerEvents = "none"; // Se bloquea el formulario para no aceptar más información
      console.log(name, email, msg);

      const newPersona = {
        nombre: name,
        correo: email,
        descripcion: msg,
      };

      showLoader(timeLoader).then(() => {
        removeLoader();
        insertHtmlChatbotTex("Hemos recibido tus datos, muchas gracias.");
        // TODO REVISAR QUE DEVUELVA ALGO, (EL NOMBRE)
        postPersonaDB(newPersona)
          .then((response) => response.json())
          .then((data) => console.log(data));
      });
    }
  });
};

// const getDataDB = async function (url, query) {
//   console.log("Query is:", query);

//   const data = await fetch(`${url}${query}`)
//     .then((response) => response.json())
//     .then((data) => data);

//   // console.log("before data");
//   console.log("primera funcion", data);

//   // console.log("after data");

//   return data;
// };

///////////////////////
///////////////////////
///////////////////////

// SEARCH BAR
const searchBarEl = document.querySelector(".search-bar");

searchBarEl.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.key === "Enter" || e.keyCode === 13) {
    insertHtmlUserInput(searchBarEl.value);
    searchBarEl.value = "";
  }
});

// MOSTRAR LOADER
const showLoader = function (sec) {
  return new Promise(function (resolve) {
    chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotLoading());
    updateScrollBar();

    setTimeout(resolve, 1000 * sec);
  });
};

const removeLoader = function () {
  lastLoaderElement = [...document.querySelectorAll(".chatbot-loader")].at(-1);
  lastLoaderElement.remove();
  updateScrollBar();
};

// Formulario
// Functions to check each input

const checkName = (string) => {
  const re = new RegExp(/^[a-zA-Z ]+$/);

  return re.test(string);
};

const checkEmail = (string) => {
  const re = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  // console.log(re.test(string));
  return re.test(string);
};

const checkMessage = (string) => {
  const maxWords = 100;
  const numWords = string.trim().split(" ").length;

  if (
    numWords < maxWords &&
    numWords >= 1 &&
    string.trim().split(" ")[0] !== ""
  ) {
    return true;
  } else {
    return false;
  }
};
