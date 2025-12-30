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

function loadProducts() {
  fetch("data/products.json")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("productList");
      list.innerHTML = "";
      data.forEach((p, i) => {
        list.innerHTML += `
          <div class="card">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.price}</p>
            <button onclick="deleteProduct(${i})">Hapus</button>
          </div>
        `;
      });
    });
}
