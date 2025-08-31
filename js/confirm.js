
const user = JSON.parse(localStorage.getItem("loggedInUser"));
const product = JSON.parse(localStorage.getItem("buyNowProduct"));

const orderInfoDiv = document.getElementById("order-info");
const orderSuccessDiv = document.getElementById("order-success");
const confirmButton = document.querySelector(".confirm-btn");

if (!user || !product) {
    orderInfoDiv.innerHTML = `<p>Something went wrong. Please return to the store and try again.</p>`;
} else {

    document.getElementById("product-image").src = product.image;
    document.getElementById("product-name").textContent = product.name;
    document.getElementById("product-price").textContent = `Price: ₹${product.price}`;
    document.getElementById("customer-info").innerHTML = `
      <p><strong>Customer:</strong> ${user.name}</p>
      <p><strong>Shipping Address:</strong> ${user.address}</p>
      <p><strong>Contact:</strong> ${user.contact}</p>
    `;
}

function placeOrder() {
    if (!user || !product) return;

    confirmButton.disabled = true;
    confirmButton.textContent = 'Processing...';

    setTimeout(() => {
        const cartKey = `cart-${user.email}`;
        let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        cartItems = cartItems.filter(item => item.name !== product.name);
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        localStorage.removeItem("buyNowProduct");
     
        const cartCounter = document.getElementById("cart-count");
        if (cartCounter) cartCounter.textContent = cartItems.length;

        orderInfoDiv.classList.add('fade-out');

        setTimeout(() => {
            orderInfoDiv.classList.add('hidden');
            orderSuccessDiv.classList.remove('hidden');
        }, 400); 

    }, 1000);
}


