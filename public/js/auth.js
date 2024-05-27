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
        // email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password) {
        // password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordRegex.test(password);
    }
}

if (loginForm) {
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
            
            // Redirect 
            window.location.href = "index.html";
        } else {
            alert('Invalid email or password!');
        }
    });
}

// Function to check if the user is logged in
function checkLoggedIn() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    return loggedInUser !== null;
}

// Protect restricted pages
function protectPage() {
    const currentPage = window.location.pathname.split('/').pop();

    // Redirect to index.html if the user is not logged in and tries to access logout.html
    if (currentPage === 'logout.html' && !checkLoggedIn()) {
        window.location.href = 'index.html';
    }
}

// Check and protect the page on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    protectPage();
});

// Handle logout
const logoutButton = document.querySelector('#logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Remove loggedInUser from sessionStorage
        sessionStorage.removeItem('loggedInUser');
        
        // Redirect to home page (index.html)
        window.location.href = 'index.html';
    });
}
