document.addEventListener('DOMContentLoaded', function () {
  /**
   * An event listener on the categories in the Recipes page.
   * It calls the function loadRecipesByCategory when a
   * MenuSectionBoxesItem is clicked.
   */
  const categories = document.querySelectorAll('.MenuSectionBoxesItem');
  categories.forEach(category => {
    category.addEventListener('click', function (event) {
      if (!event.target.classList.contains('MenuSectionRecipeItem')) {
        loadRecipesByCategory(this.dataset.id);
      }
    });
  });
});

function loadRecipesByCategory (categoryName) {
  /**
   * A function that requests all the recipes of a specific category
   * from an api, and fetches the data and sends it to requestRecipesDetails.
   */
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
  fetch(url).then(response => response.json()).then(data => {
    requestRecipesDetails(data);
  }).catch(error => {
    console.log('There has been an error: ', error);
  });
}

function requestRecipesDetails (data) {
  /**
   * A function that looks up a recipe by its id, and fetches the recipe's
   * details. Then after all the recipes are fetched, it calls the function
   * displayRecipes.
   */
  const fetchPromises = data.meals.map(meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${
            meal.idMeal
        }`;
    return fetch(url).then(response => response.json()).catch(error => {
      console.log('There has been an error: ', error);
    });
  });
  Promise.all(fetchPromises).then(allData => {
    displayRecipes(allData);
  });
}

function displayRecipes (dataArray) {
  /**
   * A function that displays the recipes of a category inside the html
   * tag MenuSectionBoxes after it empties it.
   */
  const recipesContainer = document.querySelector('.MenuSectionBoxes');
  // Clear content.
  recipesContainer.innerHTML = '';
  const menuSectionBoxes = document.createElement('div');
  menuSectionBoxes.classList.add('MenuSectionBoxes');
  // Iterate through the array of data
  dataArray.forEach(data => {
    data.meals.forEach(meal => {
      const recipe = document.createElement('div');
      recipe.id = `${
                meal.idMeal
            }`;
      recipe.classList.add('MenuSectionRecipeItem');
      recipe.innerHTML = `
      <div class="MenuSectionRecipesWrap"><p>${meal.strMeal}</p></div>
      <img src="${meal.strMealThumb}">`;
      recipesContainer.appendChild(recipe);
    });
  });
  recipesContainer.appendChild(menuSectionBoxes);
}


document.addEventListener('DOMContentLoaded', function () {
  /**
   * An event listener on the tag MenuSectionBoxes, but this time the
   * content of MenuSectionBoxes are the recipes not the categories.
   * When a recipe is clicked it calls the function requestRecipeDetails
   * using its unique id.
   */
  const recipesContainer = document.querySelector('.MenuSectionBoxes');
  recipesContainer.addEventListener('click', function (event) {
    const clickedElement = event.target.closest('.MenuSectionRecipeItem');
    if (clickedElement) {
      requestRecipeDetails(clickedElement.id);
    }
  });
  /**
   * An event listener on the tag PopupContainer, when the tag RecipeDetails
   * is clicked the PopupContainer will be hidden since we called the hidePopup.
   */
  const exitClick = document.querySelector('.PopupContainer');
  exitClick.addEventListener('click', function (event) {
    if (!event.target.closest('.RecipeDetails')){
        hidePopup();
    }
  });
});

function requestRecipeDetails (id) {
  /**
   * A function that requests the details of a recipe by id and fetches its
   * details and calls the function displayRecipeDetails and calls the function
   * showPopup.
   */
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(url).then(response => response.json()).then(data => {
    displayRecipeDetails(data);
    showPopup();
  }).catch(error => {
    console.log('There has been an error: ', error);
  });
}

function showPopup () {
  /**
   * A function that shows a new tag PopupContainer that holds the recipe
   * clicked's details.
   */
  const popupContainer = document.querySelector('.PopupContainer');
  popupContainer.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function hidePopup () {
  /**
   * A function that hides the tag PopupContainer that holds the recipe
   * clicked's details.
   */
  const popupContainer = document.querySelector('.PopupContainer');
  popupContainer.style.display = 'none';
  document.body.style.overflow = '';
}

function displayRecipeDetails (data) {
  /**
   * A function that displays the details of a recipes inside the RecipeDetails
   * tag, as well as create an array of the ingredients since they are saperated
   * in the api. If no data is available an error is shown.
   */
  const recipe = document.querySelector('.RecipeDetails');
  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];
    const mealIngredients = [];
    for (let i = 1; meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== null && meal[`strIngredient${i}`] !== undefined; i++) {
      mealIngredients.push(meal[`strIngredient${i}`]);
    }
    recipe.innerHTML = `
            <img src="${meal.strMealThumb}">
            <p class="recipeInfo">
                Recipe name: ${meal.strMeal}<br>
                Recipe Category: ${meal.strCategory}<br>
                Recipe Area: ${meal.strArea}<br>
            </p>
            <p class="recipeIngredient">Recipe ingredients:
                ${mealIngredients.map(ingredient => `${ingredient}`).join(', ')}
            </p>
            <p class="recipeInstructions">Recipe instructions: ${meal.strInstructions}</p>
        `;
  } else {
    recipe.innerHTML = '<p>No recipe details available!</p>';
  }
}
