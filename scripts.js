const displayArea = document.querySelector(".display-area");
const addButton = document.querySelector(".add-button");
const nameInput = document.querySelector(".animal-name-input");
const dietInput = document.querySelector(".animal-diet-input");
const funFactInput = document.querySelector(".animal-fun-fact-input");

window.addEventListener('load', retrieveData);
addButton.addEventListener('click', addAnimal);
displayArea.addEventListener('click', deleteAnimal);

function retrieveData() {
  fetch("http://localhost:3001/api/v1/animals")
    .then(response => response.json())
    .then(data => showAnimals(data))
    .catch(error => console.log(error));
}

function showAnimals(data) {
  data.forEach(animal => {
    displayArea.innerHTML += `
    <article>
      <h2>${animal.name.charAt(0).toUpperCase() + animal.name.slice(1)}</h2>
      <p><strong>Diet: </strong>${animal.diet}</p>
      <p><strong>Fun Fact: </strong>${animal.fun_fact}</p>
      <button class="delete-button" id=${animal.id}>Delete Animal</button>
    </article>
  `
  })
}

function addAnimal() {
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
    .then(data => showAnimals(data))
    .catch(error => console.log(error));
  clearInputs();
}

function clearInputs() {
  nameInput.value = "";
  dietInput.value = "";
  funFactInput.value = "";
}

function deleteAnimal(event) {
  fetch(`http://localhost:3001/api/v1/animals/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayArea.innerHTML = "";
      showAnimals(data)
    })
    .catch(error => console.log(error));
}
