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


// fetch data
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
            <img src="${item.img}" alt="${item.name}" />
            <div>
              <h5>${item.name}</h5>
              <p>${item.price} Baht</p>
            </div>
          `;
        menuLists.appendChild(menuItem);
      });
    })
    .catch((error) => console.error("Error fetching menu:", error));
});
