const signupForm = document.querySelector("#signup-form");
const loginForm = document.querySelector("#login-form");
const users_url = "http://localhost:3000/users";

if (signupForm) {
  const passwordError = document.querySelector("#password-error");
  
  signupForm.addEventListener("submit", handleSignup);

  async function handleSignup(e) {
    e.preventDefault();

    const { email, password, confirmPassword } = getFormData(signupForm);

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      passwordError.textContent = "Passwords do not match.";
      return;
    }

    if (!isValidPassword(password)) {
      passwordError.textContent = 
        "Password must be between 8 and 20 characters, and contain lowercase and uppercase letters, numbers, and special characters.";
      return;
    }

    passwordError.textContent = "";

    try {
      const response = await fetch(users_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Signup successful!");
      } else {
        throw new Error("Signup failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed due to a network error!");
    }
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", handleLogin);

  async function handleLogin(e) {
    e.preventDefault();

    const { email, password } = getFormData(loginForm);

    try {
      const response = await fetch(users_url);
      if (!response.ok) throw new Error("Network response was not ok");

      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        alert("Login successful!");
        sessionStorage.setItem("loggedInUser", email);
        window.location.href = "index.html";
      } else {
        alert("Invalid email or password!");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed due to a network error!");
    }
  }
}

const logoutButton = document.querySelector("#logout-button");
if (logoutButton) {
  logoutButton.addEventListener("click", handleLogout);
}

protectPage();


function getFormData(form) {
  const formData = new FormData(form);
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirm-password");
  return { email, password, confirmPassword };
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  return passwordRegex.test(password);
}

function checkLoggedIn() {
  return sessionStorage.getItem("loggedInUser") !== null;
}

function protectPage() {
  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "logout.html" && !checkLoggedIn()) {
    window.location.href = "index.html";
  }
}

function handleLogout() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}