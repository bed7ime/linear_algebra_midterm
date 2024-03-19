document.addEventListener("DOMContentLoaded", function () {
  const cart = document.querySelector("#cart");
  const total = document.querySelector("#totalText");
  const menuLists = document.querySelector(".menu-lists");

  let items = {};

  document.querySelector("#cart-icon").addEventListener("click", function () {
    document.querySelector("#cart-info").classList.toggle("active");
  });

  document.querySelector("#close").addEventListener("click", function () {
    document.querySelector("#cart-info").classList.remove("active");
  });

  function updateTotalPrice() {
    let totalPrice = Object.values(items).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    total.textContent = `Total ${totalPrice.toFixed(2)} บาท`;
  }

  function addItemToCart(item) {
    items[item.id] = items[item.id] || { ...item, quantity: 0 };
    items[item.id].quantity++;

    let existingCartItem = cart.querySelector(`[data-id="${item.id}"]`);
    if (existingCartItem) {
      existingCartItem.querySelector(".quantity").textContent =
        items[item.id].quantity;
      existingCartItem.querySelector(".total-price").textContent = `Total ${
        items[item.id].price * items[item.id].quantity
      } บาท`;
    } else {
      let cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.id = item.id;
      cartItem.innerHTML = `
        <p>${item.name}</p>
        <p>price : ${item.price} Baht</p>
        <div class="quantity-controls">
          <button class="btn btn-sm btn-primary decrease-quantity">-</button>
          <span class="quantity">${items[item.id].quantity}</span>
          <button class="btn btn-sm btn-primary increase-quantity">+</button>
        </div>
        <p class="total-price">Total ${
          items[item.id].price * items[item.id].quantity
        } Baht</p>
        <button class="btn btn-sm btn-warning remove-item">Remove</button>
      `;
      cart.appendChild(cartItem);

      cartItem
        .querySelector(".decrease-quantity")
        .addEventListener("click", function () {
          items[item.id].quantity--;
          if (items[item.id].quantity === 0) {
            delete items[item.id];
            cartItem.remove();
          } else {
            cartItem.querySelector(".quantity").textContent =
              items[item.id].quantity;
            cartItem.querySelector(".total-price").textContent = `Total ${
              items[item.id].price * items[item.id].quantity
            } Baht`;
          }
          updateTotalPrice();
        });

      cartItem
        .querySelector(".increase-quantity")
        .addEventListener("click", function () {
          items[item.id].quantity++;
          cartItem.querySelector(".quantity").textContent =
            items[item.id].quantity;
          cartItem.querySelector(".total-price").textContent = `Total ${
            items[item.id].price * items[item.id].quantity
          } Baht`;
          updateTotalPrice();
        });

      cartItem
        .querySelector(".remove-item")
        .addEventListener("click", function () {
          delete items[item.id];
          cartItem.remove();
          updateTotalPrice();
        });
    }

    updateTotalPrice();
  }

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        let menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.innerHTML = `
          <div class="menu-item">
            <div class="flex">
              <img src="${item.img}" alt="" />
              <div class="text">
                <p class="lead">${item.name}</p>
                <p class="h6">price : ${item.price} Baht</p>
              </div>
            </div>
            <div class="layer">
              <p class="h4">Add to Order</p>
            </div>
          </div>
        `;
        menuItem.addEventListener("click", () => addItemToCart(item));
        menuLists.appendChild(menuItem);
      });
    })
    .catch((error) => console.error("Error fetching menu:", error));

  document.querySelector("#removeAll").addEventListener("click", function () {
    items = {};
    cart.innerHTML = "";
    updateTotalPrice();
  });

  document.querySelector("#place-order").addEventListener("click", function () {
    printPDF();
  });

  function printPDF() {
    const doc = new jsPDF();
    let y = 20;
    doc.text("Order Summary", 20, y);
    y += 10;
    Object.values(items).forEach((item) => {
      doc.text(`${item.name} price : ${item.price} Baht  quantity : ${item.quantity} - Total ${item.price * item.quantity} Baht`, 20, y);
      y += 5;
    });
    doc.save("order_summary.pdf");
  }
});

