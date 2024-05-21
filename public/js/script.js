const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  
  fetch("www.themealdb.com/api/json/v1/1/categories.php", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));


 function showSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'flex'
    }
    function hideSidebar(){
      const sidebar = document.querySelector('.sidebar')
      sidebar.style.display = 'none'
    }




document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('#navbar');

    // Check if the user is logged in
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        // If logged in, display logout button and profile link
        const profileLink = document.createElement('a');
        profileLink.href = 'profile.html'; // Link to profile page
        profileLink.textContent = 'Profile';
        navbar.appendChild(profileLink);

        const logoutButton = document.createElement('a');
        logoutButton.textContent = 'Logout';
        logoutButton.addEventListener('click', () => {
            // Remove logged-in user's email from sessionStorage
            sessionStorage.removeItem('loggedInUser');
            // Redirect or do something else
            window.location.href = "logout.html"; // Assuming logout.html contains your logout logic
        });
        navbar.appendChild(logoutButton);
    } else {
        // If not logged in, display login and signup links
        const loginListItem = document.createElement('li');
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginListItem.classList.add("hideOnMobile");

        const loginSVG = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
        </svg>`;
        loginSVG.alt = 'Login';

        loginLink.innerHTML = loginSVG;
        loginListItem.appendChild(loginLink);
        navbar.appendChild(loginListItem);

        const signupListItem = document.createElement('li');
        const signupLink = document.createElement('a');
        signupLink.href = 'signup.html';
        signupListItem.classList.add("hideOnMobile");

        const signupSVG = `
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
        </svg>`;
        signupSVG.alt = 'Signup';

        signupLink.innerHTML = signupSVG;
        signupListItem.appendChild(signupLink);
        navbar.appendChild(signupListItem);
    }
});


