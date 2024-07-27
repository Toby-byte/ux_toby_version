setupSidebarToggle();
setupNavbar();

// sets up the toggle functionality in mobile view
function setupSidebarToggle() {
  const showSidebarButton = document.getElementById("show_sidebar");
  const hideSidebarButton = document.getElementById("hide_sidebar");
  const sidebar = document.querySelector(".sidebar");

  // Event listener to show the sidebar in mobile view
  showSidebarButton.addEventListener("click", () => {
    sidebar.style.display = "flex";
  });

  // Event listener to hide the sidebar in mobile view
  hideSidebarButton.addEventListener("click", () => {
    sidebar.style.display = "none";
  });
}
// set up the navbar based on the user's login status
function setupNavbar() {
  const navbar = document.querySelector("#navbar");
  const sidebar = document.querySelector(".sidebar");
  const loggedInUser = sessionStorage.getItem("loggedInUser");

  if (loggedInUser) {
    // If user is logged in, add logout and profile in navbar and sidebar
    addNavbarItem(navbar, "Logout", "logout.html", handleLogout);
    addNavbarItem(sidebar, "Logout", "logout.html", handleLogout);
    addNavbarItem(navbar, "Profile", "profile.html");
    addNavbarItem(sidebar, "Profile", "profile.html");
  } else {
    // If user is logged out, add logout and profile in navbar and sidebar
    addNavbarItem(navbar, "Login", "login.html");
    addNavbarItem(sidebar, "Login", "login.html");
    addNavbarItem(navbar, "Signup", "signup.html");
    addNavbarItem(sidebar, "Signup", "signup.html");
  }
}

// Function to add an item to the navbar or sidebar
function addNavbarItem(container, text, href, clickHandler) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  link.setAttribute("tabindex", "0");
  link.setAttribute("aria-label", text);

  if (clickHandler) {
    link.addEventListener("click", clickHandler);
  }

  listItem.appendChild(link);
  container.appendChild(listItem);
}
// function that logges user out
function handleLogout(event) {
  event.preventDefault(); // Prevent the default link behavior, by not navigating to logout.html
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "logout.html";
}