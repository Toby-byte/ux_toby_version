const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const mealArray = data.meals;
    // Check if any recipes are found, if not display 'No meals found.'
    if (!mealArray) {
      document.getElementById("mealDisplay").textContent = "No meals found.";
      return; // Stop further execution if no meals
    }

    // Create the structure of the recipe element
    const ul = document.createElement("ul");
    ul.className = "grid-container"; // Add the grid container class
    document.getElementById("mealDisplay").innerHTML = ""; // Clear previous results
    document.getElementById("mealDisplay").appendChild(ul);

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

    // function that creates an li element with content from recipes
    function createListItem(index, meal) {
      const li = document.createElement("li");
      li.className = "grid-item"; // Use a general class for styling
      li.style.gridColumn = gridColumns[(index - 1) % gridColumns.length]; // grid column
      li.style.backgroundImage = `url(${meal.strMealThumb})`; // background image
      li.setAttribute("aria-label", meal.strMeal); // aria-label

      const h1 = document.createElement("h2");
      h1.textContent = meal.strMeal;
      li.appendChild(h1);

      const button = document.createElement("button");
      button.textContent = "Click here to see details";
      button.addEventListener("click", function () {
        window.location.href = `meal-detail.html?id=${
          meal.idMeal
        }&favorites=${encodeURIComponent(
          JSON.stringify(getFavoriteRecipes())
        )}`;
      });
      li.appendChild(button);

      const favoriteButton = document.createElement("button");
      favoriteButton.classList = "favoriteButton";
      favoriteButton.textContent = isFavorite(meal.idMeal)
        ? "✓ Favorited"
        : "★ Favorite";
      favoriteButton.addEventListener("click", function () {
        toggleFavorite(meal, favoriteButton);
      });
      li.appendChild(favoriteButton);

      return li;
    }

    // Create and append list items
    mealArray.forEach((meal, index) => {
      const li = createListItem(index + 1, meal);
      ul.appendChild(li);
    });
  })
  .catch((error) => {
    console.error("Error fetching data: ", error);
    document.getElementById("mealDisplay").textContent =
      "Failed to fetch meal data.";
  });

function toggleFavorite(meal, button) {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) {
    alert("You must be logged in to add favorites.");
    return;
  }

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  const favoriteRecipes =
    JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

  const favoriteIndex = favoriteRecipes.findIndex(
    (fav) => fav.id === meal.idMeal
  );

  if (favoriteIndex === -1) {
    // Add to favorites
    favoriteRecipes.push({ id: meal.idMeal, name: meal.strMeal });
    localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
    button.textContent = "✓ Favorited";
    alert(`${meal.strMeal} has been added to your favorites!`);
  } else {
    // Remove from favorites
    favoriteRecipes.splice(favoriteIndex, 1);
    localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
    button.textContent = "★ Favorite";
    alert(`${meal.strMeal} has been removed from your favorites.`);
  }
}

function isFavorite(mealId) {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) return false;

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  const favoriteRecipes =
    JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];
  return favoriteRecipes.some((fav) => fav.id === mealId);
}

function getFavoriteRecipes() {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) return [];

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  return JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];
}