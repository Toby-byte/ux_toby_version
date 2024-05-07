document.getElementById('searchButton').addEventListener('click', function() {
    const mealInput = document.getElementById('mealInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const mealDisplay = document.getElementById('mealDisplay');
            mealDisplay.innerHTML = '';

            if (data.meals) {
                data.meals.forEach(meal => {
                    const { strMealThumb, strMeal, strCategory, idMeal } = meal;

                    const link = document.createElement('a');
                    link.href = `meal-detail.html?id=${idMeal}`; // Assuming 'meal-detail.html' is your detail page
                    link.className = 'meal-link';
                    
                    const mealContainer = document.createElement('div');
                    mealContainer.className = 'meal-container';

                    const img = document.createElement('img');
                    img.src = strMealThumb;
                    mealContainer.appendChild(img);

                    const mealName = document.createElement('h1');
                    mealName.textContent = strMeal;
                    mealContainer.appendChild(mealName);

                    const category = document.createElement('p');
                    category.textContent = `Category: ${strCategory}`;
                    mealContainer.appendChild(category);

                    link.appendChild(mealContainer);
                    mealDisplay.appendChild(link);
                });
            } else {
                mealDisplay.textContent = 'No meals found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            mealDisplay.textContent = 'Failed to fetch meal data.';
        });
});