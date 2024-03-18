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
    const totalPriceElement = existingCartItem.querySelector(".total-price");
    let quantity = parseInt(quantityElement.textContent) + 1;
    quantityElement.textContent = quantity;
    totalPriceElement.textContent = item.price * quantity;
  } else {
    // Create a new cart item element
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = item.id;
    cartItem.innerHTML = `
      <p>${item.name} </p>
      <p>ราคา : ${item.price} บาท </p>
      <p class="quantity">1</p>
      <p class="total-price"> รวม ${item.price} บาท</p>
      <button class="btn btn-danger btn-sm remove-item">Remove</button>
    `;
    document.querySelector("#cart").appendChild(cartItem);
  }
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
