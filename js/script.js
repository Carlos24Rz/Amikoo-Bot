const chatbotBox = document.querySelector(".chatbot-box");
const chatbotChat = document.querySelector(".chatbot-chat");
const chatbotFace = document.querySelector(".chatbot-face");

const chatbotExit = document.querySelector(".chatbot-close-button");

// Function that put down the scroll bar
const updateScrollBar = function () {
  // chatbotChat.scrollIntoView({
  //   behavior: "smooth",
  //   block: "end",
  //   inline: "end",
  // });

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
  // chatbotChat.scrollTo(0, chatbotChat.scrollHeight);
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
        <input type="radio" name="rate" id="rate-5" />
        <label for="rate-5" class="fa-solid fa-star"></label>
        <input type="radio" name="rate" id="rate-4" />
        <label for="rate-4" class="fa-solid fa-star"></label>
        <input type="radio" name="rate" id="rate-3" />
        <label for="rate-3" class="fa-solid fa-star"></label>
        <input type="radio" name="rate" id="rate-2" />
        <label for="rate-2" class="fa-solid fa-star"></label>
        <input type="radio" name="rate" id="rate-1" />
        <label for="rate-1" class="fa-solid fa-star"></label>
        <form action="#">
          <header class="title-star">&nbsp;</header>
          <div class="submit-box">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;
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

  console.log(htmlOptions);

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
  updateScrollBar();
});

btnChatbotUser.addEventListener("click", function () {
  chatbotChat.insertAdjacentHTML("beforeend", htmlUserInput(someText));
  updateScrollBar();
});

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
