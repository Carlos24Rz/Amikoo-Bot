chatbotChat = document.querySelector(".chatbot-chat");
btnAdd = document.querySelector(".button-bot");

const html1 = `<div class="chatbot-msg">
<img class="logo--chat" src="./img/Logo-header.svg" alt="" />
<p class="chatbot-text">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
  libero, sit eum voluptates natus voluptatem dolorum. Beatae sit.
</p>
</div>`;

const html2 = `<div class="chatbot-msg">
<p class="chatbot-text">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
  libero, sit eum voluptates natus voluptatem dolorum. Beatae sit.
</p>
<img class="logo--chat" src="./img/Logo-header.svg" alt="" />
</div>`;

let counter = 1;

btnAdd.addEventListener("click", function () {
  if (counter % 2 == 0) {
    chatbotChat.insertAdjacentHTML("beforeend", html2);
    counter++;
  } else {
    chatbotChat.insertAdjacentHTML("beforeend", html1);
    counter++;
  }
});
