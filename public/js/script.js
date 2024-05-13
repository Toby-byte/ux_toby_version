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



    // Sign up // 
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
                // Redirect or do something else
            } else {
                alert('Invalid email or password!');
            }
        });
    }
});