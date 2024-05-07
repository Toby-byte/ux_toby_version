const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("www.themealdb.com/api/json/v1/1/categories.php", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));