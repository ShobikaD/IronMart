document.addEventListener('DOMContentLoaded', function () {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const buyNowButtons = document.querySelectorAll('.buy-now');
  const cartCounter = document.getElementById('cart-count');

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  let cart = [];

  if (user) {
    const cartKey = `cart-${user.email}`;
    cart = JSON.parse(localStorage.getItem(cartKey)) || [];
    if (cartCounter) cartCounter.textContent = cart.length;
  }

  addToCartButtons.forEach(button => {
    button.addEventListener('click', function () {
      if (!user) {
        alert("Please login to add items to cart.");
        window.location.href = 'login.html';
        return;
      }
      const card = this.closest('.product-card');
      const name = card.querySelector('h3').textContent;
      const price = card.querySelector('p').textContent.replace(/[^0-9\.]/g, '');
      const image = card.querySelector('img').getAttribute('src');

      const cartKey = `cart-${user.email}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

      const isAlreadyInCart = cart.some(item => item.name === name);

      if (isAlreadyInCart) {
        alert(`${name} is already in the cart.`);
      } else {
        cart.push({ name, price, image });
        localStorage.setItem(cartKey, JSON.stringify(cart))
        if (cartCounter) cartCounter.textContent = cart.length;
        alert(`${name} added to cart!`);
      }

    });
  });

  buyNowButtons.forEach(button => {
    button.addEventListener('click', function () {
      const card = this.closest('.product-card');
      const name = card.querySelector('h3').textContent;
      const price = card.querySelector('p').textContent.replace(/[^0-9\.]/g, '');
      const image = card.querySelector('img').getAttribute('src');

      const product = { name, price, image };
      localStorage.setItem('buyNowProduct', JSON.stringify(product));

      const loggedInUser = localStorage.getItem('loggedInUser');

      if (loggedInUser) {
        window.location.href = 'confirm.html';
      } else {
        localStorage.setItem('redirectAfterLogin', 'confirm.html');
        window.location.href = 'login.html';
      }
    });
  });

});

// Dropdown Menu
  function toggleDropdown() {
    const dropdown = document.getElementById("contactDropdown");
    dropdown.classList.toggle("show");
  }
  window.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.getElementById("contactDropdown").classList.remove("show");
    }
  });

// Newsletter Form
  document.getElementById("newsletter-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("🎉 Thank you for subscribing to IronMart!");
    this.reset();
  });


// Back to Top Button
const backToTopBtn = document.getElementById("backToTopBtn");
window.addEventListener("scroll", () => {
  backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
});
backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});




