async function loadProducts() {
  const url = 'https://opensheet.elk.sh/1TVQw8tH6P2MzR4s-IUVtj-Hr0Ul0UkEHdv6SBi0Oh_w/Sheet1';

  try {
    const res = await fetch(url);
    const products = await res.json();
    const container = document.getElementById('products');
    container.innerHTML = '';

    products.forEach(prod => {
      const isInStock = prod.InStock.toLowerCase() === 'yes';
      const html = `
        <div class="product ${!isInStock ? 'outofstock' : ''}">
          <img src="${prod.ImageURL}" alt="${prod.Name}" />
          <h3>${prod.Name}</h3>
          <p>${prod.Description}</p>
          <p class="price">₹${prod.Price}</p>
          ${isInStock ? `
            <a href="https://wa.me/91XXXXXXXXXX?text=Hi! I'm interested in *${prod.Name}* (₹${prod.Price}) from ComfyStitch." target="_blank">
              <button>Order on WhatsApp</button>
            </a>` : ''}
        </div>`;
      container.innerHTML += html;
    });

  } catch (error) {
    document.getElementById('products').innerText = 'Failed to load products.';
  }
}

window.onload = loadProducts;
