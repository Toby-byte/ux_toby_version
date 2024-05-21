document.addEventListener('DOMContentLoaded', function() {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const mealArray = data.meals;
            // Check if meals are found
            if (!mealArray) {
                document.getElementById('mealDisplay').textContent = 'No meals found.';
                return; // Stop further execution if no meals
            }

            // Create the main structure
            const ul = document.createElement('ul');
            ul.className = 'grid-container'; // Add the grid container class
            document.getElementById('mealDisplay').innerHTML = ''; // Clear previous results
            document.getElementById('mealDisplay').appendChild(ul);

            // Grid column pattern
            const gridColumns = [
                '1 / 4', '4 / 6', '6 / 10',
                '1 / 3', '3 / 6', '6 / 10',
                '1 / 3', '3 / 5', '5 / 10'
            ];

            // Helper function to create an li element with content
            function createListItem(index, meal) {
                const li = document.createElement('li');
                li.className = 'grid-item'; // Use a general class for styling
                li.style.gridColumn = gridColumns[(index - 1) % gridColumns.length]; // Set grid column dynamically
                li.style.backgroundImage = `url(${meal.strMealThumb})`; // Set background image from API
                li.setAttribute('aria-label', meal.strMeal); // Add aria-label for accessibility
                
                const h1 = document.createElement('h2');
                h1.textContent = meal.strMeal;
                li.appendChild(h1);

                const button = document.createElement('button');
                button.textContent = "Click here to see details";
                button.addEventListener('click', function() {
                    window.location.href = `meal-detail.html?id=${meal.idMeal}`;
                });
                li.appendChild(button);

                const favoriteButton = document.createElement('button');
                favoriteButton.textContent = '★ Favorite';
                favoriteButton.addEventListener('click', function() {
                    addToFavorites(meal);
                    favoriteButton.textContent = '✓ Favorited';
                });
                li.appendChild(favoriteButton);

                return li;
            }

            // Create and append list items
            mealArray.forEach((meal, index) => {
                const li = createListItem(index + 1, meal);
                ul.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            document.getElementById('mealDisplay').textContent = 'Failed to fetch meal data.';
        });

    function addToFavorites(meal) {
        const loggedInUserEmail = sessionStorage.getItem('loggedInUser');
        if (!loggedInUserEmail) {
            alert('You must be logged in to add favorites.');
            return;
        }

        const favoriteRecipesKey = `user_${loggedInUserEmail}_favorites`;
        const favoriteRecipes = JSON.parse(localStorage.getItem(favoriteRecipesKey)) || [];

        // Check if the recipe is already in favorites
        if (!favoriteRecipes.some(fav => fav.id === meal.idMeal)) {
            favoriteRecipes.push({ id: meal.idMeal, name: meal.strMeal });
            localStorage.setItem(favoriteRecipesKey, JSON.stringify(favoriteRecipes));
            alert(`${meal.strMeal} has been added to your favorites!`);
        } else {
            alert(`${meal.strMeal} is already in your favorites.`);
        }
    }
});