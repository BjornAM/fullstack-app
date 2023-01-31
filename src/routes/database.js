const fakeDb = [
  {name: 'Björn', password: '123123'}
]
// function userExist(username) {}

function authenticateUser(username, password) {
  const found = fakeDb.find(user => user.name === username && user.password === password)

  return !!(found) 
}
export {authenticateUser}

