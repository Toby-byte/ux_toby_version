function handleSearchEvent(event) {
  // Check if the user clicks or if they press the Enter key
  if (event.type === "click" || (event.type === "keydown" && event.key === "Enter")) {
    const mealInput = document.getElementById("mealInput").value.trim();

    // if result is false, this function will activate and alert the user!
    if (!validateInput(mealInput)) {
      alert("Search field must not be empty");
      return;
    }

    // meals are fetched from the API and then displayed in a pattern
    fetchMeals(mealInput)
      .then(mealArray => displayMeals(mealArray))
      .catch(error => handleError(error))

  }
}

// returns true if input is valid (meaning input is not empty)
function validateInput(input) {
  return input !== "";
}

// Fetch meals from the API
function fetchMeals(mealInput) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`;
  return fetch(url)
      .then((response) => response.json())
      .then((data) => data.meals);
}

// Display the meals on the page
function displayMeals(mealArray) {
  // Check if any recipes are found, if not display 'No meals found.'
  const mealDisplay = document.getElementById("mealDisplay");
  mealDisplay.innerHTML = ""; // Clear previous results
  
  if (!mealArray) {
    mealDisplay.textContent = "No meals found."
    return;
  }

  // Create the structure of the recipe element
  const ul = document.createElement("ul");
  ul.className = "grid-container"; // Add the grid container class
  mealDisplay.appendChild(ul);

  // Create and append list items
  mealArray.forEach((meal, index) => {
    const li = createListItem(index, meal);
    ul.appendChild(li);
  });
}

// Create a list item for each meal
function createListItem(index, meal) {
  const li = document.createElement("li");
  li.className = "grid-item";
  li.style.gridColumn = getGridColumn(index)
  li.style.backgroundImage = `url(${meal.strMealThumb})`; // Set background image from mealDB API
  li.setAttribute("aria-label", meal.strMeal); // Add aria-label for accessibility with name of meal

  const h1 = document.createElement("h2");
  h1.textContent = meal.strMeal;
  li.appendChild(h1);
  
  const button = document.createElement("button");
  button.textContent = "Click here to see details";

  button.addEventListener("click", function () {
    window.location.href = `meal-detail.html?id=${meal.idMeal}`;
  });

  li.appendChild(button);

  return li;
}

// Get the grid column for the list item
function getGridColumn(index) {
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
  return gridColumns[index % gridColumns.length]; // Set grid column dynamically for search design
}

// Handle errors 
function handleError(error) {
  console.error("Error fetching data: ", error);
  document.getElementById("mealDisplay").textContent = "Failed to fetch meal data.";
}

// Add the event listeners that listen for keypress or click
document.getElementById("searchButton").addEventListener("click", handleSearchEvent);
document.getElementById("mealInput").addEventListener("keydown", handleSearchEvent);    