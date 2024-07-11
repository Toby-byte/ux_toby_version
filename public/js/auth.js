const signupForm = document.querySelector('#signup-form');
const loginForm = document.querySelector('#login-form');

if (signupForm) {
    // signup form
    const passwordError = document.querySelector('#password-error');

    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(signupForm);
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');

    
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        
        if (password !== confirmPassword) {
            passwordError.textContent = 'Passwords do not match.';
            return;
        }

        
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

// Checks if user is logged in
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

protectPage();


//  Logout function
const logoutButton = document.querySelector('#logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        // Remove user from sessionStorage
        sessionStorage.removeItem('loggedInUser');
        
        // Redirect to home page 
        window.location.href = 'index.html';
    });
}
