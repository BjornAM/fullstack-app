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

let nextChannel = 1

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

// Eventlistener btnAddChannel
btnAddChannel.addEventListener('click', () => {
  const channelFromUser = inputChannel.value
  const newChannel = {
    id: nextChannel,
    isDone: false,
    description: channelFromUser
  }
  nextChannel++

  const element = createChannelElement(newChannel)
  channelList.appendChild(element)

  data.push(newChannel)
  //spara till backend

})

// Används med localStorage (samma för backend?)
const JWT_KEY = "bookapi-jwt";
let isLoggedIn = false;

async function loadChannels (channelsContainer) {
  const response = await fetch("/api/channels");
  const data = await response.json()
  data.forEach(channel => {
    let elemDiv = document.createElement('div');
    elemDiv.innerText = channel.name
    elemDiv.className = "channel"
    if (channel.isLocked) {
      elemDiv.className = "channel isLocked"
    }
    channelsContainer.appendChild(elemDiv)
  })
  console.log("channel: ", data)
}

loadChannels(channelsContainer)

function updateLoginStatus() {
  btnSignIn.disabled = isLoggedIn;
  btnSignUp.disabled = isLoggedIn;
}





