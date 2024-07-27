const profileInfo = document.getElementById("profile-info");
const favoriteRecipesList = document.getElementById("favorite-recipes");
const users_url = "http://localhost:3000/users";

// initializePage() is here so i can use return in first if statement 
(async function initializePage() {
  // Check necessary elements
  if (!profileInfo || !favoriteRecipesList) {
    console.error("Element with id 'profile-info' or 'favorite-recipes' not found.");
    // this one VVV
    return;
  }

  // Check if user is logged in
  const loggedInUserEmail = sessionStorage.getItem("loggedInUser");
  if (!loggedInUserEmail) {
    alert("You must be logged in to view this page.");
    window.location.href = "login.html";
    return;
  }

  // Fetch user profile and favorite recipes
  try {
    const users = await fetchUsers();
    const userProfile = users.find((user) => user.email === loggedInUserEmail);

    if (!userProfile) {
      console.error("User profile not found for email:", loggedInUserEmail);
      return;
    }

    displayUserProfile(userProfile);
    initializeFavoriteRecipes(userProfile.email);
  } catch (error) {
    console.error("Error initializing profile:", error);
  }
})();

async function fetchUsers() {
  const response = await fetch(users_url);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
}

function displayUserProfile(userProfile) {
  profileInfo.innerHTML = `<p>Email: ${userProfile.email}</p>`;
}

function initializeFavoriteRecipes(email) {
  const favoriteRecipesKey = `user_${email}_favorites`;
  let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

  favoriteRecipes = favoriteRecipes.map((recipe) => {
    if (!recipe.idMeal && recipe.id) {
      recipe.idMeal = recipe.id;
    }
    return recipe;
  });

  renderFavoriteRecipes(favoriteRecipes, favoriteRecipesKey);
}

async function renderFavoriteRecipes(favoriteRecipes, favoriteRecipesKey) {
  favoriteRecipesList.innerHTML = ""; // Clear the list before rendering

  if (favoriteRecipes.length === 0) {
    favoriteRecipesList.textContent = "No favorite recipes found.";
    return;
  }

  for (const recipe of favoriteRecipes) {
    const mealId = recipe.idMeal;

    try {
      const meal = await fetchMealDetails(mealId);
      if (!meal) continue;

      const listItem = createFavoriteListItem(meal, mealId, favoriteRecipes, favoriteRecipesKey);
      favoriteRecipesList.appendChild(listItem);
    } catch (error) {
      console.error("Error fetching meal details:", error);
    }
  }
}

async function fetchMealDetails(mealId) {
  const mealDetailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  const response = await fetch(mealDetailUrl);
  if (!response.ok) throw new Error("Failed to fetch meal details");
  const mealDetailData = await response.json();
  return mealDetailData.meals[0];
}

function createFavoriteListItem(meal, mealId, favoriteRecipes, favoriteRecipesKey) {
  const listItem = document.createElement("li");
  listItem.className = "grid-item-favorite";
  listItem.style.backgroundImage = `url(${meal.strMealThumb})`;
  listItem.setAttribute("aria-label", meal.strMeal);
  listItem.alt = meal.strMeal;

  const mealName = document.createElement("h2");
  mealName.textContent = meal.strMeal;

  const listItemButton = document.createElement("button");
  listItemButton.textContent = "Click here to see details";
  listItemButton.addEventListener("click", () => {
    window.location.href = `meal-detail.html?id=${mealId}&favorites=${encodeURIComponent(
      JSON.stringify(favoriteRecipes)
    )}`;
  });

  const unfavoriteButton = document.createElement("button");
  unfavoriteButton.classList.add("favorite-button");
  unfavoriteButton.textContent = "Unfavorite";
  unfavoriteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    removeFavoriteRecipe(mealId, favoriteRecipes, favoriteRecipesKey);
  });

  listItem.appendChild(mealName);
  listItem.appendChild(listItemButton);
  listItem.appendChild(unfavoriteButton);

  return listItem;
}

function removeFavoriteRecipe(mealId, favoriteRecipes, favoriteRecipesKey) {
  favoriteRecipes = favoriteRecipes.filter((recipe) => recipe.idMeal !== mealId);
  localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
  renderFavoriteRecipes(favoriteRecipes, favoriteRecipesKey); // Re-render the favorite recipes list
}