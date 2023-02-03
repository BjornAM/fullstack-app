//Variables users & password
const inputUsername = document.querySelector(".input-username");
const inputPassword = document.querySelector(".input-password");
const btnSignIn = document.querySelector("#btn-sign-in");
const btnSignUp = document.querySelector("#btn-sign-up");

btnSignUp.addEventListener("click", async () => {
  signup({
    username: inputUsername.value,
    password: inputPassword.value
  })
})
//Eventlistener btnSignIn
btnSignIn.addEventListener("click", () => {
  login({
    username: inputUsername.value,
    password: inputPassword.value
  })

});

const signup = async ({ username, password }) => {
  const options = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // LOGIN OK?
  const response = await fetch("/api/users/signup", options);
  if (response.status === 200) {
    login({ username, password })
  } else {
    console.log("could not create new user, status:" + response.status);
  }
}

const login = async ({ username, password }) => {

  const options = {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      "Content-Type": "application/json",
    },
  };

  // LOGIN OK?
  const response = await fetch("/login", options);
  if (response.status === 200) {
    const userToken = await response.json(); // spaa userToken.token
    localStorage.setItem(JWT_KEY, userToken.token);
    window.location = '/'
  } else {
    console.log("login failed, status:" + response.status);
  }
}

const JWT_KEY = "chatsite-jwt";