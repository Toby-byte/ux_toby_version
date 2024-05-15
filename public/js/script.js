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
    const signupForm = document.querySelector('#signup-form');
    const loginForm = document.querySelector('#login-form');

    if (signupForm) {
        // Code for signup form
        const passwordError = document.querySelector('#password-error');

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(signupForm);
            const email = formData.get('email');
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm-password');

            // Validate email format
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Validate password match
            if (password !== confirmPassword) {
                passwordError.textContent = 'Passwords do not match.';
                return;
            }

            // Validate password strength
            if (!isValidPassword(password)) {
                passwordError.textContent = 'Password must be between 8 and 20 characters, and contain lowercase and uppercase letters, numbers, and special characters.';
                return;
            }

            passwordError.textContent = '';

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert('Signup successful!');
                // Redirect or do something else
            } else {
                alert('Signup failed!');
            }
        });

        function isValidEmail(email) {
            // Regular expression for validating email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPassword(password) {
            // Regular expression for validating password strength
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
            return passwordRegex.test(password);
        }
    }

    if (loginForm) {
        // Code for login form

        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(loginForm);
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch('http://localhost:3000/users');
            const users = await response.json();

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Login successful!');
                
                // Store logged-in user's email in sessionStorage
                sessionStorage.setItem('loggedInUser', email);
                
                // Redirect or do something else
                window.location.href = "index.html";
            } else {
                alert('Invalid email or password!');
            }
        });
    }
});


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
        const loginLink = document.createElement('a');
        loginLink.href = 'login.html';
        loginLink.textContent = 'Login';
        navbar.appendChild(loginLink);

        const signupLink = document.createElement('a');
        signupLink.href = 'signup.html';
        signupLink.textContent = 'Signup';
        navbar.appendChild(signupLink);
    }
});


