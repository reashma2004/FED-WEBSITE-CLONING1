let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Elements
const cartItemsContainer = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const placeOrderButton = document.getElementById("place-order");
const orderSummarySection = document.getElementById("order-summary");
const addressDialog = document.getElementById("address-dialog");
const paymentDialog = document.getElementById("payment-dialog");
const addressForm = document.getElementById("address-form");
const paymentForm = document.getElementById("payment-form");
const paymentDetails = document.getElementById("payment-details");
const closeAddressDialogButton = document.getElementById(
  "close-address-dialog"
);
const continueToPaymentButton = document.getElementById("continue-to-payment");
const closePaymentDialogButton = document.getElementById(
  "close-payment-dialog"
);
const placeOrderFinalButton = document.getElementById("place-order-button");
const orderConfirmationDialog = document.getElementById(
  "order-confirmation-dialog"
);
const closeConfirmationButton = document.getElementById("close-confirmation");
const backToShoppingButton = document.getElementById("back-to-shopping");

document.addEventListener("DOMContentLoaded", () => {
  placeOrderButton.addEventListener("click", () => {
    addressDialog.style.display = "block";
  });

  closeAddressDialogButton.addEventListener("click", () => {
    addressDialog.style.display = "none";
  });

  continueToPaymentButton.addEventListener("click", (event) => {
    event.preventDefault();
    addressDialog.style.display = "none";
    paymentDialog.style.display = "block";
  });

  closePaymentDialogButton.addEventListener("click", () => {
    paymentDialog.style.display = "none";
  });

  paymentForm.addEventListener("change", () => {
    const selectedPayment = document.querySelector(
      'input[name="payment"]:checked'
    ).value;
    let paymentInfo = "";
    switch (selectedPayment) {
      case "credit-card":
        paymentInfo = `
          <label for="card-number">Card Number:</label>
          <input type="text" id="card-number" name="card-number" required><br>
          <label for="expiry-date">Expiry Date:</label>
          <input type="text" id="expiry-date" name="expiry-date" required><br>
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" name="cvv" required><br>
        `;
        break;
      case "net-banking":
        paymentInfo = `
          <label for="bank-name">Bank Name:</label>
          <input type="text" id="bank-name" name="bank-name" required><br>
          <label for="account-number">Account Number:</label>
          <input type="text" id="account-number" name="account-number" required><br>
        `;
        break;
      case "upi":
        paymentInfo = `
          <label for="upi-id">UPI ID:</label>
          <input type="text" id="upi-id" name="upi-id" required><br>
        `;
        break;
      case "cod":
        paymentInfo =
          "<p>Cash on Delivery selected. No additional information needed.</p>";
        break;
    }
    paymentDetails.innerHTML = paymentInfo;
    placeOrderFinalButton.style.display = "block";
  });

  placeOrderFinalButton.addEventListener("click", () => {
    // Clear the cart and update the display
    cart = [];
    localStorage.removeItem("cart");
    updateCart(); // Update cart display

    paymentDialog.style.display = "none";
    orderConfirmationDialog.style.display = "block";
  });

  closeConfirmationButton.addEventListener("click", () => {
    orderConfirmationDialog.style.display = "none";
  });

  backToShoppingButton.addEventListener("click", () => {
    orderConfirmationDialog.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === addressDialog) {
      addressDialog.style.display = "none";
    } else if (event.target === paymentDialog) {
      paymentDialog.style.display = "none";
    } else if (event.target === orderConfirmationDialog) {
      orderConfirmationDialog.style.display = "none";
    }
  });
});

// Functions
function updateCart() {
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("cart-item");
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>₹${item.price}</p>
        <div class="actions">
          <button class="delete" data-index="${index}">Delete</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemElement);
      totalPrice += item.price;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
}

if (cartItemsContainer) {
  cartItemsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
      const index = event.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  });
}

// Initial cart update
updateCart();

// Add to Cart functionality for bethnic.html
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(
      button.getAttribute("data-price").replace("₹", "")
    );
    const image = button.getAttribute("data-image");

    const product = { name, price, image };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
  });
});
