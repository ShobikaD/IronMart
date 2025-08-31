const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) {
    window.location.href = "login.html";
}
const cartKey = `cart-${user.email}`;
let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
const limit = 3;
let showingAll = false;

const cartContainer = document.getElementById("profile-cart-items");
const emptyMessage = document.getElementById("empty-message");
const cartSection = document.getElementById("cart-items-section");
const cartHeading = document.getElementById("cart-heading");
const showMoreBtn = document.getElementById("show-more-btn");


function renderCartItems(items) {
    cartContainer.innerHTML = ""; 

    if (items.length === 0) {
        emptyMessage.style.display = "block";
        cartSection.style.display = "none";
    } else {
        emptyMessage.style.display = "none";
        cartSection.style.display = "block";
        
        items.forEach((item, index) => {
            const itemEl = document.createElement("div");
            itemEl.classList.add("profile-cart-item");
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" />
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>₹${item.price}</p>
                </div>
                <div class="item-actions">
                    <button class="buy-btn" onclick="buyItem(${index})">Buy Now</button>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
            cartContainer.appendChild(itemEl);
        });
    }
}

function initializeProfilePage() {
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-contact").textContent = user.contact;
    document.getElementById("user-address").textContent = user.address;

    if (cartItems.length > limit) {
        renderCartItems(cartItems.slice(0, limit));
        showMoreBtn.style.display = "block";
        showMoreBtn.textContent = "Show More";
    } else {
        renderCartItems(cartItems);
        showMoreBtn.style.display = "none";
    }
}

function removeItem(index) {
   
    cartItems.splice(index, 1);
    localStorage.setItem(cartKey, JSON.stringify(cartItems)); 
    initializeProfilePage(); 
}

function buyItem(index) {
    const product = cartItems[index];
    localStorage.setItem("buyNowProduct", JSON.stringify(product));
    window.location.href = "confirm.html";
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    }
}

showMoreBtn.addEventListener("click", () => {
    showingAll = !showingAll; 
    if (showingAll) {
        renderCartItems(cartItems);
        showMoreBtn.textContent = "Show Less";
    } else {
        renderCartItems(cartItems.slice(0, limit));
        showMoreBtn.textContent = "Show More";
    }
});

initializeProfilePage();

