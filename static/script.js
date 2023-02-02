// Variables Channels
const channelsContainer = document.querySelector(".channels");
const inputChannel = document.querySelector(".input-channel");
const btnAddChannel = document.querySelector("#btn-add-channel");
const channelList = document.querySelector(".channel-list");

//Variables users & password
const inputUsername = document.querySelector(".input-username");
const inputPassword = document.querySelector(".input-password");
const btnSignIn = document.querySelector("#btn-sign-in");
const btnSignOut = document.querySelector("#btn-sign-out");
const btnSignUp = document.querySelector("#btn-sign-up");

//Variables messages
const messagesContainer = document.querySelector(".messages");
const inputMessage = document.querySelector(".input-message");
const btnSendMessage = document.querySelector("#btn-send-message");

// LEFT COLUMN
//Eventlistener btnSignIn
btnSignIn.addEventListener("click", async () => {
  const user = {
    username: inputUsername.value,
    password: inputPassword.value,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // LOGIN OK?
  const response = await fetch("/login", options);
  if (response.status === 200) {
    const userToken = await response.json(); // spara userToken.token
    localStorage.setItem(JWT_KEY, userToken.token);
    isLoggedIn = true;
  } else {
    console.log("login failed, status:" + response.status);
  }

  updateLoginStatus();
});

//Eventlistener btnSignOut
//Eventlistener btnSignUp

// EVENTLISTENER btnAddChannel
btnAddChannel.addEventListener("click", async () => {
  const channelFromUser = inputChannel.value;
  const newChannel = {
    isLocked: false,
    name: channelFromUser,
  };
  const element = await fetchChannel(newChannel);
  channelsContainer.appendChild(element);

  //data.push(newChannel)
  //saveToLocalStorage(data)
  //spara till backend
});

// FUNCTION CREATE NEW CHANNEL
async function fetchChannel(newChannel) {
  console.log('fetchChannel newChannel=', newChannel)
  const response = await fetch("/api/channels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newChannel),
  });
  // Spara eventuellt datan till localStorage
  let channelElement = createChannelElement(newChannel);
  return channelElement;
}

// EVENTLISTENER Keyup + disabled btnAddChannel
inputChannel.addEventListener("keyup", (event) => {
  let userText = inputChannel.value;
  if (userText.length > 0) {
    btnAddChannel.disabled = false;
  } else {
    btnAddChannel.disabled = true;
  }
});

function createChannelElement(channel) {
  let elemDiv = document.createElement("div");
  elemDiv.innerText = channel.name;
  console.log('createChannelElement channel= ', channel)
  elemDiv.className = "channel";
  if (channel.isLocked) {
    elemDiv.className = "channel isLocked";
  }
  return elemDiv;
}

// FUNCTION loadChannels
async function loadChannels(channelsContainer) {
  const response = await fetch("/api/channels");
  const data = await response.json();
  data.forEach((channel) => {
    let elemDiv = createChannelElement(channel);
    channelsContainer.appendChild(elemDiv);
  });
  console.log("channel: ", data);
}

loadChannels(channelsContainer);

function updateLoginStatus() {
  btnSignIn.disabled = isLoggedIn;
  btnSignUp.disabled = isLoggedIn;
}

// RIGHT COLUMN
// EVENTLISTENER btnSendMessage
btnSendMessage.addEventListener("click", async () => {
  const userInputMessage = inputMessage.value;
  const newMessage = {
    isLocked: false,
    name: userInputMessage,
  };
  const element = await fetchMessage(newMessage);
  messagesContainer.appendChild(element);
});

// EVENTLISTENER Keyup + disabled btnSendMessage
inputMessage.addEventListener("keyup", (event) => {
  let userText = inputMessage.value;
  if (userText.length > 0) {
    btnSendMessage.disabled = false;
  } else {
    btnSendMessage.disabled = true;
  }
});

// EVENTLISTENER InputMessage
inputMessage.addEventListener("click", (event) => {});

// FUNCTION CREATE NEW MESSAGE
async function fetchMessage(newMessage) {
  const response = await fetch("/api/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMessage),
  });
  let messageElement = createMessageElement(newMessage);
  return messageElement;
}


// FUNCTION createMessageElement
function createMessageElement(message) {
  let messageElemDiv = document.createElement("div");
  messageElemDiv.innerText = message.name;
  messageElemDiv.className = "message";
  if (message.isLocked) {
    messageElemDiv.className = "message isLocked";
  }
  return messageElemDiv;
}

// FUNCTION loadMessages
// Datum och tid på meddelande
async function loadMessages(messagesContainer) {
  const response = await fetch("/api/messages");
  const data = await response.json();
  data.forEach((message) => {
    let messageElemDiv = createMessageElement(message);
    messagesContainer.appendChild(messageElemDiv);
  });
  console.log("message: ", data);
}

loadMessages(messagesContainer);

// FUNCTIONS localStorage
function getFromLocalStorage() {
  let maybeJson = localStorage.getItem(key);
  if (!maybeJson) {
    return;
  }
  try {
    let actualData = JSON.parse(maybeJson);
    return actualData;
  } catch {
    return;
  }
}

function saveToLocalStorage(items) {
  // items är en lista med objekt
  let json = JSON.stringify(items);
  localStorage.setItem(key, json);
}

// Används med localStorage (samma för backend?)
const JWT_KEY = "bookapi-jwt";
let isLoggedIn = false;
