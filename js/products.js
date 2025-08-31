document.addEventListener('DOMContentLoaded', () => {
    const productListContainer = document.querySelector('.product-list');
    const toolbar = document.querySelector('.product-toolbar');

    if (!productListContainer || !toolbar) {
        return; 
    }

    const allProductCards = Array.from(productListContainer.querySelectorAll('.product-card'));
    allProductCards.forEach(card => {
        const name = card.querySelector('h3').textContent.trim();
        const priceText = card.querySelector('p').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

        if (name) {
            card.dataset.name = name;
        }
        if (!isNaN(price)) {
            card.dataset.price = price;
        }
    });

    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const sortBySelect = document.getElementById('sort-by');

    const allProducts = allProductCards.map(card => {
        return {
            element: card,
            name: card.dataset.name,
            price: parseFloat(card.dataset.price)
        };
    });

    function updateProductDisplay() {
        let productsToShow = [...allProducts];

        const minPrice = parseFloat(priceMinInput.value) || 0;
        const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
        productsToShow = productsToShow.filter(p => p.price >= minPrice && p.price <= maxPrice);

        const sortBy = sortBySelect.value;
        if (sortBy === 'price-asc') {
            productsToShow.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price-desc') {
            productsToShow.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'name-asc') {
            productsToShow.sort((a, b) => a.name.localeCompare(b.name));
        }

        productListContainer.innerHTML = '';
        productsToShow.forEach(p => {
            productListContainer.appendChild(p.element);
        });
    }
    priceMinInput.addEventListener('input', updateProductDisplay);
    priceMaxInput.addEventListener('input', updateProductDisplay);
    sortBySelect.addEventListener('change', updateProductDisplay);
});