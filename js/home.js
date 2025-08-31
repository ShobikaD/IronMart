// Hero Section Image Slider
    const heroSection = document.querySelector('.hero');
    const heroImages = [
      'Images/6.jpg',
      'Images/2.jpg',
      'Images/3.jpg',
      'Images/4.jpg'
    ];
    let currentIndex = 0;
    function changeHeroBackground() {
      heroSection.style.backgroundImage = `url('${heroImages[currentIndex]}')`;
      currentIndex = (currentIndex + 1) % heroImages.length;
    }
    changeHeroBackground();
    setInterval(changeHeroBackground, 3000);

// Contact Form
  document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("form-status");
  const submitButton = form.querySelector("button[type='submit']");
  const allInputs = form.querySelectorAll("input, textarea");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  form.addEventListener("submit", function(e) {
    e.preventDefault(); 
    let isValid = true;
    const name = form.querySelector("#name");
    const email = form.querySelector("#email");
    const message = form.querySelector("#message");

    if (name.value.trim() === "") {
      showError(name, "Name is required.");
      isValid = false;
    }
    if (email.value.trim() === "") {
      showError(email, "Email is required.");
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, "Please enter a valid email address.");
      isValid = false;
    }
    if (message.value.trim() === "") {
      showError(message, "Message is required.");
      isValid = false;
    }
    if (!isValid) {
      formStatus.textContent = "⚠️ Oops! Please check the fields highlighted above.";
      formStatus.className = "error";
      formStatus.style.display = "block";
      return;
    }
    const formData = new FormData(form);
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";
    formStatus.style.display = "none";
    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        formStatus.textContent = "✅ We're happy to hear from you and will get back to you shortly.";
        formStatus.className = "success";
        form.reset();
        setTimeout(() => { formStatus.style.display = "none"; }, 5000);
      } else {
        return response.json().then(data => {
          throw new Error(data.error || "Oops! Something went wrong.");
        });
      }
    })
    .catch(err => {
      formStatus.textContent = `⚠️ ${err.message}`;
      formStatus.className = "error";
    })
    .finally(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Send Message";
      formStatus.style.display = "block";
    });
  });

  function showError(inputElement, message) {
    inputElement.classList.add('error');
  }
  function resetErrors() {
    allInputs.forEach(input => {
      input.classList.remove('error');
    });
    formStatus.textContent = "";
    formStatus.style.display = "none";
  }
  allInputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) {
        input.classList.remove('error');
      }
    });
  });

});

// Search Bar
  const pages = [
  { name: "Treadmills", file: "treadmills.html" },
  { name: "Bikes", file: "bikes.html" },
  { name: "Dumbbells", file: "dumbbells.html" },
  { name: "Ellipticals", file: "ellipticals.html" },
  { name: "Home Gym", file: "home-gym.html" },
  { name: "Protein", file: "protein.html" },
  { name: "Weights Benches", file: "weights-benches.html" },
  { name: "Yoga", file: "yoga.html" }
];

const input = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const query = input.value.toLowerCase();
  suggestions.innerHTML = "";

  if (query.length === 0) return;

  const matched = pages.filter(p => p.name.toLowerCase().includes(query));

  matched.forEach(p => {
    const div = document.createElement("div");
    div.textContent = p.name;
    div.addEventListener("click", () => {
      window.location.href = p.file;
    });
    suggestions.appendChild(div);
  });
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const query = input.value.toLowerCase();
    const match = pages.find(p => p.name.toLowerCase().includes(query));
    if (match) {
      window.location.href = match.file;
    } else {
      alert("Sorry, the product you're looking for is not available.");
    }
  }
});

//Scroll Buttons
function scrollCategory(direction) {
    const container = document.getElementById("category-scroll");
    const scrollAmount = container.offsetWidth * 0.8; 
    container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
}

