makeCategories('https://www.themealdb.com/api/json/v1/1/categories.php');

function makeCategories(url) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            if (data.categories && data.categories.length > 0) {
                // Create the <select> element
                const select = document.createElement('select');
                select.id = 'categorySelect';
                select.setAttribute('aria-label', 'Category Select');

                // Fill the <select> element with <option> elements from the api via a for each loop
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.strCategory;
                    option.textContent = category.strCategory;
                    select.appendChild(option);
                });

                // Create the <button> element
                const button = document.createElement('button');
                button.id = 'categoryButton';
                button.setAttribute('aria-label', 'Category Button');
                button.textContent = 'Search';

                // Append the <select> and <button> elements to the section
                const searchDiv = document.getElementById('search_div');
                searchDiv.appendChild(select);
                searchDiv.appendChild(button);

                // Call showCategoryItems after elements are added to the DOM
                showCategoryItems();
            } else {
                console.log('No meals found');
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function showCategoryItems() {
    document.getElementById("categoryButton").addEventListener("click", function () {
        const mealInput = document.getElementById("categorySelect").value;
        console.log(mealInput);
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealInput}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const mealArray = data.meals;
                // Check if any recipes are found, if not display 'No meals found.'
                if (!mealArray) {
                    document.getElementById("mealDisplay").textContent = "No meals found.";
                    return; // Stop further execution if no meals
                }

                // Create the structure of the recipe element
                const ul = document.createElement("ul");
                ul.className = "grid-container"; // Add the grid container class
                document.getElementById("mealDisplay").innerHTML = ""; // Clear previous results
                document.getElementById("mealDisplay").appendChild(ul);

                // Grid column pattern design for search results
                const gridColumns = [
                    "1 / 4",
                    "4 / 6",
                    "6 / 10",
                    "1 / 3",
                    "3 / 6",
                    "6 / 10",
                    "1 / 3",
                    "3 / 5",
                    "5 / 10",
                ];

                // Function that creates an li element with content from recipes
                function createListItem(index, meal) {
                    const li = document.createElement("li");
                    li.className = "grid-item";
                    li.style.gridColumn = gridColumns[(index - 1) % gridColumns.length]; // Set grid column dynamically for search design
                    li.style.backgroundImage = `url(${meal.strMealThumb})`; // Set background image from mealDB API
                    li.setAttribute("aria-label", meal.strMeal); // Add aria-label for accessibility with name of meal

                    const button = document.createElement("button");
                    button.textContent = "Click here to see details";

                    button.addEventListener("click", function () {
                        window.location.href = `meal-detail.html?id=${meal.idMeal}`;
                    });

                    const h1 = document.createElement("h2");
                    h1.textContent = meal.strMeal;
                    li.appendChild(h1);

                    li.appendChild(button);

                    return li;
                }

                // Create and append list items
                mealArray.forEach((meal, index) => {
                    const li = createListItem(index + 1, meal);
                    ul.appendChild(li);
                });
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                document.getElementById("mealDisplay").textContent = "Failed to fetch meal data.";
            });
    });
}