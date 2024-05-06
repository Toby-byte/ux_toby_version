document.getElementById('searchButton').addEventListener('click', function() {
    const mealInput = document.getElementById('mealInput').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const mealDisplay = document.getElementById('mealDisplay');
            mealDisplay.innerHTML = ''; // Clear previous results

            if (data.meals) {
                const { strMealThumb, strMeal, strCategory } = data.meals[0];

                const img = document.createElement('img');
                img.src = strMealThumb;
                mealDisplay.appendChild(img);

                const mealName = document.createElement('h1');
                mealName.textContent = strMeal;
                mealDisplay.appendChild(mealName);

                const category = document.createElement('p');
                category.textContent = `Category: ${strCategory}`;
                mealDisplay.appendChild(category);
            } else {
                mealDisplay.textContent = 'No meals found.';
            }
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            mealDisplay.textContent = 'Failed to fetch meal data.';
        });
});