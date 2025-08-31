const user = JSON.parse(localStorage.getItem("loggedInUser"));
const cartKey = user ? `cart-${user.email}` : null;
let cartItems = cartKey ? JSON.parse(localStorage.getItem(cartKey)) || [] : [];

const cartLayout = document.querySelector(".cart-layout");
const emptyCartMessage = document.getElementById("empty-cart-message");
const cartItemsContainer = document.getElementById('cart-items');
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryTotal = document.getElementById("summary-total");
const cartCounter = document.getElementById('cart-count');
const checkoutModal = document.getElementById('checkout-modal');
const confirmCheckoutBtn = document.getElementById('confirm-checkout-btn');
const cancelCheckoutBtn = document.getElementById('cancel-checkout-btn');
const showMoreBtn = document.getElementById('show-more-btn'); 

const limit = 3;
let showingAll = false;

function renderCartItems(itemsToRender) {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    itemsToRender.forEach((item, index) => {
        const originalIndex = cartItems.findIndex(cartItem => cartItem.name === item.name && cartItem.price === item.price);
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item-row');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
            <div class="cart-item-actions">
                <button class="buy-now-btn" onclick="buyItem(${originalIndex})">Buy Now</button>
                <button class="remove-btn" onclick="removeItem(${originalIndex})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemDiv);
    });

    total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

    summarySubtotal.textContent = `₹${total.toFixed(2)}`;
    summaryTotal.textContent = `₹${total.toFixed(2)}`;
}

function displayCartContent() {
    if (cartCounter) cartCounter.textContent = cartItems.length;

    if (!user || cartItems.length === 0) {
        cartLayout.style.display = "none";
        emptyCartMessage.style.display = "block";
        showMoreBtn.style.display = "none";
        return;
    }
    
    cartLayout.style.display = "grid";
    emptyCartMessage.style.display = "none";

    if (cartItems.length > limit) {
        renderCartItems(cartItems.slice(0, limit));
        showMoreBtn.style.display = "block";
        showMoreBtn.textContent = "Show More";
        showingAll = false;
    } else {
        renderCartItems(cartItems);
        showMoreBtn.style.display = "none";
    }
}

showMoreBtn.addEventListener('click', () => {
    showingAll = !showingAll;
    if (showingAll) {
        renderCartItems(cartItems); 
        showMoreBtn.textContent = "Show Less";
    } else {
        renderCartItems(cartItems.slice(0, limit)); 
        showMoreBtn.textContent = "Show More";
    }
});

function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    displayCartContent(); 
}

function clearCart() {
    if (confirm("Are you sure you want to clear your cart?")) {
        cartItems = [];
        localStorage.setItem(cartKey, JSON.stringify(cartItems));
        displayCartContent();
    }
}

function buyItem(index) {
    const product = cartItems[index];
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    window.location.href = "confirm.html";
}

function checkoutCart() {
    if (cartItems.length > 0) {
        checkoutModal.style.display = "flex";
    }
}

function confirmAndCheckout() {
    localStorage.setItem('lastOrder', JSON.stringify(cartItems));
    cartItems = [];
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
    window.location.href = "order-success.html";
}

confirmCheckoutBtn.addEventListener('click', confirmAndCheckout);
cancelCheckoutBtn.addEventListener('click', () => { checkoutModal.style.display = "none"; });
checkoutModal.addEventListener('click', (event) => {
    if (event.target === checkoutModal) checkoutModal.style.display = "none";
});

displayCartContent();