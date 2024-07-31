const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const mealArray = data.meals;
    displayMeals(mealArray);
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
    document.getElementById("mealDisplay").textContent = "Failed to fetch meal data.";
  });

function displayMeals(mealArray) {
  const mealDisplay = document.getElementById("mealDisplay");
  mealDisplay.innerHTML = ""; // Clear previous results

  // Check if any recipes are found, if not display 'No meals found.'
  if (!mealArray) {
    mealDisplay.textContent = "No meals found.";
    return;
  }

  // Create the structure of the recipe element
  const ul = document.createElement("ul");
  ul.className = "grid-container"; // Add the grid container class
  mealDisplay.appendChild(ul);

  // Grid column pattern design for search results
  const gridColumns = [
    "1 / 4",
    "4 / 6",
    "6 / 10",
    "1 / 3",
    "3 / 6",
    "6 / 10",
    "1 / 3",
    "3 / 5",
    "5 / 10",
  ];

  // Create and append list items in the gridColumns pattern
  mealArray.forEach((meal, index) => {
    const li = createListItem(index + 1, meal, gridColumns);
    ul.appendChild(li);
  });
}

function createListItem(index, meal, gridColumns) {
  const { idMeal, strMeal, strMealThumb } = meal;

  const li = document.createElement("li");
  li.className = "grid-item";
  li.style.gridColumn = gridColumns[(index - 1) % gridColumns.length];
  li.style.backgroundImage = `url(${strMealThumb})`;
  li.setAttribute("aria-label", strMeal);

  const h1 = document.createElement("h2");
  h1.textContent = strMeal;
  li.appendChild(h1);

  const button = document.createElement("button");
  button.textContent = "Click here to see details";
  button.addEventListener("click", function () {
    window.location.href = `meal-detail.html?id=${idMeal}&favorites=${encodeURIComponent(JSON.stringify(getFavoriteRecipes()))}&name=${encodeURIComponent(JSON.stringify(strMeal))}`;
  });
  li.appendChild(button);

  const favoriteButton = document.createElement("button");
  favoriteButton.className = "favoriteButton";
  favoriteButton.textContent = isFavorite(idMeal) ? "✓ Favorited" : "★ Favorite";
  favoriteButton.addEventListener("click", function () {
    toggleFavorite(meal, favoriteButton);
  });
  li.appendChild(favoriteButton);

  return li;
}

function toggleFavorite(meal, button) {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) {
    alert("You must be logged in to add favorites.");
    return;
  }

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

  const isAlreadyFavorite = favoriteRecipes.some((fav) => fav.id === meal.idMeal);

  if (isAlreadyFavorite) {
    // Remove from favorites
    favoriteRecipes = favoriteRecipes.filter((fav) => fav.id !== meal.idMeal);
    button.textContent = "★ Favorite";
    alert(`${meal.strMeal} has been removed from your favorites.`);
  } else {
    // Add to favorites
    favoriteRecipes.push({ id: meal.idMeal, name: meal.strMeal });
    button.textContent = "✓ Favorited";
    alert(`${meal.strMeal} has been added to your favorites!`);
  }

  localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
}

function isFavorite(mealId) {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) return false;

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  const favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];
  return favoriteRecipes.some((fav) => fav.id === mealId);
}

function getFavoriteRecipes() {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) return [];

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  return JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];
}