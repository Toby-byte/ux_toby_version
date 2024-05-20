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
                    const { strMealThumb, strMeal, strCategory, strInstructions, 
                        strIngredient1, strIngredient2, strIngredient3,
                        strIngredient4, strIngredient5, strIngredient6,
                        strIngredient7, strIngredient8, strIngredient9,
                        strIngredient10, strIngredient11, strIngredient12,
                        strIngredient13, strIngredient14, strIngredient15, 
                        strIngredient16, strIngredient17, strIngredient18,
                        strIngredient19, strIngredient20,
                        strMeasure1, strMeasure2, strMeasure3, 
                        strMeasure4, strMeasure5, strMeasure6, 
                        strMeasure7, strMeasure8, strMeasure9, 
                        strMeasure10, strMeasure11, strMeasure12, 
                        strMeasure13, strMeasure14, strMeasure15,  
                        strMeasure16, strMeasure17, strMeasure18, 
                        strMeasure19, strMeasure20,  } = data.meals[0];

                    const img_name_div = document.createElement('div');
                    
                    const img = document.createElement('img');
                    img.src = strMealThumb;
                    img_name_div.appendChild(img);
                    // mealDetail.appendChild(img);

                    const mealName = document.createElement('h1');
                    mealName.textContent = strMeal;
                    img_name_div.appendChild(mealName);
                    // mealDetail.appendChild(mealName);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${strCategory}`;
                    img_name_div.appendChild(category);
                    mealDetail.appendChild(img_name_div);

                    // Create and append the Instructions section
                    const instructionsDiv = document.createElement('div');

                    const instructionsHeading = document.createElement('h1');
                    instructionsHeading.textContent = 'Instructions';
                    instructionsDiv.appendChild(instructionsHeading);

                    const sentences = strInstructions.split(/(?<=[.!?])\s+/).filter(sentence => sentence.trim().length > 0);
                    const ol = document.createElement('ol');
                    sentences.forEach(sentence => {
                        const li = document.createElement('li');
                        li.textContent = sentence.trim();
                        ol.appendChild(li);
                    });

                    instructionsDiv.appendChild(ol);
                    mealDetail.appendChild(instructionsDiv);

                    // Create and append the Ingredients section
                    const ingredientsDiv = document.createElement('div');

                    const ingredientsHeading = document.createElement('h1');
                    ingredientsHeading.textContent = 'Ingredients';
                    ingredientsDiv.appendChild(ingredientsHeading);

                    const ingredients = [
                        { name: strIngredient1, measure: strMeasure1 },
                        { name: strIngredient2, measure: strMeasure2 },
                        { name: strIngredient3, measure: strMeasure3 },
                        { name: strIngredient4, measure: strMeasure4 },
                        { name: strIngredient5, measure: strMeasure5 },
                        { name: strIngredient6, measure: strMeasure6 },
                        { name: strIngredient7, measure: strMeasure7 },
                        { name: strIngredient8, measure: strMeasure8 },
                        { name: strIngredient9, measure: strMeasure9 },
                        { name: strIngredient10, measure: strMeasure10 },
                        { name: strIngredient11, measure: strMeasure11 },
                        { name: strIngredient12, measure: strMeasure12 },
                        { name: strIngredient13, measure: strMeasure13 },
                        { name: strIngredient14, measure: strMeasure14 },
                        { name: strIngredient15, measure: strMeasure15 },
                        { name: strIngredient16, measure: strMeasure16 },
                        { name: strIngredient17, measure: strMeasure17 },
                        { name: strIngredient18, measure: strMeasure18 },
                        { name: strIngredient19, measure: strMeasure19 },
                        { name: strIngredient20, measure: strMeasure20 }
                    ];

                    ingredients.forEach(ingredient => {
                        if (ingredient.name.trim() && ingredient.measure.trim()) {
                            const li = document.createElement('li');
                            li.textContent = `${ingredient.name}: ${ingredient.measure}`;
                            ingredientsDiv.appendChild(li);
                        }
                    });

                    mealDetail.appendChild(ingredientsDiv);
                    const ingredients_instructions_div = document.createElement('div');
                    ingredients_instructions_div.appendChild(ingredientsDiv);
                    ingredients_instructions_div.appendChild(instructionsDiv);
                    mealDetail.appendChild(ingredients_instructions_div);
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