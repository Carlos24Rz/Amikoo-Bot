const chatbotBox = document.querySelector(".chatbot-box");
const chatbotChat = document.querySelector(".chatbot-chat");
const chatbotFace = document.querySelector(".chatbot-face");

const chatbotExit = document.querySelector(".chatbot-close-button");

// Function that put down the scroll bar
const updateScrollBar = function () {
  chatbotChat.scrollTo(0, chatbotChat.scrollHeight);
};

// Function to hide and show the chatbot box
const handleShowChatbot = function () {
  chatbotFace.addEventListener("click", function () {
    chatbotBox.classList.toggle("hidden");
    chatbotFace.classList.toggle("hidden");
  });

  chatbotExit.addEventListener("click", function () {
    chatbotBox.classList.toggle("hidden");
    chatbotFace.classList.toggle("hidden");
  });

  updateScrollBar();
};
handleShowChatbot();

// Menu to add texts box in the chatbot
const btnChatbotText = document.querySelector(".btn-chatbot-text-face");
const btnChatbotTextNoface = document.querySelector(
  ".btn-chatbot-text-no-face"
);
const btnChatbotReview = document.querySelector(".btn-chatbot-review");
const btnChatbotLoading = document.querySelector(".btn-chatbot-loading");
const btnChatbotOptions = document.querySelector(".btn-chatbot-options");
const btnChatbotUser = document.querySelector(".btn-chatbot-user");

// SELECTING AN OPTION
// Event delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
let optionsBox = [...document.querySelectorAll(".chatbot-options")].at(-1);

const selectOptionHandler = function () {
  optionsBox.addEventListener("click", function (e) {
    // const optionSelected = optionsBox.closest(".chatbot-option");
    if (e.target.classList.contains("chatbot-option")) {
      chatbotChat.insertAdjacentHTML(
        "beforeend",
        htmlUserInput(e.target.textContent)
      );

      updateScrollBar();
    }
  });
};

selectOptionHandler();

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
      <div class="star-widget">
        <input
          class="input-star"
          type="radio"
          name="rate"
          id="rate-5"
        />
        <label for="rate-5" class="fa-solid fa-star"></label>
        <input
          class="input-star"
          type="radio"
          name="rate"
          id="rate-4"
        />
        <label for="rate-4" class="fa-solid fa-star"></label>
        <input
          class="input-star"
          type="radio"
          name="rate"
          id="rate-3"
        />
        <label for="rate-3" class="fa-solid fa-star"></label>
        <input
          class="input-star"
          type="radio"
          name="rate"
          id="rate-2"
        />
        <label for="rate-2" class="fa-solid fa-star"></label>
        <input
          class="input-star"
          type="radio"
          name="rate"
          id="rate-1"
        />
        <label for="rate-1" class="fa-solid fa-star"></label>
        <form class="form-stars" action="#">
          <header class="title-star">&nbsp;</header>
          <div class="submit-box">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `;
};

const htmlChatbotLoading = () => {
  return `
  <div class="chatbot-msg">
    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

    <div class="chatbot-msg-content loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
`;
};

const htmlChatbotOptions = (text, ...options) => {
  htmlOptions = options
    .map((option) => `<p class="chatbot-option">${option}</p>`)
    .join("");

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

const someText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum libero, sit eum voluptates natus voluptatem dolorum. Beatae sit.";

btnChatbotText.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotText(someText));

  updateScrollBar();
});

btnChatbotTextNoface.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotTextNoface(someText));
  updateScrollBar();
});

btnChatbotReview.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotReview());
  updateScrollBar();
});

btnChatbotLoading.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlChatbotLoading());
  updateScrollBar();
});

btnChatbotOptions.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML(
    "beforeend",
    htmlChatbotOptions(someText, 1, 2, 3, 4)
  );
  optionsBox.classList.add("block-chatbot-options");
  optionsBox = [...document.querySelectorAll(".chatbot-options")].at(-1);
  selectOptionHandler();
  updateScrollBar();
});

btnChatbotUser.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlUserInput(someText));
  updateScrollBar();
});

// FORM
// const btnForm = document.querySelector(".btn-form");

// SEARCH BAR
const searchBarEl = document.querySelector(".search-bar");

searchBarEl.addEventListener("keyup", function (e) {
  e.preventDefault();
  if (e.key === "Enter" || e.keyCode === 13) {
    const html3 = `<div class="chatbot-msg chatbot-msg-user">
                    <img class="logo--chat" src="./img/Logo-header.svg" alt="" />
                    <div class="chatbot-msg-content">
                      <p class="chatbot-text">${searchBarEl.value}</p>
                    </div>
                  </div>`;
    chatbotChat.insertAdjacentHTML("beforeend", html3);
    searchBarEl.value = "";
    // chatbotChat.scrollTo(0, chatbotChat.scrollHeight);
    updateScrollBar();
  }
});

const htmlFormEmail = () => {
  return `
  <div class="chatbot-msg">
  <img class="logo--chat" src="./img/Logo-header.svg" alt="" />

  <div class="chatbot-msg-content">
    <form class="form-to-mail" action="#">
      <label for="name">Nombre</label>
      <input id="name" type="text" placeholder="Angel Gonzalez" />

      <label for="email">Correo electrónico</label>
      <input
        id="email"
        type="text"
        placeholder="angelGlez@hotmail.com"
      />

      <label for="msg">Pregunta/mensaje</label>
      <textarea
        class="input-msg"
        id="msg"
        placeholder="(Menos de 100 palabras)"
      ></textarea>
      <!-- <input class="input-msg" id="msg" type="text" /> -->

      <button class="btn-submit-form-email" type="submit">
        Enviar
      </button>
    </form>
  </div>
</div>`;
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

let formToMail = [...document.querySelectorAll(".form-to-mail")].at(-1);

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
  }

  if (!checkEmail(email)) {
    placeholderEmail = document.querySelector("#input-email");
    placeholderEmail.placeholder = errorEmail;
    placeholderEmail.classList.add("error-input-form");
    isError = true;
  }

  if (!checkMessage(msg)) {
    placeholderMsg = document.querySelector("#input-msg");
    placeholderMsg.placeholder = errorMsg;
    placeholderMsg.classList.add("error-input-form");
    isError = true;
  }

  if (!isError) {
    // En caso de que no haya errores
    console.log("Todo CHIDOOO");
    formToMail.style.pointerEvents = "none";
  }
});
