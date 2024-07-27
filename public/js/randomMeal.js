// VERY IMPORTANT: adding https:// to the URL helps fetch understand that it should look for api on the internet
const url = "https://www.themealdb.com/api/json/v1/1/random.php";

makeRandomElements(".recipes-of-the-week", 1);

makeRandomElements(".cards", 8);

// TargetClass parameter was made so the function could be used on more than one section
// you can type a class and random element will be created there
function makeRandomElements(targetClass, amount) {
  for (let i = 0; i < amount; i++) {
    fetchRandomMeal()
      .then((meal) => {
        if (meal) {
          const card = createMealCard(meal);
          document.querySelector(targetClass).appendChild(card);
        } else {
          console.log("No meals found");
        }
      })
      .catch((error) => {
        console.error("Error fetching meal data:", error);
      });
  }
}

// fetches the random meal from the API
function fetchRandomMeal() {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (data.meals && data.meals.length > 0) {
        return data.meals[0];
      }
      console.log("random meal was not found")
    });
}

// Creates the card elements used on the frontpage
function createMealCard(meal) {
  const {idMeal, strMeal, strMealThumb} = meal
  
  // card sub elements are created and the classes and attributes set
  const article = document.createElement("article");
  article.classList.add("card1");
  // Set the background image dynamically with style (i don't know, how to do it better)
  article.style.backgroundImage = `url(${strMealThumb})`;

  const div = document.createElement("div");
  div.classList.add("card-content");
  
  const h2 = document.createElement("h2");
  h2.classList.add("card-title");
  h2.innerText = strMeal;
  
  const p = document.createElement("p");
  p.classList.add("card-body");
  p.innerText = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque";

  const a = document.createElement("a");
  a.classList.add("card-btn");
  a.setAttribute("href", `meal-detail.html?id=${idMeal}`);
  a.setAttribute("title", "see more");
  a.innerText = "More";

  // Append the elements to make the card element
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(a);
  article.appendChild(div);

  return article
}