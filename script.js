const container = document.getElementById("container");
const cartDiv = document.getElementById("cart");

let cart = [];

// Fetch products
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    displayProducts(data);
  })
  .catch((err) => {
    console.log("Error:", err);
  });

// Display products
function displayProducts(products) {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = product.image;

    const title = document.createElement("p");
    title.innerText = product.title.slice(0, 40) + "...";

    const price = document.createElement("h4");
    price.innerText = "₹ " + product.price;

    const btn = document.createElement("button");
    btn.innerText = "Add to Cart";
    btn.className = "add-btn";

    btn.addEventListener("click", () => {
      addToCart(product);
    });

    card.append(img, title, price, btn);
    container.appendChild(card);
  });
}

// Add to cart
function addToCart(product) {
  cart.push(product);
  renderCart();
}

// Render cart
function renderCart() {
  cartDiv.innerHTML = "";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";

    const name = document.createElement("p");
    name.innerText = item.title.slice(0, 20);

    const price = document.createElement("p");
    price.innerText = "₹ " + item.price;

    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.className = "delete-btn";

    delBtn.addEventListener("click", () => {
      deleteItem(index);
    });

    div.append(name, price, delBtn);
    cartDiv.appendChild(div);
  });
}

// Delete from cart
function deleteItem(index) {
  cart.splice(index, 1);
  renderCart();
}
