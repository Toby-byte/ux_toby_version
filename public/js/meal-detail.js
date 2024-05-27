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
                    const meal = data.meals[0];
                    const { strMealThumb, strMeal, strCategory, strInstructions, idMeal } = meal;

                    const img_name_div = document.createElement('div');
                    
                    const img = document.createElement('img');
                    img.src = strMealThumb;
                    img_name_div.appendChild(img);

                    const mealName = document.createElement('h1');
                    mealName.textContent = strMeal;
                    img_name_div.appendChild(mealName);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${strCategory}`;
                    img_name_div.appendChild(category);

                    mealDetail.appendChild(img_name_div);

                    // Create and append the Instructions section
                    const instructionsDiv = document.createElement('div');

                    const instructionsHeading = document.createElement('h1');
                    instructionsHeading.textContent = 'Instructions';
                    instructionsDiv.appendChild(instructionsHeading);

                    const formattedInstructions = formatInstructions(strInstructions);
                    const ol = document.createElement('ol');
                    formattedInstructions.forEach(step => {
                        const li = document.createElement('li');
                        li.textContent = step;
                        ol.appendChild(li);
                    });

                    instructionsDiv.appendChild(ol);

                    // Create and append the Ingredients section
                    const ingredientsDiv = document.createElement('div');

                    const ingredientsHeading = document.createElement('h1');
                    ingredientsHeading.textContent = 'Ingredients';
                    ingredientsDiv.appendChild(ingredientsHeading);

                    for (let i = 1; i <= 20; i++) {
                        const ingredient = meal[`strIngredient${i}`];
                        const measure = meal[`strMeasure${i}`];
                        if (ingredient && measure) {
                            const li = document.createElement('li');
                            li.textContent = `${ingredient}: ${measure}`;
                            ingredientsDiv.appendChild(li);
                        }
                    }

                    const ingredients_instructions_div = document.createElement('div');
                    ingredients_instructions_div.appendChild(ingredientsDiv);
                    ingredients_instructions_div.appendChild(instructionsDiv);
                    mealDetail.appendChild(ingredients_instructions_div);

                    // Add favorite button
                    const favoriteButton = document.createElement('button');
                    favoriteButton.className = 'FavoriteButton';
                    const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
                    const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
                    let favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

                    const isFavorite = favoriteRecipes.some(r => r.idMeal === meal.idMeal);
                    favoriteButton.textContent = isFavorite ? '☆ Unfavorite' : '★ Favorite';
                    mealDetail.appendChild(favoriteButton);

                    favoriteButton.addEventListener('click', () => {
                        if (!loggedInUserEmail) {
                            alert('You must be logged in to favorite recipes.');
                            return;
                        }

                        if (isFavorite) {
                            // Remove from favorites
                            favoriteRecipes = favoriteRecipes.filter(r => r.idMeal !== meal.idMeal);
                            favoriteButton.textContent = '★ Favorite';
                            alert('Recipe removed from favorites!');
                        } else {
                            // Add to favorites
                            favoriteRecipes.push({ idMeal: meal.idMeal, name: meal.strMeal });
                            favoriteButton.textContent = '☆ Unfavorite';
                            alert('Recipe added to favorites!');
                        }

                        localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
                    });
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

function formatInstructions(instructions) {
    // Remove nutrition facts if present
    const nutritionFactsRegex = /Nutrition Facts.*/i;
    instructions = instructions.replace(nutritionFactsRegex, '').trim();

    // Split the instructions on numbered steps or sentence boundaries
    const stepRegex = /\d+\.\s+/g;
    let steps = instructions.split(stepRegex);

    if (steps.length > 1) {
        // If splitting by numbered steps worked, return the steps
        return steps.map(step => step.trim()).filter(step => step.length > 0);
    } else {
        // Fallback to splitting by sentences
        return instructions.split(/(?<=[.!?])\s+/).map(sentence => sentence.trim()).filter(sentence => sentence.length > 0);
    }
}