document.addEventListener('DOMContentLoaded', async () => {
    const profileInfo = document.getElementById('profile-info');
    const favoriteRecipesList = document.getElementById('favorite-recipes');

    if (!profileInfo) {
        console.error("Element with id 'profile-info' not found.");
        return;
    }

    // Fetch user profile from JSON Server
    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
    const usersResponse = await fetch('http://localhost:3000/users');
    const users = await usersResponse.json();
    const userProfile = users.find(user => user.email === loggedInUserEmail);
    
    if (!userProfile) {
        console.error("User profile not found for email:", loggedInUserEmail);
        return;
    }

    // Display user profile information including email
    profileInfo.innerHTML = `<p>Email: ${userProfile.email}</p>`; // Displaying email only for demonstration
    
    // Retrieve favorite recipes from localStorage (dummy example)
    const favoriteRecipesKey = `user_${userProfile.id}_favorites`;
    const favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

    // Display favorite recipes
    favoriteRecipes.forEach(recipe => {
        const listItem = document.createElement('li');
        listItem.textContent = recipe.name;
        favoriteRecipesList.appendChild(listItem);
    });
});