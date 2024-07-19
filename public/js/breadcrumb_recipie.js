setTimeout(function () {
  const currentUrl = window.location.href;
  const recipieNameElement = document.getElementById("mealName");
  const element = document.getElementById("current_recipe");

  if (recipieNameElement && element) {
    const recipieName = recipieNameElement.textContent;
    element.href = currentUrl;
    element.textContent = recipieName;
    element.title = recipieName;
    console.log(recipieName); // This should log the text content of the h1 element
  } else {
    if (!recipieNameElement) {
      console.error("Element with ID 'mealName' not found");
    }
    if (!element) {
      console.error("Element with ID 'current_recipe' not found");
    }
  }
}, 500); // Delay time in milliseconds
