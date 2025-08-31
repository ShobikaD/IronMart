function togglePassword(fieldId, icon) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.type = field.type === "password" ? "text" : "password";
    icon.classList.toggle("fa-eye");
    icon.classList.toggle("fa-eye-slash");
  }
}

document.getElementById("reg-password").addEventListener("input", function () {
  const strengthText = document.getElementById("password-strength");
  const val = this.value;
  if (val.length === 0) { strengthText.textContent = ''; strengthText.className = ''; } 
  else if (val.length < 6) { strengthText.textContent = 'Weak'; strengthText.className = 'strength-weak'; } 
  else if (val.length >= 8 && val.match(/[A-Z]/) && val.match(/\d/)) { strengthText.textContent = 'Strong'; strengthText.className = 'strength-strong'; } 
  else { strengthText.textContent = 'Medium'; strengthText.className = 'strength-medium'; }
});

document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector("#reg-name");
    const email = form.querySelector("#reg-email");
    const password = form.querySelector("#reg-password");
    const confirmPassword = form.querySelector("#confirm-password");
    const contact = form.querySelector("#reg-contact");
    const address = form.querySelector("#reg-address");
    const registerButton = form.querySelector('.auth-btn');
    const messageDiv = document.getElementById('form-message');
    const allInputs = [name, email, password, confirmPassword, contact, address];

    messageDiv.style.display = 'none';
    allInputs.forEach(input => input.classList.remove('error'));

    let errors = [];
    if (password.value !== confirmPassword.value) {
        errors.push("Passwords do not match.");
        password.classList.add('error');
        confirmPassword.classList.add('error');
    }
    if (!/^\d{10}$/.test(contact.value.trim())) {
        errors.push("Please enter a valid 10-digit contact number.");
        contact.classList.add('error');
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email.value.trim())) {
        errors.push("This email is already registered.");
        email.classList.add('error');
    }

    if (errors.length > 0) {
        messageDiv.textContent = `❌ ${errors.join(' ')}`;
        messageDiv.className = 'error';
        messageDiv.style.display = 'block';
        return;
    }

    registerButton.disabled = true;
    registerButton.textContent = 'Registering...';

    const newUser = {
        name: name.value.trim(),
        email: email.value.trim(),
        password: password.value, 
        contact: contact.value.trim(),
        address: address.value.trim()
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    messageDiv.textContent = '🎉 Registered successfully! Redirecting to login...';
    messageDiv.className = 'success';
    messageDiv.style.display = 'block';

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000); 
});
