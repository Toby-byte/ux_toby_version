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
                        strIngredient13, strIngredient14 } = data.meals[0];

                    const img = document.createElement('img');
                    img.src = strMealThumb;
                    mealDetail.appendChild(img);

                    const mealName = document.createElement('h1');
                    mealName.textContent = strMeal;
                    mealDetail.appendChild(mealName);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${strCategory}`;
                    mealDetail.appendChild(category);

                    const Instructions = document.createElement('div');
                    Instructions.textContent = `Instructions: ${strInstructions}`;
                    mealDetail.appendChild(Instructions);

                    const h1 = document.createElement('H1');
                    h1.textContent = 'Ingredients';
                    mealDetail.appendChild(h1);

                    const Ingredient1 = document.createElement('p');
                    Ingredient1.textContent = `${strIngredient1}`;
                    mealDetail.appendChild(Ingredient1);

                    const Ingredient2 = document.createElement('p');
                    Ingredient2.textContent = `${strIngredient2}`;
                    mealDetail.appendChild(Ingredient2);
                    
                    const Ingredient3 = document.createElement('p');
                    Ingredient3.textContent = `${strIngredient3}`;
                    mealDetail.appendChild(Ingredient3);
                    
                    const Ingredient4 = document.createElement('p');
                    Ingredient4.textContent = `${strIngredient4}`;
                    mealDetail.appendChild(Ingredient4);
                    
                    const Ingredient5 = document.createElement('p');
                    Ingredient5.textContent = `${strIngredient5}`;
                    mealDetail.appendChild(Ingredient5);
                    
                    const Ingredient6 = document.createElement('p');
                    Ingredient6.textContent = `${strIngredient6}`;
                    mealDetail.appendChild(Ingredient6);
                    
                    const Ingredient7 = document.createElement('p');
                    Ingredient7.textContent = `${strIngredient7}`;
                    mealDetail.appendChild(Ingredient7);
                    
                    const Ingredient9 = document.createElement('p');
                    Ingredient9.textContent = `${strIngredient9}`;
                    mealDetail.appendChild(Ingredient9);

                    const Ingredient10 = document.createElement('p');
                    Ingredient10.textContent = `${strIngredient10}`;
                    mealDetail.appendChild(Ingredient10);

                    const Ingredient11 = document.createElement('p');
                    Ingredient11.textContent = `${strIngredient11}`;
                    mealDetail.appendChild(Ingredient11);

                    const Ingredient12 = document.createElement('p');
                    Ingredient12.textContent = `${strIngredient12}`;
                    mealDetail.appendChild(Ingredient12);

                    const Ingredient13 = document.createElement('p');
                    Ingredient13.textContent = `${strIngredient13}`;
                    mealDetail.appendChild(Ingredient13);

                    const Ingredient14 = document.createElement('p');
                    Ingredient14.textContent = `${strIngredient14}`;
                    mealDetail.appendChild(Ingredient14);

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