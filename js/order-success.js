document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"));

    const orderDetailsContainer = document.getElementById('order-details');
    const shippingAddressEl = document.getElementById('shipping-address');
    const successMessageEl = document.getElementById('success-message');

    if (user && lastOrder && lastOrder.length > 0) {
        successMessageEl.textContent = `Thank you for your purchase, ${user.name}! Your fitness gear is on its way!`;

        let total = 0;
        lastOrder.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('order-item');
            itemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>₹${parseFloat(item.price).toFixed(2)}</span>
            `;
            orderDetailsContainer.appendChild(itemDiv);
            total += parseFloat(item.price);
        });

        const totalDiv = document.createElement('div');
        totalDiv.classList.add('order-total');
        totalDiv.innerHTML = `
            <span>Total</span>
            <span>₹${total.toFixed(2)}</span>
        `;
        orderDetailsContainer.appendChild(totalDiv);

        shippingAddressEl.textContent = user.address;

        localStorage.removeItem('lastOrder');
    } else {
        successMessageEl.textContent = 'You have no recent orders to display.';
        document.querySelector('.order-summary-box').style.display = 'none';
    }
});