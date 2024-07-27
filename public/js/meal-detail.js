const params = new URLSearchParams(window.location.search);
const mealId = params.get("id"); // Get the meal ID

if (mealId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

  fetchMealDetails(url);
}

function fetchMealDetails(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const mealDetail = document.getElementById("mealDetail");

      if (data.meals) {
        const meal = data.meals[0];
        displayMealDetails(meal, mealDetail);
      } else {
        mealDetail.textContent = "Meal details not found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching meal details: ", error);
      document.getElementById("mealDetail").textContent = "Failed to fetch meal details.";
    });
}

function displayMealDetails(meal, mealDetail) {
  const { strMealThumb, strMeal, strCategory, strInstructions } = meal;

  const img_name_div = createImageNameDiv(strMealThumb, strMeal, strCategory);
  mealDetail.appendChild(img_name_div);

  const instructionsDiv = createInstructionsDiv(strInstructions);
  const ingredientsDiv = createIngredientsDiv(meal);

  const ingredients_instructions_div = document.createElement("div");
  ingredients_instructions_div.appendChild(ingredientsDiv);
  ingredients_instructions_div.appendChild(instructionsDiv);
  mealDetail.appendChild(ingredients_instructions_div);

  const favoriteButton = createFavoriteButton(meal);
  mealDetail.appendChild(favoriteButton);
}

function createImageNameDiv(imageSrc, mealName, category) {
  const img_name_div = document.createElement("div");

  const img = document.createElement("img");
  img.src = imageSrc;
  img.setAttribute("aria-label", mealName);
  img_name_div.appendChild(img);

  const name = document.createElement("h1");
  name.id = "mealName";
  name.textContent = mealName;
  img_name_div.appendChild(name);

  const categoryElement = document.createElement("p");
  categoryElement.textContent = `Category: ${category}`;
  img_name_div.appendChild(categoryElement);

  return img_name_div;
}

function createInstructionsDiv(instructions) {
  const instructionsDiv = document.createElement("div");

  const instructionsHeading = document.createElement("h1");
  instructionsHeading.textContent = "Instructions";
  instructionsDiv.appendChild(instructionsHeading);

  const formattedInstructions = formatInstructions(instructions);
  const ol = document.createElement("ol");
  formattedInstructions.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    ol.appendChild(li);
  });

  instructionsDiv.appendChild(ol);
  return instructionsDiv;
}

function createIngredientsDiv(meal) {
  const ingredientsDiv = document.createElement("div");

  const ingredientsHeading = document.createElement("h1");
  ingredientsHeading.textContent = "Ingredients";
  ingredientsDiv.appendChild(ingredientsHeading);

  const ingredientsList = document.createElement("ol");

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && measure) {
      const li = document.createElement("li");
      li.textContent = `${ingredient}: ${measure}`;
      ingredientsList.appendChild(li);
    }
  }

  ingredientsDiv.appendChild(ingredientsList);
  return ingredientsDiv;
}

function createFavoriteButton(meal) {
  const favoriteButton = document.createElement("button");
  favoriteButton.className = "FavoriteButton";

  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

  const isFavorite = favoriteRecipes.some((r) => r.idMeal === meal.idMeal);
  favoriteButton.textContent = isFavorite ? "☆ Unfavorite" : "★ Favorite";

  favoriteButton.addEventListener("click", () => {
    toggleFavorite(meal, favoriteButton);
  });

  return favoriteButton;
}

function formatInstructions(instructions) {
  // Remove nutrition facts from recipe instructions if present
  const nutritionFactsRegex = /Nutrition Facts.*/i;
  instructions = instructions.replace(nutritionFactsRegex, "").trim();

  const stepRegex = /\d+\.\s+/g;
  let steps = instructions.split(stepRegex);

  if (steps.length > 1) {
    return steps.map((step) => step.trim()).filter((step) => step.length > 0);
  } else {
    return instructions
      .split(/(?<=[.!?])\s+/)
      .map((sentence) => sentence.trim())
      .filter((sentence) => sentence.length > 0);
  }
}

function toggleFavorite(meal, button) {
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) {
    alert("You must be logged in to favorite recipes.");
    return;
  }

  const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
  let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

  const isFavorite = favoriteRecipes.some((r) => r.idMeal === meal.idMeal);

  if (isFavorite) {
    // Remove from favorites
    favoriteRecipes = favoriteRecipes.filter((r) => r.idMeal !== meal.idMeal);
    button.textContent = "★ Favorite";
    alert("Recipe removed from favorites!");
  } else {
    // Add to favorites
    favoriteRecipes.push({ idMeal: meal.idMeal, name: meal.strMeal });
    button.textContent = "☆ Unfavorite";
    alert("Recipe added to favorites!");
  }

  localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
}