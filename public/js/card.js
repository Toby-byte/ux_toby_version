document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            const mealImageUrl = meal.strMealThumb;
            
            // Get the card element
            const card = document.querySelector('.card');
            
            // Set the background image of the card
            card.style.backgroundImage = `url(${mealImageUrl})`;
            
            // Optionally, update the title and body with meal name and instructions
            const cardTitle = card.querySelector('.card-title');
            const cardBody = card.querySelector('.card-body');
            
            cardTitle.textContent = meal.strMeal;
            cardBody.textContent = meal.strInstructions.substring(0, 100) + '...'; // Limiting to 100 characters
        })
        .catch(error => console.error('Error fetching meal:', error));
});
