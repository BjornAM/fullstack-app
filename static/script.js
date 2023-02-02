// Variables Channels
const channelsContainer = document.querySelector(".channels")
const inputChannel = document.querySelector(".input-channel")
const btnAddChannel = document.querySelector("#btn-add-channel")
const channelList = document.querySelector(".channel-list")

//Variables users & password 
const inputUsername = document.querySelector(".input-username");
const inputPassword = document.querySelector(".input-password");
const btnSignIn = document.querySelector("#btn-sign-in");
const btnSignOut = document.querySelector("#btn-sign-out");
const btnSignUp = document.querySelector("#btn-sign-up");

//Variables messages
const inputMessage = document.querySelector(".input-message");
const btnSendMessage = document.querySelector("#btn-send-message");

// Hämta data från backend för startsida och vid inloggad sida

//Eventlistener btnSignIn
btnSignIn.addEventListener("click", async () => {
  // hämta username och password
  // skicka med POST request tilll servern
  // när servern svarar:
  // uppdatera gränssnittet
  //spara JWT i localstorage
  const user = {
    username: inputUsername.value,
    password: inputPassword.value,
  };
  //"optimistisk" kod
  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      //MIME type: application/json (googla MIME-type för att veta fler förslag)
      "Content-Type": "application/json",
    },
  };
  
  const response = await fetch("/login", options); // FETCH is to get something or return something from another place
  // AWAIT is waiting for a result before moving on
  if (response.status === 200) {
    console.log("Login succesful");
    const userToken = await response.json();
    console.log("User token: ", userToken);
    // spara userToken.token
    localStorage.setItem(JWT_KEY, userToken.token); // KEY= JWT_KEY VALUE= userToken.token
    isLoggedIn = true;
  } else {
    //status 401 unauthorized
    console.log("login failed, status:" + response.status);
  }
  
  updateLoginStatus();
});

//Eventlistener btnSignOut
//Eventlistener btnSignUp


btnAddChannel.addEventListener('click', async () => {
  const channelFromUser = inputChannel.value
  const newChannel = {
    isLocked: false,
    name: channelFromUser
  }
  const element = await fetchChannel(newChannel)
  channelsContainer.appendChild(element)

  //data.push(newChannel)
  //saveToLocalStorage(data)
  //spara till backend 

})

async function fetchChannel(newChannel) {
  const response = await fetch("/api/channels", {
    method:"POST", 
    headers: {
      "Content-Type": "application/json"},
    body: JSON.stringify(newChannel)
  })
    let data = await response.json()
    // Spara eventuellt datan till localStorage
    let channelElement = createChannelElement(data)
return channelElement
  }



inputChannel.addEventListener('keyup', event => {
  let userText = inputChannel.value
  if (userText.length > 0) {
    btnAddChannel.disabled = false
  } else {
    btnAddChannel.disabled = true
  }
})

// inputMessage.addEventListener()

inputMessage.addEventListener('keyup', event => {
  let userText = inputMessage.value
  if (userText.length > 0) {
    btnSendMessage.disabled = false
  } else {
    btnSendMessage.disabled = true
  }
})

// btnSendMessage.addEventListener()

function getFromLocalStorage() {
	let maybeJson = localStorage.getItem(key)
	if( !maybeJson ) {
		return
	}
	try {
		let actualData = JSON.parse(maybeJson)
		return actualData
	} catch {
		return
	}
}
function saveToLocalStorage(items) {
	// items är en lista med objekt
	let json = JSON.stringify(items)
	localStorage.setItem(key, json)
}


// Används med localStorage (samma för backend?)
const JWT_KEY = "bookapi-jwt";
let isLoggedIn = false;

function createChannelElement(channel) {
  let elemDiv = document.createElement('div');
    elemDiv.innerText = channel.name
    elemDiv.className = "channel"
    if (channel.isLocked) {
      elemDiv.className = "channel isLocked"
    }
    return elemDiv
}
async function loadChannels (channelsContainer) {
  const response = await fetch("/api/channels");
  const data = await response.json()
  data.forEach(channel => {
    let elemDiv = createChannelElement(channel)
    channelsContainer.appendChild(elemDiv)
  })
  console.log("channel: ", data)
}

loadChannels(channelsContainer)

function updateLoginStatus() {
  btnSignIn.disabled = isLoggedIn;
  btnSignUp.disabled = isLoggedIn;
}





