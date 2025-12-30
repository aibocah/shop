// =============================
// LOGIN ADMIN
// =============================
const ADMIN_PASSWORD = "admin123";

function login() {
  const pass = document.getElementById("password").value;
  if (pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadProducts();
  } else {
    alert("Password salah!");
  }
}

// =============================
// FORM TAMBAH PRODUK
// =============================
function showAddForm() {
  document.getElementById("addForm").style.display = "block";
}

function saveProduct() {
  const product = {
    id: Date.now(),
    type: document.getElementById("type").value,
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
    description: document.getElementById("description").value,
    affiliateLink: document.getElementById("affiliateLink").value
  };

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  alert("Produk berhasil disimpan!");
  loadProducts();
}

// =============================
// LOAD & TAMPIL PRODUK
// =============================
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products"));

  if (!products) {
    fetch("data/products.json")
      .then(res => res.json())
      .then(data => renderProducts(data));
  } else {
    renderProducts(products);
  }
}

function renderProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <small>${p.type}</small>
        <br><br>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Hapus</button>
      </div>
    `;
}
function deleteProduct(index) {
  if (!confirm("Yakin hapus produk ini?")) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));

  loadProducts();
}
    });

