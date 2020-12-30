const displayArea = document.querySelector(".display-area");
const createButton = document.querySelector(".create-button");
const deleteButton = document.querySelector(".delete-button");
const nameInput = document.querySelector(".animal-name-input");
const dietInput = document.querySelector(".animal-diet-input");
const funFactInput = document.querySelector(".animal-fun-fact-input");

window.addEventListener('load', retrieveData);
createButton.addEventListener('click', createAnimal);
// deleteButton.addEventListener('click', () => {
//   deleteAnimal()
// });

function retrieveData() {
  fetch("http://localhost:3001/api/v1/animals")
    .then(response => response.json())
    .then(data => showAnimals(data))
    .catch(error => console.log(error));
}

function showAnimals(data) {
  data.forEach(animal => {
    displayArea.innerHTML += `
    <article id=${animal.id}>
      <h2>${animal.name.charAt(0).toUpperCase() + animal.name.slice(1)}</h2>
      <p><strong>Diet: </strong>${animal.diet}</p>
      <p><strong>Fun Fact: </strong>${animal.fun_fact}</p>
    </article>
  `
  })
}

function createAnimal() {
  fetch("http://localhost:3001/api/v1/animals", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: Date.now(),
        name: nameInput.value,
        diet: dietInput.value,
        fun_fact: funFactInput.value
      })
    })
    .then(response => response.json())
    .then(data => retrieveData())
    .catch(error => console.log(error));
  clearInputs();
}

function clearInputs() {
  nameInput.value = "";
  dietInput.value = "";
  funFactInput.value = "";
}

// function deleteAnimal() {
//   fetch(`http://localhost:3001/api/v1/animals/${deleteAnimalByID.value}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(response => response.json())
//     .then(data => retrieveData())
//     .catch(error => console.log(error));
//   clearInputs();
// }




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const displayUsers = document.querySelector("#display-users");
// const displayAnimals = document.querySelector("#display-animals");
// const animalButton = document.querySelector(".animal-button")
//
// animalButton.addEventListener('click', () => {
//   deleteAnimal(3)
// })
//
// function showUsers(users) {
//   users.forEach(user => {
//     displayUsers.innerText += `
//     ${user.name} is ${user.status} and interested in: ${user.interests}
//   `
//   })
// }
//
// fetch("http://localhost:3001/api/v1/users")
//   .then(response => response.json())
//   .then(data => showUsers(data))
//   .catch(error => console.log(error));
//
// function showAnimals(animal) {
//     displayAnimals.innerHTML = `
//     <p id=${animal.id}>${animal.name} eats ${animal.diet} and ${animal.fun_fact}</p>
//   `
// }
//
// const options = {
//   method: 'POST',
//   body: JSON.stringify({
//     id: 5,
//     name: 'moose',
//     diet: 'no idea',
//     fun_fact: 'they have antlers'
//   }),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// };
//
// function addAnimal() {
//   fetch("http://localhost:3001/api/v1/animals", options)
//     .then(response => response.json())
//     .then(data => showAnimals(data))
//     .catch(error => console.log(error));
// }
//
// addAnimal()
//
// function deleteAnimal(id) {
//   fetch(`http://localhost:3001/api/v1/animals/${id}`, {
//     method: 'DELETE',
//     headers: {
//           'Content-Type': 'application/json'
//         }
//   })
//     .then(response => response.json())
//     .then(id => deleteHTML(id))
//     .catch(error => console.log(error));
// }
//
// function deleteHTML(id) {
//   document.getElementById(id).remove();
// }

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
