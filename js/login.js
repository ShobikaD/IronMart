function togglePassword() {
  const passwordField = document.getElementById("login-password");
  const icon = document.querySelector(".toggle-password");
  if (passwordField.type === "password") {
    passwordField.type = "text";
    icon.classList.remove("fa-eye");
    icon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    icon.classList.remove("fa-eye-slash");
    icon.classList.add("fa-eye");
  }
}

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const loginButton = document.querySelector('.auth-btn');
  const messageDiv = document.getElementById('form-message');

  messageDiv.style.display = 'none';
  emailInput.classList.remove('error');
  passwordInput.classList.remove('error');

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const users = JSON.parse(localStorage.getItem("users")) || [];

  loginButton.disabled = true;
  loginButton.textContent = 'Logging in...';

  setTimeout(() => {
    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(validUser));
      messageDiv.textContent = '✅ Login successful! Redirecting...';
      messageDiv.className = 'success';
      messageDiv.style.display = 'block';

      setTimeout(() => {
        const redirectTo = localStorage.getItem("redirectAfterLogin");
        if (redirectTo === "offers") {
          localStorage.removeItem("redirectAfterLogin");
          window.location.href = "offers.html";
        } else {
          window.location.href = "profile.html";
        }
      }, 1500);

    } else {
      messageDiv.textContent = '❌ Invalid email or password.';
      messageDiv.className = 'error';
      messageDiv.style.display = 'block';
      
      emailInput.classList.add('error');
      passwordInput.classList.add('error');
      loginButton.disabled = false;
      loginButton.textContent = 'Login';
    }
  }, 500); 
});

