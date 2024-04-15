// Get the path part of the URL (everything after the last "/")
const urlPath = window.location.pathname.split("/").pop();

// fetches the route of the API that the user types into the url
fetch(`http://localhost:5000/${urlPath}`)
  .then(response => response.json())
  .then(data => {
    displayDataInCards(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  // as soon as the query/page loads it populates!
window.onload = async function displayDataInCards(data) {
  const cardContainer = document.querySelector('.card-container');

  data.forEach(item => {
    const card = createCard(item);
    cardContainer.appendChild(card);
  });
}

function createCard(data) {
  const card = document.createElement('div');
  card.classList.add('card', 'mb-3');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = data.drink_name;

  const cardText = document.createElement('p');
  cardText.classList.add('card-text');
  cardText.textContent = data.description;

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('card-text');
  cardPrice.textContent = `Price: $${data.price.toFixed(2)}`;

  const cardType = document.createElement('p');
  cardType.classList.add('card-text');
  cardType.textContent = `Drink Type: ${data.drink_type}`;

  const cardIngredients = document.createElement('p');
  cardIngredients.classList.add('card-text');
  if (data.ingredients) {
    cardIngredients.textContent = `Ingredients: ${data.ingredients.join(', ')}`;
  } else {
    cardIngredients.textContent = 'Ingredients: N/A';
  }

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardType);
  cardBody.appendChild(cardIngredients);
  card.appendChild(cardBody);

  return card;
}

// adjust the data.title and data.desciption etc... properties based on the structure of the data returned by the API
// maybe change 'data' to 'space_bar', idk, look it up