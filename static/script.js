const btnGetBooks = document.querySelector('#btnGetBooks')
const btnPostBook = document.querySelector('#btnPostBook')
const booksList = document.querySelector('#booksList')
const inputUsername = document.querySelector('#inputUsername')
const inputPassword = document.querySelector('#inputPassword')
const btnLogin = document.querySelector('#btnLogin')
const btnLogout = document.querySelector('#btnLogout')

// Används med localStorage
const JWT_KEY = 'bookapi-jwt'
let isLoggedIn = false 


function updateLoginStatus() {
  btnLogin.disabled = isLoggedIn
  btnLogout = !isLoggedIn
}

btnlogin.addEventListener('click', async () => {
  // hämta username och password
  // skicka med POST request tilll servern
  // när servern svarar:
  // uppdatera gränssnittet
  //spara JWT i localstorage

const user = {
  username: inputUsername.value,
  password: inputPassword.value
}
//"optimistisk" kod
const options = {
  method: 'POST',
  body: JSON.stringify(user),
  headers: {
    //MIME type: application/json (googla MIME-type för att veta fler förslag)
    "Content-Type": "application/json"
  }
}

const response = await fetch('/login', options) // FETCH is to get something or return something from another place
// AWAIT is waiting for a result before moving on
if (response.status === 200) {
  console.log('Login succesful')
  const userToken = await response.json()
  console.log('User token: ', userToken)
  // spara userToken.token
  localStorage.setItem(JWT_KEY, userToken.token) // KEY= JWT_KEY VALUE= userToken.token
  isLoggedIn = true

} else { //status 401 unauthorized
  console.log('login failed, status:' + response.status)
}

updateLoginStatus()

})


async function getBooks() {
  // 1. skicka ett request till backend: GET /api/books
	// 2. backend skickar tillbaka lista med böcker (förhoppningsvis)
	// 3. spara datan i en variabel
	// 4. rendera DOM-element som visar datan == skapa DOM-element som  innehåller titel och författare som text

	// Skicka request med AJAX. Ett enkelt GET-request behöver inga inställningar
  let bookData = null
  try {         // så fort något går fel i try hoppar man till catch
  const response = await fetch('/api/books') 
  if (response.status !== 200) {
    console.log('Could not contact server' + response.status)
    return
  }
  bookData = await response.json()
  console.log('Data from server', bookData)
  } catch(error) {
    console.log('Something went wrong when fetching data from server. (GET) \n' + error.message)
    return
  }

  booksList.innerHTML = '' //tömmer ul-listan varje gång för att vi inte ska få dublett, 3, 4 osv av böckerna varje gång vi uppdaterar.

  bookData.forEach(book => {
    	// Bok-objekt har egenskaperna: title, authorName, id
		// skapa ett <li> element
		// fyll elementet med bokdata (titel osv.)
		// lägg till sist i <ul>

    let li = document.createElement('li') // skapa listan. skapa titlar och författare
    li.innerText = `${book.title} by ${book.authorName}.`
    booksList.appendChild(li) //vad gör denna?
  })

}
btnGetBooks.addEventListener('click', getBooks)

btnPostBook.addEventListener('click', async () => {
  console.log()
  // skicka med jwt om vi är inloggade.
  // 1. skicka ett POST /api/books request med data i request body
	// 2. Vad skickar servern för svar?
	// 3. uppdatera gränssnittet
  
  const newBook = { //skapa nytt bokobjekt
    title: 'Liftarens guide till galaxen',
    authorName: 'Douglas Adams',
    id: 42
  }

  
  const jwt = localStorage.getItem(JWT_KEY)
  const options = {
    method: 'POST',
    body: JSON.stringify(newBook), // lägg till ny bok i json-format JSON.parse = göra om till javascript-format
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' + jwt 
      //express servern förstår att det som kommer i bodyn är i json-format
    }
    
  }
  // TODO: Lägg till try catch !!!! Eftersom fetch är en osäker operation = "optimistisk" kod
  
  try {
  const response = await fetch('/api/books', options) // skickar det hela

  if (response.status === 200) {
    // Allt gick bra
    //Skicka ett nytt GET request
    getBooks() 


  } else {
    // Något gick fel
    handleError('Något gick fel vid POST request! status=', response.status) 
  }
} catch (e) {
handleError(e)
}
})

const handleError = (e, status) => {
  console.error(e)
}
