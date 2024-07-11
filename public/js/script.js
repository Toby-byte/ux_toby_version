function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
}
function hideSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "none";
}

const navbar = document.querySelector("#navbar");
const sidebar = document.querySelector(".sidebar");

// Check if the user is logged in
const loggedInUser = sessionStorage.getItem("loggedInUser");
if (loggedInUser) {
  // If logged in, display logout button and profile link
  const logoutListItem = document.createElement("li");
  const logoutButton = document.createElement("a");

  const logoutSVG = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
    </svg>`;
  logoutSVG.alt = "logout";

  logoutButton.innerHTML = logoutSVG;
  logoutButton.textContent = "Logout";
  navbar.appendChild(logoutListItem);
  logoutListItem.appendChild(logoutButton);

  logoutButton.addEventListener("click", () => {
    // Remove logged-in user's email from sessionStorage
    sessionStorage.removeItem("loggedInUser");
    // Redirect or do something else
    window.location.href = "logout.html";
  });

  const mobileLogoutListItem = document.createElement("li");
  const mobileLogoutButton = document.createElement("a");
  mobileLogoutButton.textContent = "logout";

  sidebar.appendChild(mobileLogoutListItem);
  mobileLogoutListItem.appendChild(mobileLogoutButton);

  mobileLogoutButton.addEventListener("click", () => {
    // Remove logged-in user's email from sessionStorage
    sessionStorage.removeItem("loggedInUser");
    // Redirect or do something else
    window.location.href = "logout.html";
  });

  const profileListItem = document.createElement("li");
  const profileLink = document.createElement("a");
  profileLink.href = "profile.html"; // Link to profile page

  const profileSVG = `<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
    </svg>`;
  profileSVG.alt = "Profile";

  profileLink.innerHTML = profileSVG;
  profileLink.textContent = "Profile";
  navbar.appendChild(profileListItem);
  profileListItem.appendChild(profileLink);

  const mobileProfileListItem = document.createElement("li");
  const mobileProfileLink = document.createElement("a");
  mobileProfileLink.href = "profile.html";
  mobileProfileLink.textContent = "Profile";

  sidebar.appendChild(mobileProfileListItem);
  mobileProfileListItem.appendChild(mobileProfileLink);
} else {
  // If not logged in, display login and signup links
  const loginListItem = document.createElement("li");
  const loginLink = document.createElement("a");
  loginLink.href = "login.html";
  loginListItem.classList.add("hideOnMobile");

  const loginSVG = `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
        <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
    </svg>`;
  loginSVG.alt = "Login";
  loginLink.setAttribute("tabindex", "7");
  loginLink.setAttribute("aria-label", "Login");
  loginLink.innerHTML = loginSVG;
  // this is where we changed an icon into text
  loginLink.textContent = "Login";
  loginListItem.appendChild(loginLink);
  navbar.appendChild(loginListItem);

  const mobileLoginListItem = document.createElement("li");
  const mobileLoginLink = document.createElement("a");
  mobileLoginLink.href = "login.html";
  mobileLoginLink.textContent = "Login";

  sidebar.appendChild(mobileLoginListItem);
  mobileLoginListItem.appendChild(mobileLoginLink);

  const signupListItem = document.createElement("li");
  const signupLink = document.createElement("a");
  signupLink.href = "signup.html";
  signupListItem.classList.add("hideOnMobile");

  const signupSVG = `
    <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM504 312V248H440c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V136c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H552v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/>
    </svg>`;
  signupSVG.alt = "Signup";
  signupLink.setAttribute("tabindex", "8");
  signupLink.setAttribute("aria-label", "Signup");
  signupLink.innerHTML = signupSVG;
  signupLink.textContent = "Signup";
  signupListItem.appendChild(signupLink);
  navbar.appendChild(signupListItem);

  const mobileSignupListItem = document.createElement("li");
  const mobileSignupLink = document.createElement("a");
  mobileSignupLink.href = "signup.html";
  mobileSignupLink.textContent = "Signup";

  sidebar.appendChild(mobileSignupListItem);
  mobileSignupListItem.appendChild(mobileSignupLink);
}