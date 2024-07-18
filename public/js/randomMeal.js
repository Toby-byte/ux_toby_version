// VERY IMPORTANT: adding https:// to the URL helps fetch understand that it should look for api on the internet
const url = 'https://www.themealdb.com/api/json/v1/1/random.php'; // Replace with your actual URL

makeRandomElement('.recipes-of-the-week')

for (let index = 0; index < 8; index++) {
    makeRandomElement('.cards')
}

// addToClass was made so the function could be used on more than one section
// you can type a class and random element will be created there  
function makeRandomElement(addToClass) {
    fetch(url)
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        if (data.meals && data.meals.length > 0) {
            const randomMealID = data.meals[0].idMeal;
            const randomMealTitle = data.meals[0].strMeal;
            const randomMealImage = data.meals[0].strMealThumb;

            // card elements are created
            const article = document.createElement('article');
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const a = document.createElement('a');

            // Set the classes and attributes for the card element
            article.classList.add('card1');
            div.classList.add('card-content');
            h2.classList.add('card-title');
            p.classList.add('card-body');
            a.classList.add('card-btn');
            a.setAttribute('href', `meal-detail.html?id=${randomMealID}`);
            a.setAttribute('title', 'see more');

            // Set the text for the element
            h2.innerText = randomMealTitle;
            p.innerText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque';
            a.innerText = 'More';

            // Set the background image dynamically with style (i don't know, how to do it better)
            article.style.backgroundImage = `url(${randomMealImage})`;

            // Append the elements to form the card element
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(a);
            article.appendChild(div);

            // append the article to the desired target class/id
            const section = document.querySelector(`${addToClass}`);
            section.appendChild(article);


        } else {
            console.log('No meals found');
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}