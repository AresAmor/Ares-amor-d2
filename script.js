// Initialize the cart as an empty array
let cart = [];

// Function to add products to the cart
function addToCart(product, price) {
    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.product === product);
    
    if (existingProduct) {
        // If the product is already in the cart, increase its quantity
        existingProduct.quantity += 1;
    } else {
        // If the product is new, add it to the cart
        cart.push({ product: product, price: price, quantity: 1 });
    }

    // Show a confirmation message
    displayMessage(`${product} added to cart!`);
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = ''; // Clear previous contents

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    // Display the cart items
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            ${item.product} - $${item.price} x ${item.quantity}
            <button class="remove-btn" onclick="removeFromCart('${item.product}')">Remove</button>
        `;
        cartContainer.appendChild(itemDiv);
    });
}

// Function to remove items from the cart
function removeFromCart(product) {
    cart = cart.filter(item => item.product !== product);
    displayMessage(`${product} removed from cart.`);
    updateCartDisplay();
}

// Function to display messages for user feedback
function displayMessage(message) {
    const messageBox = document.createElement('div');
    messageBox.className = 'message-box';
    messageBox.textContent = message;
    document.body.appendChild(messageBox);

    // Fade out after 2 seconds
    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => document.body.removeChild(messageBox), 500);
    }, 2000);
}

// Add event listeners to "Add to Cart" buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            const product = event.target.dataset.product;
            const price = parseFloat(event.target.dataset.price);
            addToCart(product, price);
        });
    });
});
