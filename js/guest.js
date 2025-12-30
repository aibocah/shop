fetch("data/products.json")
  .then(res => res.json())
  .then(data => {
    const box = document.getElementById("products");
    data.forEach(p => {
      box.innerHTML += `
        <div class="card">
          <img src="${p.image}">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          ${
            p.type === "affiliate"
            ? `<a href="${p.affiliateLink}" target="_blank">Beli Sekarang</a>`
            : `<button onclick="order('${p.name}')">Pesan</button>`
          }
        </div>
      `;
    });
  });

function order(name) {
  const nama = prompt("Nama penerima:");
  const alamat = prompt("Alamat:");
  const custom = prompt("Isi hampers custom:");

  alert(`
Pesanan diterima!
Produk: ${name}
Nama: ${nama}
Alamat: ${alamat}
Isi: ${custom}
`);
}
