/** ***************Category*******************/
document.addEventListener('DOMContentLoaded', function () {
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
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`;
  fetch(url).then(response => response.json()).then(data => {
    requestRecipesDetails(data);
  }).catch(error => {
    console.log('There has been an error: ', error);
  });
}

function requestRecipesDetails (data) {
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
/*****************Recipe*******************/
document.addEventListener('DOMContentLoaded', function () {
  const recipesContainer = document.querySelector('.MenuSectionBoxes');
  recipesContainer.addEventListener('click', function (event) {
    const clickedElement = event.target.closest('.MenuSectionRecipeItem');
    if (clickedElement) {
      requestRecipeDetails(clickedElement.id);
    }
  });

  const exitClick = document.querySelector('.PopupContainer');
  exitClick.addEventListener('click', function (event) {
    if (!event.target.closest('.RecipeDetails')){
        hidePopup();
    }
  });
});

function requestRecipeDetails (id) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  fetch(url).then(response => response.json()).then(data => {
    displayRecipeDetails(data);
    showPopup();
  }).catch(error => {
    console.log('There has been an error: ', error);
  });
}

function showPopup () {
  const popupContainer = document.querySelector('.PopupContainer');
  popupContainer.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function hidePopup () {
  const popupContainer = document.querySelector('.PopupContainer');
  popupContainer.style.display = 'none';
  document.body.style.overflow = '';
}

function displayRecipeDetails (data) {
  const recipe = document.querySelector('.RecipeDetails');
  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];
    const mealIngredients = [];
    for (let i = 1; meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== null && meal[`strIngredient${i}`] !== undefined; i++) {
      mealIngredients.push(meal[`strIngredient${i}`]);
    }
    console.log(mealIngredients);
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
