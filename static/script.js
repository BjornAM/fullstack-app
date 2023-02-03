const _fetch = (uri, options) => {
  return fetch(uri, {
    ...options,
    headers: {
      ...options?.headers,
      authorization: `Bearer ${localStorage.getItem(JWT_KEY)}`
    },

  })
}

// Variables Channels
const channelsContainer = document.querySelector(".channels");
const inputChannel = document.querySelector(".input-channel");
const isLockedCheckbox = document.querySelector('.channel-locked')
const btnAddChannel = document.querySelector("#btn-add-channel");
const channelList = document.querySelector(".channel-list");
const selectedChannelTitle = document.querySelector("#selected-channel-title")

//Variables messages
const messagesContainer = document.querySelector(".messages");
const inputMessage = document.querySelector(".input-message");
const btnSendMessage = document.querySelector("#btn-send-message");

//buttons
const btnSignOut = document.querySelector("#btn-sign-out");


const JWT_KEY = "chatsite-jwt";
let isLoggedIn = false;
let selectedChannel = undefined


//Eventlistener btnSignOut
btnSignOut.addEventListener('click', () => {
  localStorage.clear();
  window.location = '/login'
})
//Eventlistener btnSignUp

// EVENTLISTENER btnAddChannel
btnAddChannel.addEventListener("click", async () => {
  const channelFromUser = inputChannel.value;
  const newChannel = {
    isLocked: isLockedCheckbox.checked,
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
  const response = await _fetch("/api/channels", {
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
    elemDiv.classList.add("isLocked");
  }
  elemDiv.addEventListener('click', () => {
    selectedChannel = channel
    document.querySelector('.channel.selected')?.classList.remove('selected')
    elemDiv.classList.add('selected')
    selectedChannelTitle.innerHTML = channel.name
    updateSelectedChannel()
  })
  return elemDiv;
}

// FUNCTION loadChannels
async function loadChannels(channelsContainer) {
  const response = await _fetch("/api/channels");
  const data = await response.json();
  data.forEach((channel) => {
    console.log('channel', channel)
    let elemDiv = createChannelElement(channel);
    channelsContainer.appendChild(elemDiv);
  });
  console.log("channel: ", data);
}

loadChannels(channelsContainer);


function updateLoginStatus() {
  let jwt = localStorage.getItem(JWT_KEY);
  if (!jwt && !isLoggedIn) window.location = '/login'
}

// RIGHT COLUMN
// EVENTLISTENER btnSendMessage
btnSendMessage.addEventListener("click", async (e) => {

  const userInputMessage = inputMessage.value;
  const newMessage = {
    text: userInputMessage,
    channelId: selectedChannel.id
  };
  await fetchMessage(newMessage);
  updateSelectedChannel()
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
inputMessage.addEventListener("click", (event) => { });

// FUNCTION CREATE NEW MESSAGE
async function fetchMessage(newMessage) {
  const response = await _fetch("/api/messages", {
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
  let metadataDiv = document.createElement("div")

  let timeDiv = document.createElement("div")
  timeDiv.className = "metadata"
  timeDiv.innerText = message.formattedDate

  let userDiv = document.createElement("div")
  userDiv.className = "user"
  userDiv.innerText = message.username

  metadataDiv.appendChild(userDiv)
  metadataDiv.appendChild(timeDiv)

  let textDiv = document.createElement("div")
  textDiv.className = "text"
  textDiv.innerText = message.text

  messageElemDiv.appendChild(metadataDiv)
  messageElemDiv.appendChild(textDiv)

  messageElemDiv.className = "message";
  if (message.isLocked) {
    messageElemDiv.className = "message isLocked";
  }
  return messageElemDiv;
}

// FUNCTION loadMessages
// Datum och tid på meddelande
async function loadMessages(messagesContainer) {
  if (!selectedChannel) return

  const response = await _fetch(`/api/messages/${selectedChannel.id}`);
  const data = await response.json();
  messagesContainer.innerHTML = ""
  data.forEach((message) => {
    let messageElemDiv = createMessageElement(message);
    messagesContainer.appendChild(messageElemDiv);
  });
  console.log("message: ", data);
}


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

const updateSelectedChannel = () => {
  if (!selectedChannel) {
    inputMessage.value = 'Please select a channel'
    inputMessage.disabled = true
    btnSendMessage.disabled = true
  } else {
    if (!selectedChannel.access) {
      selectedChannelTitle.classList.add('locked')
      inputMessage.value = 'This channel is locked for you'
      inputMessage.disabled = true
      btnSendMessage.disabled = true
    } else {
      selectedChannelTitle.classList.remove('locked')
      inputMessage.value = ''
      inputMessage.disabled = false
      btnSendMessage.disabled = false
    }
  }
  loadMessages(messagesContainer)

}


updateLoginStatus()
updateSelectedChannel()