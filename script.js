document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('productContainer');
    const menTab = document.getElementById('menTab');
    const womenTab = document.getElementById('womenTab');
    const kidsTab = document.getElementById('kidsTab');
  
    function createProductCard(product) {
      const card = document.createElement('div');
      card.classList.add('product-card');
  
      const image = document.createElement('img');
      image.src = product.image;
      card.appendChild(image);
  
      const badge = document.createElement('div');
      badge.innerText = product.badge_text || '';
      card.appendChild(badge);
  
      const title = document.createElement('h2');
      title.innerText = product.title;
      card.appendChild(title);
  
      const vendor = document.createElement('p');
      vendor.innerText = `Vendor: ${product.vendor}`;
      card.appendChild(vendor);
  
      const price = document.createElement('p');
      price.innerText = `Price: $${product.price}`;
      card.appendChild(price);
  
      const comparePrice = document.createElement('p');
      comparePrice.innerText = `Compare at Price: $${product.compare_at_price}`;
      card.appendChild(comparePrice);
  
      const discount = document.createElement('p');
      const discountPercentage = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
      discount.innerText = `Discount: ${discountPercentage}% off`;
      card.appendChild(discount);
  
      const addButton = document.createElement('button');
      addButton.innerText = 'Add to Cart';
      card.appendChild(addButton);
  
      productContainer.appendChild(card);
    }
  
    function displayProducts(categoryProducts) {
      productContainer.innerHTML = '';
      categoryProducts.forEach(product => {
        createProductCard(product);
      });
    }
  
    function fetchAndDisplayProducts(categoryIndex) {
      fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
          const categoryProducts = data.categories[categoryIndex].category_products;
          displayProducts(categoryProducts);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  
    menTab.addEventListener('click', () => {
      fetchAndDisplayProducts(0);
    });
  
    womenTab.addEventListener('click', () => {
      fetchAndDisplayProducts(1);
    });
  
    kidsTab.addEventListener('click', () => {
      fetchAndDisplayProducts(2);
    });
  
    fetchAndDisplayProducts(0);
  });
  