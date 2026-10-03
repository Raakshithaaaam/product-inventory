interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

let products: Product[] = [];

const form = document.getElementById("productForm") as HTMLFormElement;
const productList = document.getElementById("productList") as HTMLTableSectionElement;
const totalValue = document.getElementById("totalValue") as HTMLHeadingElement;

function addProduct(product: Product): void {
  products.push(product);
  displayProducts();
}

function deleteProduct(id: number): void {
  products = products.filter(product => product.id !== id);
  displayProducts();
}

function calculateTotal(): number {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

function displayProducts(): void {
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

form.addEventListener("submit", function (event: SubmitEvent): void {
  event.preventDefault();

  const nameInput = document.getElementById("name") as HTMLInputElement;
  const priceInput = document.getElementById("price") as HTMLInputElement;
  const quantityInput = document.getElementById("quantity") as HTMLInputElement;

  const product: Product = {
    id: Date.now(),
    name: nameInput.value,
    price: Number(priceInput.value),
    quantity: Number(quantityInput.value)
  };

  addProduct(product);

  form.reset();
});

// Make deleteProduct accessible to the HTML onclick handler
(window as any).deleteProduct = deleteProduct;
