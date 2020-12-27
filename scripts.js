const displayUsers = document.querySelector("#display-users");
const displayAnimals = document.querySelector("#display-animals");
const animalButton = document.querySelector(".animal-button")

animalButton.addEventListener('click', () => {
  deleteAnimal(3)
})

function showUsers(users) {
  users.forEach(user => {
    displayUsers.innerText += `
    ${user.name} is ${user.status} and interested in: ${user.interests}
  `
  })
}

fetch("http://localhost:3001/api/v1/users")
  .then(response => response.json())
  .then(data => showUsers(data))
  .catch(error => console.log(error));

function showAnimals(animal) {
    displayAnimals.innerHTML = `
    <p id=${animal.id}>${animal.name} eats ${animal.diet} and ${animal.fun_fact}</p>
  `
}

const options = {
  method: 'POST',
  body: JSON.stringify({
    id: 5,
    name: 'moose',
    diet: 'no idea',
    fun_fact: 'they have antlers'
  }),
  headers: {
    'Content-Type': 'application/json'
  }
};

function addAnimal() {
  fetch("http://localhost:3001/api/v1/animals", options)
    .then(response => response.json())
    .then(data => showAnimals(data))
    .catch(error => console.log(error));
}

addAnimal()

function deleteAnimal(id) {
  fetch(`http://localhost:3001/api/v1/animals/${id}`, {
    method: 'DELETE',
    headers: {
          'Content-Type': 'application/json'
        }
  })
    .then(response => response.json())
    .then(id => deleteHTML(id))
    .catch(error => console.log(error));
}

function deleteHTML(id) {
  document.getElementById(id).remove();
}

// function addAnimal(name, diet, funFact) {
//   fetch("http://localhost:3001/api/v1/animals", {
//     method: 'POST',
//     body: JSON.stringify({
//       id: Date.now(),
//       name: name,
//       diet: diet,
//       fun_fact: funFact
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(response => response.json())
//     .then(data => showAnimals(data))
//     .catch(error => console.log(error));
//
//   // showAnimals(animals)
// }
