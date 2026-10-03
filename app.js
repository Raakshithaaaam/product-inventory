"use strict";
let products = [];
const form = document.getElementById("productForm");
const productList = document.getElementById("productList");
const totalValue = document.getElementById("totalValue");
function addProduct(product) {
    products.push(product);
    displayProducts();
}
function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    displayProducts();
}
function calculateTotal() {
    return products.reduce((total, product) => total + product.price * product.quantity, 0);
}
function displayProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${product.name}</td>
      <td>₹${product.price.toFixed(2)}</td>
      <td>${product.quantity}</td>
      <td>
        <button onclick="deleteProduct(${product.id})">
          Delete
        </button>
      </td>
    `;
        productList.appendChild(row);
    });
    totalValue.textContent =
        `Total Inventory Value: ₹${calculateTotal().toFixed(2)}`;
}
form.addEventListener("submit", function (event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");
    const quantityInput = document.getElementById("quantity");
    const product = {
        id: Date.now(),
        name: nameInput.value,
        price: Number(priceInput.value),
        quantity: Number(quantityInput.value)
    };
    addProduct(product);
    form.reset();
});
// Make deleteProduct accessible to the HTML onclick handler
window.deleteProduct = deleteProduct;
