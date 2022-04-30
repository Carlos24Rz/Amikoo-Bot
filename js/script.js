//////////////////////////////
// HTML TEMPLATES
//////////////////////////////

/*
 * Obtener cuadro de texto con la cara del chatbot
 * @param  {string} text    Texto que va en el cuadro
 * @return {string} ---     Html preparado con el text
 */
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

/*
 * Obtener cuadro de texto sin la cara del chatbot
 * @param  {string} text    Texto que va en el cuadro
 * @return {string} ---     Html preparado con el text
 */
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

/*
 * Obtener cuadro con las opciones a mostrar
 * @param  {string} text      Texto que va arriba de las opciones
 * @param  {bool}   is_final  Indica si es una pregunta final que no tiene mas opciones debajo
 * @param  {string} prevQuery Indica la opcion anterior que fue seleccionada
 * @param  {string} optons    Opciones a mostrar
 * @return {string} ---       Html con el texto de arriba y las opciones
 */
const htmlChatbotOptions = (text, is_final, prevQuery, ...options) => {
  // Se unen las opciones y se les da el formato
  let htmlOptions = options
    .map((option) => `<p class="chatbot-option">${option}</p>`)
    .join("");

  // Se verifica cuando agregar la opcion de regresar a la pregunta anterior
  if (prevQuery != "Inicio" && htmlOptions != "" && is_final == false) {
    htmlOptions += `<p class="chatbot-option chatbot-option--return">Pregunta anterior ◀</p>`;
  }

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

/*
 * Obtener cuadro de respuesta del usuario
 * @param  {string} text      Texto ha seleccionado el usuario
 * @return {string} ---       Html con su opcion seleccionada
 */
const htmlUserInput = (text) => {
  return `
  <div class="chatbot-msg chatbot-msg-user">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />
    <div class="chatbot-msg-content">
      <p class="chatbot-text">${text}</p>
    </div>
  </div>`;
};

/*
 * Obtener formulario de calificacion
 * @return {string} ---     Html preparado con el formulario de calificacion
 */
const htmlChatbotFormReview = () => {
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

/*
 * Obtener formulario de contacto
 * @return {string} ---     Html preparado con el formulario de contacto
 */
const htmlChatbotFormContact = () => {
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

/*
 * Obtener animacion de cargando
 * @return {string} ---     Html preparado con la animacion
 */
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

const TIMELOADER = 1;
const MSGEROR = "Ha ocurrido un error";

const activeURL = "http://127.0.0.1:8000";
// const activeURL = "http://34.230.152.92:8080";

const URL = `${activeURL}/pregunta/show?parent=`;

/*
 * Obtener datos de la base de datos
 * @param  {string} url   Url para hacerle fetch
 * @param  {string} query Valor para concaternarlo a la url y completarla
 * @return {string} data  Informacion obtenida del fetch a la url completa
 */
const getDataDB = async function (url, query) {
  const data = await fetch(`${url}${query}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch(() => {
      throw MSGEROR;
    });

  return data;
};

const URLCURRENT = `${activeURL}/pregunta/show?nombre=`;

const URLGETCHILDREN = `${activeURL}/pregunta/show?child=`;

const URLGETTEXTCHILD = `${activeURL}/pregunta/text?child=`;

/*
 * Preparar los datos para insertar las opciones en el html
 * @param  {string} query       Valor que indica que opciones y que texto se debe mostrar
 * @param  {bool} prevOption  Indica si se selecciona regresar a la pregunta anterior o no
 */
const prepareHtmlOptionsDB = async function (
  query = "Inicio",
  prevOption = false
) {
  // Esta serie de if's es para cuando se llega a una respuesta final y se muestran las ultimas opciones
  if (query == "Si") {
    console.log("ENTEEEER");
    optionsBox.classList.add("block-chatbot-options");
    insertHtmlChatbotTextNoFace("Has seleccionado que sí");
    insertHtmlChatbotTex("Nos ayudarías mucho calificando nuestro servicio: ");
    insertHtmlChatbotReview();
    return;
  }

  if (query == "Hacer otra pregunta") {
    console.log("Reiniciar chatbot");
    prepareHtmlOptionsDB();
    return;
  }

  if (query == "Solicitar información adicional") {
    console.log("Reiniciar chatbot");
    optionsBox.classList.add("block-chatbot-options");
    insertHtmlFormEmail();
    return;
  }

  let dataOptions;
  let dataQnParent;
  // En caso de que se selecciona una opcion normal
  if (prevOption == false) {
    dataQnParent = await getDataDB(URLCURRENT, query).catch((err) => err);
    dataOptions = await showLoader(TIMELOADER).then(() =>
      getDataDB(URL, query).catch((err) => err)
    );
  }
  // En caso de que se selecciona la opcion de regresar a la opcion anterior
  else {
    dataQnParent = await getDataDB(URLGETTEXTCHILD, query).catch((err) => err);
    dataOptions = await showLoader(TIMELOADER).then(() =>
      getDataDB(URLGETCHILDREN, query).catch((err) => err)
    );
  }

  // Atrapando los errores que pudieron generarse al hacer el fetch
  if (dataQnParent == MSGEROR || dataOptions == MSGEROR) {
    removeLoader();
    insertHtmlChatbotTex("Ha ocurrido un error");
    return;
  }

  // Del texto obtenido para mostrar en las opciones, se cambian los saltos de linea por <br>
  let textOption;
  dataQnParent[0].texto.includes("\n")
    ? (textOption = dataQnParent[0].texto.replaceAll("\n", "<br>"))
    : (textOption = dataQnParent[0].texto);

  // Se unen los nombre de las opciones con su emoji
  const htmlOptions = dataOptions.map(
    (option) => `${option.nombre} ${option.emoji}`
  );

  removeLoader();

  // En caso de que se haya seleccionala opcion de "Contacto" se muestra el formulario
  if (dataQnParent[0].texto == "mostrarFormulario()") {
    console.log("SIUUUUUUUUU");
    insertHtmlFormEmail();
    return;
  }

  // Finalmente se insertan las opciones obtenidas de la base de datos
  insertHtmlChatbotOptions(
    textOption,
    dataQnParent[0].is_final,
    dataQnParent[0].nombre,
    ...htmlOptions
  );

  // Cuando se llegar a una pregunta final, se muestran las siguientes opciones a manera de cierre
  if (dataOptions.length == 0) {
    showLoader(TIMELOADER).then(() => {
      removeLoader();
      insertHtmlChatbotOptions(
        "¿Pudimos ayudarte a encontrar lo que buscabas?",
        true,
        "",
        ...[
          "Si 🎈",
          "Hacer otra pregunta 🎈",
          "Solicitar información adicional 🎈",
        ]
      );
      return;
    });
  }
  return;
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
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotFormReview());
  updateScrollBar();

  formStars = [...document.querySelectorAll(".form-stars")].at(-1);
  activeFormStars();
};

const insertHtmlChatbotLoading = function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotLoading());
  updateScrollBar();
};

const insertHtmlChatbotOptions = function (
  text,
  isFinal,
  prevQuery,
  ...options
) {
  console.log("Nodo hoja: ", isFinal);

  // Cuando ya hay mas de un chatbotOptions, bloqueamos el ultimo chatbotOptions
  if (optionsBox !== undefined) {
    optionsBox.classList.add("block-chatbot-options");
  }

  // Formar normal
  chatbotChat.insertAdjacentHTML(
    "beforeend",
    htmlChatbotOptions(text, isFinal, prevQuery, ...options)
  );
  optionsBox = [...document.querySelectorAll(".chatbot-options")].at(-1);
  selectOptionHandler(prevQuery);
  updateScrollBar();
};

const insertHtmlUserInput = function (text) {
  chatbotChat.insertAdjacentHTML("beforeend", htmlUserInput(text));
  updateScrollBar();
};

const insertHtmlFormEmail = function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotFormContact());
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
      insertHtmlChatbotTex("Hola, este es un mensaje de bienvenida");
      flagChatbotOpen = true;
      prepareHtmlOptionsDB();

      // showLoader(TIMELOADER).then(() => {
      //   removeLoader();

      //   insertHtmlChatbotTex("Hola, este es un mensaje de bienvenida");
      //   flagChatbotOpen = true;

      //   // PARA MOSTRAR LAS OPCIONES (puede que esto no sirva de nada)
      //   if (optionsBox !== undefined) {
      //     optionsBox.classList.add("block-chatbot-options");
      //   }

      //   // Insertamos las primeras opciones
      //   insertHtmlChatbotOptions(someText, 1, 2, 3, 4);
      //   // prepareHtmlOptionsDB()
      // });
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

  showLoader(TIMELOADER).then(() => {
    removeLoader();

    // insertHtmlChatbotOptions(someText, 1, 2, 3, 4);
    prepareHtmlOptionsDB();
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
const selectOptionHandler = function (prevQuery) {
  optionsBox.addEventListener("click", function (e) {
    if (e.target.classList.contains("chatbot-option")) {
      insertHtmlUserInput(e.target.textContent);

      strNoEmoji = e.target.textContent.split(" ").slice(0, -1).join(" ");
      // console.log("Seleccionando opcion: ", strNoEmoji);

      if (strNoEmoji == "Pregunta anterior") {
        // console.log("ENTER EN PREGUNTA ANTERIOR");
        // console.log("QUERY_ANTERIOR: ", prevQuery);
        // console.log("QUERY ANTERIOR: ", prevQuery);
        prepareHtmlOptionsDB(prevQuery, true);
        return;
      }

      // OJO
      // Aqui el e.target.textContent es un nombre que se ve en el html, pero necesitamos la categoriaID de ese nombre para mostrarlo

      prepareHtmlOptionsDB(strNoEmoji);
    }
  });
};

const URLPOSTCALIFICACION = `${activeURL}/calificacion/create`;

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

    showLoader(TIMELOADER).then(() => {
      postCalificacionDB(answer)
        .then((response) => response.json())
        .then((data) => {
          insertHtmlChatbotTex(data);
          removeLoader();
        })
        .catch((err) => {
          console.log("Ocurrio un error");
          insertHtmlChatbotTex("Ocurrio un error");
          removeLoader();
        });
    });

    // showLoader(TIMELOADER).then(() => {
    //   removeLoader();

    //   insertHtmlChatbotTex("Hemos recibido tus datos, muchas gracias.");
    //   postCalificacionDB(answer)
    //     .then((response) => response.json())
    //     .then((data) => console.log(data));
    // });
  });
};

const URLPOSTPERSONA = `${activeURL}/persona/create`;

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

      showLoader(TIMELOADER).then(() => {
        postPersonaDB(newPersona)
          .then((response) => response.json())
          .then((data) => {
            insertHtmlChatbotTex(
              `Muchas gracias, ${data.nombre}. Hemos recibido tus datos`
            );
            removeLoader();
          })
          .catch((err) => {
            console.log("Ocurrio un error");
            insertHtmlChatbotTex("Ocurrio un error");
            removeLoader();
          });
      });
    }
  });
};

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
