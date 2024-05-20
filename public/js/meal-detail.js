document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get('id'); // Get the meal ID from URL query parameters

    if (mealId) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const mealDetail = document.getElementById('mealDetail');

                if (data.meals) {
                    const { strMealThumb, strMeal, strCategory, strInstructions, idMeal } = data.meals[0];

                    const img = document.createElement('img');
                    img.src = strMealThumb;
                    mealDetail.appendChild(img);

                    const mealName = document.createElement('h1');
                    mealName.textContent = strMeal;
                    mealDetail.appendChild(mealName);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${strCategory}`;
                    mealDetail.appendChild(category);

                    const favoriteButton = document.createElement('button');
                    favoriteButton.textContent = '★ Favorite';
                    mealDetail.appendChild(favoriteButton);

                    const instructionsTitle = document.createElement('h1');
                    instructionsTitle.textContent = 'Instructions';
                    mealDetail.appendChild(instructionsTitle);

                    const instructions = document.createElement('div');
                    instructions.textContent = strInstructions;
                    mealDetail.appendChild(instructions);

                    // Display ingredients
                    const ingredientsTitle = document.createElement('h1');
                    ingredientsTitle.textContent = 'Ingredients';
                    mealDetail.appendChild(ingredientsTitle);

                    for (let i = 1; i <= 20; i++) {
                        const ingredient = data.meals[0][`strIngredient${i}`];
                        const measure = data.meals[0][`strMeasure${i}`];
                        if (ingredient) {
                            const ingredientItem = document.createElement('p');
                            ingredientItem.textContent = `${ingredient}: ${measure}`;
                            mealDetail.appendChild(ingredientItem);
                        }
                    }

                    // Handle favorite functionality
                    favoriteButton.addEventListener('click', () => {
                        const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
                        if (!loggedInUserEmail) {
                            alert('You need to log in to favorite a recipe.');
                            return;
                        }

                        const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
                        let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

                        // Check if recipe is already in favorites
                        const isFavorite = favoriteRecipes.some(recipe => recipe.idMeal === idMeal);

                        if (isFavorite) {
                            // Remove from favorites
                            favoriteRecipes = favoriteRecipes.filter(recipe => recipe.idMeal !== idMeal);
                            favoriteButton.textContent = '★ Favorite';
                        } else {
                            // Add to favorites
                            favoriteRecipes.push({ idMeal, name: strMeal });
                            favoriteButton.textContent = '★ Unfavorite';
                        }

                        // Save updated favorites to localStorage
                        localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
                    });

                    // Check if the meal is already a favorite and update button text accordingly
                    const favoriteRecipesKey = `user_${sessionStorage.getItem('loggedInUser')}_favorites`;
                    const favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];
                    const isFavorite = favoriteRecipes.some(recipe => recipe.idMeal === idMeal);
                    if (isFavorite) {
                        favoriteButton.textContent = '★ Unfavorite';
                    }
                } else {
                    mealDetail.textContent = 'Meal details not found.';
                }
            })
            .catch(error => {
                console.error('Error fetching meal details: ', error);
                mealDetail.textContent = 'Failed to fetch meal details.';
            });
    }
});