document.addEventListener('DOMContentLoaded', async () => {
    const profileInfo = document.getElementById('profile-info');
    const favoriteRecipesList = document.getElementById('favorite-recipes');

    if (!profileInfo || !favoriteRecipesList) {
        console.error("Element with id 'profile-info' or 'favorite-recipes' not found.");
        return;
    }

    // Fetch user profile from JSON Server
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    if (!loggedInUserEmail) {
        alert('You must be logged in to view this page.');
        window.location.href = 'login.html';
        return;
    }

    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();
    const userProfile = users.find(user => user.email === loggedInUserEmail);

    if (!userProfile) {
        console.error("User profile not found for email:", loggedInUserEmail);
        return;
    }

    // Display user profile information including email
    profileInfo.innerHTML = `<p>Email: ${userProfile.email}</p>`;

    // Retrieve favorite recipes from localStorage
    const favoriteRecipesKey = `user_${userProfile.email}_favorites`;
    let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

    // Ensure all recipes have an idMeal property
    favoriteRecipes = favoriteRecipes.map(recipe => {
        if (!recipe.idMeal && recipe.id) {
            recipe.idMeal = recipe.id;
        }
        return recipe;
    });

    // Function to remove a recipe from the favorites list
    const removeFavoriteRecipe = (mealId) => {
        console.log(`Removing meal ID: ${mealId}`); // Debugging step

        // Additional debugging: log each recipe's ID
        favoriteRecipes.forEach(recipe => console.log(`Existing recipe ID: ${recipe.idMeal}`));

        favoriteRecipes = favoriteRecipes.filter(recipe => recipe.idMeal !== mealId);

        console.log('Updated favorite recipes:', favoriteRecipes); // Debugging step

        // Confirm the recipe was removed
        const removedRecipe = favoriteRecipes.find(recipe => recipe.idMeal === mealId);
        if (removedRecipe) {
            console.error(`Failed to remove meal ID: ${mealId}`);
        } else {
            console.log(`Successfully removed meal ID: ${mealId}`);
        }

        localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
        renderFavoriteRecipes(); // Re-render the favorite recipes list
    };

    // Function to render favorite recipes
    const renderFavoriteRecipes = async () => {
        favoriteRecipesList.innerHTML = ''; // Clear the list before rendering

        if (favoriteRecipes.length === 0) {
            favoriteRecipesList.textContent = 'No favorite recipes found.';
            return;
        }

        for (const recipe of favoriteRecipes) {
            const mealId = recipe.idMeal;

            // Fetch meal details to get the image URL
            const mealDetailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
            const mealDetailResponse = await fetch(mealDetailUrl);
            const mealDetailData = await mealDetailResponse.json();
            const meal = mealDetailData.meals[0];

            // Create list item with image and name
            const listItem = document.createElement('li');
            listItem.className = 'grid-item-favorite';
            listItem.style.backgroundImage = `url(${meal.strMealThumb})`;
            listItem.setAttribute('aria-label', meal.strMeal);
            listItem.alt = meal.strMeal;

            const mealName = document.createElement('h2');
            mealName.textContent = meal.strMeal;

            const listItemButton = document.createElement('button');
            listItemButton.textContent = "Click here to see details";
            listItemButton.addEventListener('click', () => {
                window.location.href = `meal-detail.html?id=${mealId}&favorites=${encodeURIComponent(JSON.stringify(favoriteRecipes))}`;
            });

            const unfavoriteButton = document.createElement('button');
            unfavoriteButton.classList.add('favorite-button'); // Ensure correct method to add class
            unfavoriteButton.textContent = "Unfavorite";
            unfavoriteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click event from propagating to the listItem
                console.log(`Unfavorite button clicked for meal ID: ${mealId}`); // Debugging step
                removeFavoriteRecipe(mealId);
            });

            listItem.appendChild(mealName);
            listItem.appendChild(listItemButton);
            listItem.appendChild(unfavoriteButton);
            favoriteRecipesList.appendChild(listItem);
        }
    };

    // Initial rendering of favorite recipes
    renderFavoriteRecipes();
});
