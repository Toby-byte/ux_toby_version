function handleSearchEvent(event) {
    // Check if the user clicks or if they press the Enter key
    if (event.type === 'click' || (event.type === 'keydown' && event.key === 'Enter')) {
        const mealInput = document.getElementById('mealInput').value;
        console.log(mealInput);

        if (mealInput === "") {
            alert("Search field must not be empty");
            return;
        }

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const mealArray = data.meals;
                // Check if any recipes are found, if not display 'No meals found.'
                if (!mealArray) {
                    document.getElementById('mealDisplay').textContent = 'No meals found.';
                    return;
                }

                // Create the structure of the recipe element
                const ul = document.createElement('ul');
                ul.className = 'grid-container'; // Add the grid container class
                document.getElementById('mealDisplay').innerHTML = ''; // Clear previous results
                document.getElementById('mealDisplay').appendChild(ul);

                // Grid column pattern design for search results
                const gridColumns = [
                    '1 / 4', '4 / 6', '6 / 10',
                    '1 / 3', '3 / 6', '6 / 10',
                    '1 / 3', '3 / 5', '5 / 10'
                ];

                // function that helps create an li element with content from recipes
                function createListItem(index, meal) {
                    const li = document.createElement('li');
                    li.className = 'grid-item';
                    // i have no idea why i added a -1 one here? it is not needed
                    li.style.gridColumn = gridColumns[(index - 1) % gridColumns.length]; // Set grid column dynamically for search design
                    li.setAttribute('grid-column', gridColumns[(index -1) % gridColumns.length]);
                    li.style.backgroundImage = `url(${meal.strMealThumb})`; // Set background image from mealDB API
                    li.setAttribute('aria-label', meal.strMeal); // Add aria-label for accessibility with name of meal
                    
                    const button = document.createElement('button');
                    button.textContent = "Click here to see details";

                    button.addEventListener('click', function() {
                        window.location.href = `meal-detail.html?id=${meal.idMeal}`;
                    });

                    const h1 = document.createElement('h2');
                    h1.textContent = meal.strMeal;
                    li.appendChild(h1);

                    li.appendChild(button);

                    return li;
                }

                // Create and append list items
                mealArray.forEach((meal, index) => {
                    // same story for this, no need for + 1
                    const li = createListItem(index + 1, meal);
                    ul.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                document.getElementById('mealDisplay').textContent = 'Failed to fetch meal data.';
            });
    }
}

// Add the event listeners that listen for keypress or click
document.getElementById('searchButton').addEventListener('click', handleSearchEvent);
document.getElementById('mealInput').addEventListener('keydown', handleSearchEvent);