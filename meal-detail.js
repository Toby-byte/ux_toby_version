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

                    const img = document.createElement('img');
                    img.src = strMealThumb;
                    mealDetail.appendChild(img);

                    const mealName = document.createElement('h1');
                    mealName.textContent = strMeal;
                    mealDetail.appendChild(mealName);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${strCategory}`;
                    mealDetail.appendChild(category);

                    const Instructions_h1 = document.createElement('H1');
                    Instructions_h1.textContent = 'Instructions';
                    mealDetail.appendChild(Instructions_h1);

                    const Instructions = document.createElement('div');
                    Instructions.textContent = `${strInstructions}`;
                    mealDetail.appendChild(Instructions);

                    const h1 = document.createElement('H1');
                    h1.textContent = 'Ingredients';
                    mealDetail.appendChild(h1);

                    const Ingredient1 = document.createElement('p');
                    Ingredient1.textContent = `${strIngredient1}: ${strMeasure1}`;
                    mealDetail.appendChild(Ingredient1);

                    const Ingredient2 = document.createElement('p');
                    Ingredient2.textContent = `${strIngredient2}: ${strMeasure2}`;
                    mealDetail.appendChild(Ingredient2);
                    
                    const Ingredient3 = document.createElement('p');
                    Ingredient3.textContent = `${strIngredient3}: ${strMeasure3}`;
                    mealDetail.appendChild(Ingredient3);
                    
                    const Ingredient4 = document.createElement('p');
                    Ingredient4.textContent = `${strIngredient4}: ${strMeasure4}`;
                    mealDetail.appendChild(Ingredient4);
                    
                    const Ingredient5 = document.createElement('p');
                    Ingredient5.textContent = `${strIngredient5}: ${strMeasure5}`;
                    mealDetail.appendChild(Ingredient5);
                    
                    const Ingredient6 = document.createElement('p');
                    Ingredient6.textContent = `${strIngredient6}: ${strMeasure6}`;
                    mealDetail.appendChild(Ingredient6);
                    
                    const Ingredient7 = document.createElement('p');
                    Ingredient7.textContent = `${strIngredient7}: ${strMeasure7}`;
                    mealDetail.appendChild(Ingredient7);

                    const Ingredient8 = document.createElement('p');
                    Ingredient8.textContent = `${strIngredient8}: ${strMeasure8}`;
                    mealDetail.appendChild(Ingredient8);
                    
                    const Ingredient9 = document.createElement('p');
                    Ingredient9.textContent = `${strIngredient9}: ${strMeasure9}`;
                    mealDetail.appendChild(Ingredient9);

                    const Ingredient10 = document.createElement('p');
                    Ingredient10.textContent = `${strIngredient10}: ${strMeasure10}`;
                    mealDetail.appendChild(Ingredient10);

                    const Ingredient11 = document.createElement('p');
                    Ingredient11.textContent = `${strIngredient11}: ${strMeasure11}`;
                    mealDetail.appendChild(Ingredient11);

                    const Ingredient12 = document.createElement('p');
                    Ingredient12.textContent = `${strIngredient12}: ${strMeasure12}`;
                    mealDetail.appendChild(Ingredient12);

                    const Ingredient13 = document.createElement('p');
                    Ingredient13.textContent = `${strIngredient13}: ${strMeasure13}`;
                    mealDetail.appendChild(Ingredient13);

                    const Ingredient14 = document.createElement('p');
                    Ingredient14.textContent = `${strIngredient14}: ${strMeasure14}`;
                    mealDetail.appendChild(Ingredient14);
                    
                    const Ingredient15 = document.createElement('p');
                    Ingredient15.textContent = `${strIngredient15}: ${strMeasure15}`;
                    mealDetail.appendChild(Ingredient15);

                    const Ingredient16 = document.createElement('p');
                    Ingredient16.textContent = `${strIngredient16}: ${strMeasure16}`;
                    mealDetail.appendChild(Ingredient16);

                    const Ingredient17 = document.createElement('p');
                    Ingredient17.textContent = `${strIngredient17}: ${strMeasure17}`;
                    mealDetail.appendChild(Ingredient17);
                    
                    const Ingredient18 = document.createElement('p');
                    Ingredient18.textContent = `${strIngredient18}: ${strMeasure18}`;
                    mealDetail.appendChild(Ingredient18);

                    const Ingredient19 = document.createElement('p');
                    Ingredient19.textContent = `${strIngredient19}: ${strMeasure19}`;
                    mealDetail.appendChild(Ingredient19);
                    
                    const Ingredient20 = document.createElement('p');
                    Ingredient20.textContent = `${strIngredient20}: ${strMeasure20}`;
                    mealDetail.appendChild(Ingredient20);

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