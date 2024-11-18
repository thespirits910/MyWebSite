function showQuantityControls(button, price) {
    var controls = button.nextElementSibling;
    var totalPrice = controls.querySelector('.total-price');
    button.style.display = 'none'; // Hide "Add to Cart" button
    controls.style.display = 'block'; // Show quantity controls
    var quantityInput = controls.querySelector('.quantity');
    quantityInput.value = 1; // Reset quantity to 1
    totalPrice.textContent = '$' + price.toFixed(2); // Set initial total price
}

function changeQuantity(button, amount, price) {
    var controls = button.parentElement;
    var input = controls.querySelector('.quantity');
    var currentValue = parseInt(input.value);
    var newValue = currentValue + amount;

    // Prevent quantity from going below 1 or above 9
    if (newValue < 1) {
        newValue = 0;
    } else if (newValue > 9) {
        newValue = 9;
    }

    input.value = newValue;


    // Show "Add to Cart" button if quantity is 1 and - is pressed
    if (newValue === 0 && amount === -1) {
        controls.style.display = 'none';
        controls.previousElementSibling.style.display = 'block'; // Show "Add to Cart" button
    }

    // Update total price
    var totalPrice = controls.querySelector('.total-price');
    totalPrice.textContent = '$' + (newValue * price).toFixed(2);
}
