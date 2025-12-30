
/********************************
 * 1. LOGIN ADMIN
 ********************************/
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

/********************************
 * 2. FORM TAMBAH / EDIT PRODUK
 ********************************/
let editIndex = null;

function showAddForm() {
  document.getElementById("addForm").style.display = "block";
}

/********************************
 * 3. SIMPAN PRODUK
 * (Tambah & Edit)
 ********************************/
function saveProduct() {
  let products = JSON.parse(localStorage.getItem("products")) || [];

  const product = {
    id: editIndex !== null ? products[editIndex].id : Date.now(),
    type: document.getElementById("type").value,
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    image: document.getElementById("image").value,
    description: document.getElementById("description").value,
    affiliateLink: document.getElementById("affiliateLink").value
  };

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  localStorage.setItem("products", JSON.stringify(products));

  alert("Produk berhasil disimpan");
  loadProducts();
}

/********************************
 * 4. LOAD PRODUK
 ********************************/
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products"));

  if (!products || products.length === 0) {
    fetch("data/products.json")
      .then(res => res.json())
      .then(data => renderProducts(data))
      .catch(err => console.error("Gagal load products.json", err));
  } else {
    renderProducts(products);
  }
}

/********************************
 * 5. TAMPILKAN PRODUK
 ********************************/
function renderProducts(products) {
  const list = document.getElementById("productList");
  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
        <small>Type: ${p.type}</small>
        <br><br>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Hapus</button>
      </div>
    `;
  });
}

/********************************
 * 6. EDIT PRODUK
 ********************************/
function editProduct(index) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const p = products[index];

  document.getElementById("type").value = p.type;
  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("image").value = p.image;
  document.getElementById("description").value = p.description;
  document.getElementById("affiliateLink").value = p.affiliateLink;

  editIndex = index;
  document.getElementById("addForm").style.display = "block";
}

/********************************
 * 7. HAPUS PRODUK
 ********************************/
function deleteProduct(index) {
  if (!confirm("Yakin hapus produk ini?")) return;

  let products = JSON.parse(localStorage.getItem("products")) || [];
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));

  loadProducts();
}
