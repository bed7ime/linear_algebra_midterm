// Show search form
let cartIcon = document.querySelector("#cart-icon");
cartIcon.onclick = () => {
  let cartInfo = document.querySelector("#cart-info");
  cartInfo.classList.toggle("active");
};

// Hide search form
let close_icon = document.querySelector("#close");
close_icon.onclick = () => {
  let cartInfo = document.querySelector("#cart-info");
  cartInfo.classList.remove("active");
};

// Function to add an item to the cart
function addItemToCart(item) {
  // Check if the item already exists in the cart
  const existingCartItem = document.querySelector(
    `#cart [data-id="${item.id}"]`
  );
  if (existingCartItem) {
    const quantityElement = existingCartItem.querySelector(".quantity");
    let quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;
    updateTotalPrice(existingCartItem, item, quantity);
  } else {
    // Create a new cart item element
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = item.id;
    cartItem.innerHTML = `
      <p>${item.name} </p>
      <p>ราคา : ${item.price} บาท </p>
      <div class="quantity-controls">
        <button class="btn btn-sm btn-primary decrease-quantity">-</button>
        <span class="quantity">1</span>
        <button class="btn btn-sm btn-primary increase-quantity">+</button>
      </div>
      <p class="total-price">รวม ${item.price} บาท</p>
      <button class="btn btn-sm btn-warning remove-item">Remove</button>
    `;
    document.querySelector("#cart").appendChild(cartItem);

    // Add event listeners for quantity control buttons and remove button
    const decreaseBtn = cartItem.querySelector(".decrease-quantity");
    const increaseBtn = cartItem.querySelector(".increase-quantity");
    const removeBtn = cartItem.querySelector(".remove-item");
    decreaseBtn.addEventListener("click", () =>
      decreaseItemQuantity(cartItem, item)
    );
    increaseBtn.addEventListener("click", () =>
      increaseItemQuantity(cartItem, item)
    );
    removeBtn.addEventListener("click", () => removeItemFromCart(cartItem));

    // Calculate and display total price
    calculateAllItemsTotalPrice();
  }
}

// Function to calculate and display total price of all items in the cart
function calculateAllItemsTotalPrice() {
  const cartItems = document.querySelectorAll(".cart-item");
  let totalPrice = 0;
  cartItems.forEach((cartItem) => {
    const priceElement = cartItem.querySelector(".total-price");
    const quantity = parseInt(cartItem.querySelector(".quantity").textContent);
    const price = parseFloat(priceElement.textContent.split(" ")[1]); // Extract price from "รวม {price} บาท"
    totalPrice += price * quantity;
  });
  document.querySelector(
    "#total-price"
  ).textContent = `รวมทั้งสิ้น ${totalPrice.toFixed(2)} บาท`;
}

// Rest of the code remains the same...

// Function to remove an item from the cart
function removeItemFromCart(cartItem) {
  cartItem.remove();
}

// Rest of the code remains the same...

// Function to update the total price when quantity changes
function updateTotalPrice(cartItem, item, quantity) {
  const totalPriceElement = cartItem.querySelector(".total-price");
  totalPriceElement.textContent = `รวม ${item.price * quantity} บาท`;
}

// Function to decrease the quantity of an item in the cart
function decreaseItemQuantity(cartItem, item) {
  const quantityElement = cartItem.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
    updateTotalPrice(cartItem, item, quantity);
  }
}

// Function to increase the quantity of an item in the cart
function increaseItemQuantity(cartItem, item) {
  const quantityElement = cartItem.querySelector(".quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;
  updateTotalPrice(cartItem, item, quantity);
}

document.addEventListener("DOMContentLoaded", function () {
  const menuUrl = "data.json";

  fetch(menuUrl)
    .then((response) => response.json())
    .then((data) => {
      const menuLists = document.querySelector(".menu-lists");
      data.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
          <div class="menu-item">
            <div class="flex">
              <img src="${item.img}" alt="" />
              <div class="text">
                <p class="lead">${item.name}</p>
                <p class="h6">ราคา : ${item.price} บาท</p>
              </div>
            </div>
            <div class="layer">
              <p class="h4">เพิ่มลงในคำสั่งซื้อ</p>
            </div>
          </div>
        `;
        menuLists.appendChild(menuItem);

        // Add click event listener to each menu item
        menuItem.addEventListener("click", () => {
          addItemToCart(item);
        });
      });
    })
    .catch((error) => console.error("Error fetching menu:", error));
});

// Function to remove all items from the cart
function removeAllItemsFromCart() {
  const cartItems = document.querySelectorAll(".cart-item");
  cartItems.forEach((cartItem) => {
    cartItem.remove();
  });
}

// Event listener for the "Remove all menu" button
const removeAllBtn = document.querySelector("#removeAll");
removeAllBtn.addEventListener("click", removeAllItemsFromCart);
