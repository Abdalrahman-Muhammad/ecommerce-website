export function displayProducts(products) {
  if (products.length > 0) {

    const product_details = products.map((product) => {
      console.log(selectedProducts);
      const ids = selectedProducts.map((obj) => obj.id);
      const isSelected = ids.includes(product.id); //
      const buttonText = isSelected ? "remove" : "add to cart"
      const buttonStyle = isSelected ? `background-color:#fff;color:#b88e2f` : `background-color:#b88e2f;color:#fff`

      return `<div class="product" data-id="${product.id}">
      <div class="img"><img src="${product.img}"></div>
      <div class="product-details">
      <span class="name">${product.name}</span>
      <span class="amt" data-id="${product.amt}">$${product.amt}</span>
      <button class="addToCart" style="${buttonStyle}"> ${buttonText} </button>
      </div>
      </div>`
    }).join("");

    productsContainer.innerHTML = product_details;
    addToCartBtn = document.querySelectorAll(".addToCart"); //to select btns after rendering

    addToCartBtn.forEach((btn) => {
      btn.addEventListener('click', handleCart);
    })

  } else {
    productsContainer.innerHTML = `<h3 style ="margin-top:50px; color:red;">No Products Available</h3>`
  }

}