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
    const favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

    // Display favorite recipes
    favoriteRecipes.forEach(async recipe => {
        // Determine the meal ID property (id or idMeal)
        const mealId = recipe.id || recipe.idMeal;

        // Fetch meal details to get the image URL
        const mealDetailUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const mealDetailResponse = await fetch(mealDetailUrl);
        const mealDetailData = await mealDetailResponse.json();
        const meal = mealDetailData.meals[0];

        // Create list item with image and name
        const listItem = document.createElement('li');
        listItem.className = 'favorite-recipe-item';

        const img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.alt = meal.strMeal;
        img.className = 'favorite-recipe-image';

        const mealName = document.createElement('p');
        mealName.textContent = meal.strMeal;
        mealName.className = 'favorite-recipe-name';

        listItem.appendChild(img);
        listItem.appendChild(mealName);

        favoriteRecipesList.appendChild(listItem);

        // Add click event listener to each favorite recipe
        listItem.addEventListener('click', () => {
            window.location.href = `meal-detail.html?id=${mealId}`;
        });
    });
});