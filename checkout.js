// Global cart object
let cart = JSON.parse(localStorage.getItem('cart')) || {};

// Function to show quantity controls when "Add to Cart" is clicked
function showQuantityControls(button, price) {
    let controls = button.nextElementSibling;
    let totalPrice = controls.querySelector('.total-price');
    button.style.display = 'none'; // Hide "Add to Cart" button
    controls.style.display = 'block'; // Show quantity controls
    let quantityInput = controls.querySelector('.quantity');
    quantityInput.value = 1; // Reset quantity to 1
    totalPrice.textContent = '$' + price.toFixed(2); // Set initial total price

    updateCart(button, price, 1); // Add item to cart with quantity 1
}

// Function to change quantity
function changeQuantity(button, amount, price) {
    let controls = button.parentElement;
    let input = controls.querySelector('.quantity');
    let currentValue = parseInt(input.value);
    let newValue = currentValue + amount;

    if (newValue < 1) {
        newValue = 0;
    } else if (newValue > 9) {
        newValue = 9;
    }

    input.value = newValue;

    let totalPrice = controls.querySelector('.total-price');
    totalPrice.textContent = '$' + (newValue * price).toFixed(2);

    if (newValue === 0 && amount === -1) {
        controls.style.display = 'none';
        controls.previousElementSibling.style.display = 'block'; // Show "Add to Cart" button
        updateCart(controls.previousElementSibling, price, 0); // Remove item from cart
    } else {
        updateCart(controls.previousElementSibling, price, newValue); // Update item in cart
    }
}

// Function to update the cart
function updateCart(button, price, quantity) {
    let itemName = button.previousElementSibling.textContent.trim();
    if (quantity === 0) {
        delete cart[itemName];
    } else {
        cart[itemName] = { price: price, quantity: quantity };
    }
    updateCartSummary();
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
}

// Function to update the cart summary in the main page
function updateCartSummary() {
    let cartItemsDiv = document.getElementById('cart-items');
    let subtotal = 0;
    let cartHTML = '';

    for (let item in cart) {
        let itemPrice = cart[item].price;
        let itemQuantity = cart[item].quantity;
        let itemTotal = itemPrice * itemQuantity;
        subtotal += itemTotal;

        cartHTML += `<div class="cart-item">
            <span>${item} x ${itemQuantity} @ $${itemPrice.toFixed(2)} each</span>
            <span>Total: $${itemTotal.toFixed(2)}</span>
        </div>`;
    }

    let tax = subtotal * 0.06;
    let total = subtotal + tax;

    cartItemsDiv.innerHTML = cartHTML;
    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('tax').textContent = tax.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);

    // Show cart summary only if there are items in the cart
    document.querySelector('.cart-summary').style.display = subtotal > 0 ? 'block' : 'none';
}

// Function to handle checkout
function checkout() {
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart data to localStorage
    window.location.href = 'checkout.html'; // Redirect to checkout page
}

// Function to display the order summary on checkout page
function displayCheckoutCart() {
    let cartItemsDiv = document.getElementById('checkout-cart-items');
    let subtotal = 0;
    let cartHTML = '';

    for (let item in cart) {
        let itemPrice = cart[item].price;
        let itemQuantity = cart[item].quantity;
        let itemTotal = itemPrice * itemQuantity;
        subtotal += itemTotal;

        cartHTML += `<div class="cart-item">
            <span>${item}</span>
            <span>${itemQuantity} x $${itemPrice.toFixed(2)} = $${itemTotal.toFixed(2)}</span>
        </div>`;
    }

    let tax = subtotal * 0.06;
    let total = subtotal + tax;

    cartItemsDiv.innerHTML = cartHTML;
    document.getElementById('checkout-subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('checkout-tax').textContent = tax.toFixed(2);
    document.getElementById('checkout-total').textContent = total.toFixed(2);
}

// Load and display the cart summary on checkout page load
if (window.location.pathname.endsWith('checkout.html')) {
    cart = JSON.parse(localStorage.getItem('cart')) || {}; // Reload cart data from localStorage
    displayCheckoutCart();
}

// Function to place an order
function placeOrder() {
    alert("Order placed successfully!");
    localStorage.removeItem('cart'); // Clear the cart
    window.location.href = "index.html"; // Redirect to main page
}
