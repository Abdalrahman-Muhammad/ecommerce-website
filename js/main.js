const data = [
  {
    id: 1,
    name: "Rolex Watch",
    img: "./img/831257.jpg",
    amt: 1599,
    catagory: "watch",
    selected: false,
  },

  {
    id: 2,
    name: "Nike Shoes",
    img: "./img/graysho.jpg",
    amt: 1300,
    catagory: "shoes",
    selected: false,
  },

  {
    id: 3,
    name: "Lovely Cam",
    img: "./img/feature_prod_03.jpg",
    amt: 2799,
    selected: false,
    catagory: "camera",
  },
  {
    id: 4,
    name: "smart Watch",
    img: "./img/feature_prod_02.jpg",
    amt: 9270,
    catagory: "watch",
    selected: false,
  },
  {
    id: 5,
    name: "Old cam",
    img: "./img/pexels-alex-andrews-1203803.jpg",
    amt: 12999,
    catagory: "camera",
    selected: false,
  },

  {
    id: 6,
    name: "white sneakers ",
    img: "./img/banner_img_01.jpg",
    amt: 3999,
    catagory: "shoes",
    selected: false,
  },
];

let cartCount = document.getElementById("cartCount"); //cart counter span

let addToCartBtn;
let currentCount = cartCount.textContent;
let productsContainer = document.querySelector(".products"); // the div where i will push the products
let categoryList = document.querySelector(".category-list"); // the div that will contain categories
let selectedProducts = localStorage.getItem("selectedProduct")
  ? JSON.parse(localStorage.getItem("selectedProduct"))
  : []; //product that i will select by addtocart
// displayProducts takes an array of  objects and render the products to HTML
cartCount.textContent = selectedProducts.reduce((acc, curr) => {
  return acc + curr.amount;
}, 0);
function displayProducts(products) {
  if (products.length > 0) {
    const product_details = products
      .map((product) => {
        console.log(selectedProducts);
        const ids = selectedProducts.map((obj) => obj.id);
        const isSelected = ids.includes(product.id); //
        const buttonText = isSelected ? "remove" : "add to cart";
        const buttonStyle = isSelected
          ? `background-color:#fff;color:#b88e2f`
          : `background-color:#b88e2f;color:#fff`;

        return `<div class="product" data-id="${product.id}">
      <div class="img"><img src="${product.img}"></div>
      <div class="product-details">
      <span class="name">${product.name}</span>
      <span class="amt" data-id="${product.amt}">$${product.amt}</span>
      <button class="addToCart" style="${buttonStyle}"> ${buttonText} </button>
      </div>
      </div>`;
      })
      .join("");

    productsContainer.innerHTML = product_details;
    addToCartBtn = document.querySelectorAll(".addToCart"); //to select btns after rendering

    addToCartBtn.forEach((btn) => {
      btn.addEventListener("click", handleCart);
    });
  } else {
    productsContainer.innerHTML = `<h3 style ="margin-top:50px; color:red;">No Products Available</h3>`;
  }
}

function handleCart(e) {
  const productElement = e.target.closest(".product"); //the node that hold the product
  const productId = parseInt(productElement.dataset.id); // get the product id
  const priceElement = productElement.querySelector(".amt");
  const price = parseInt(priceElement.dataset.id);
  if (selectedProducts.some((product) => product.id == productId)) {
    selectedProducts = selectedProducts.filter((obj) => obj.id !== productId);
    e.target.innerHTML = "add to cart";
    e.target.classList.remove("clicked");
    e.target.style.backgroundColor = "#b88e2f";
    e.target.style.color = "#fff";
  } else {
    selectedProducts.push({ id: productId, amount: 1, price: price });
    e.target.innerHTML = "remove";
    e.target.style.backgroundColor = "#fff";
    e.target.style.color = "#b88e2f";
    e.target.classList.add("clicked");
  }
  localStorage.setItem("selectedProduct", JSON.stringify(selectedProducts));
  let x = 0;
  selectedProducts.forEach((ele) => {
    x += ele.amount;
  });

  cartCount.innerHTML = x;
  addToCartDiv();
  console.log(selectedProducts);
}

function setCategories() {
  // will return an array of categories i have
  const allCategories = data.map(function (product) {
    return product.catagory;
  });

  const categories = ["all", ...new Set(allCategories)]; // array of unique categories and (all);

  categoryList.innerHTML = categories
    .map(function (category) {
      return `<button class="categoryList">${category}</button>`;
    })
    .join(""); // make categories buttons

  var list = categoryList.querySelectorAll("button"); //this to add css styling
  list[0].classList.add("active");

  list.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      list.forEach((btn) => {
        btn.classList.remove("active");
      });
      event.target.classList.add("active");

      const selectedCategory = event.currentTarget.textContent;
      selectedCategory === "all"
        ? displayProducts(data)
        : displayProducts(
            data.filter((obj) => obj.catagory == selectedCategory)
          );
    });
  });
}

//---------------open and closing the cart---------------------
function openCart() {
  addToCartDiv();
  console.log(selectedProducts);
  let cartDiv = document.getElementById("allScreen");
  cartDiv.style.display = "block";
}
let closeBtn = document.querySelector(".fa-solid.fa-circle-xmark");
closeBtn.addEventListener("click", function () {
  let cartDiv = document.getElementById("allScreen");
  cartDiv.style.display = "none";
});
//-----------------------------------------------------------

let increaseBtns;
let decreaseBtns;

function addToCartDiv() {
  let cartDiv = document.getElementById("cart-items-container");
  console.log(selectedProducts);
  const productSelected = data.filter((product) =>
    selectedProducts.some((obj) => obj.id === product.id)
  );
  console.log(productSelected);
  const addProductToDiv = productSelected
    .map((product) => {
      return `<div class="cart-item" data-id="${product.id}">
                <img src="${product.img}">
                <p>${product.name}</p>
                <p class='price' data-id="${product.amt}">${
        selectedProducts.find((obj) => obj.id == product.id).price
      }</p>
                <button class="increase">+</button>
                <span class="span">${
                  selectedProducts.find((obj) => obj.id == product.id).amount
                }</span>
                <button class="decrease">-</button>
            </div>`;
    })
    .join("");
  cartDiv.innerHTML = addProductToDiv;
  increaseBtns = document.querySelectorAll(".increase");
  decreaseBtns = document.querySelectorAll(".decrease");
  increaseBtns.forEach((e) => {
    e.addEventListener("click", increase);
  });
  decreaseBtns.forEach((e) => {
    e.addEventListener("click", decrease);
  });
}

displayProducts(data);
setCategories();

//====================================================================================================================

function increase(e) {
  const productElement = e.target.closest(".cart-item");
  const productId = productElement.dataset.id;
  const priceEle = productElement.querySelector(".price");
  const price = parseInt(priceEle.dataset.id);

  // Find the product in the cart
  const cartProduct = selectedProducts.find(
    (product) => product.id == productId
  );

  if (cartProduct) {
    // Increment the amount of the product in the cart
    cartProduct.amount++;
    cartProduct.price = cartProduct.amount * price;
  } else {
    // Add the product to the cart with an initial amount of 1
    selectedProducts.push({ id: productId, amount: 1, price: price });
  }

  localStorage.setItem("selectedProduct", JSON.stringify(selectedProducts));
  // const price = productElement.querySelector(".price");
  priceEle.textContent = cartProduct.price;

  const mySpan = productElement.querySelector(".span");

  // Update the displayed amount in the span
  console.log(cartProduct);
  mySpan.textContent = cartProduct.amount.toString();

  CountCart();
}

function decrease(e) {
  const productElement = e.target.closest(".cart-item");
  const productId = productElement.dataset.id;
  // const priceSpan = productElement.querySelector(".price");
  const priceEle = productElement.querySelector(".price");
  const price = parseInt(priceEle.dataset.id);

  const cartProduct = selectedProducts.find(
    (product) => product.id == productId
  );
  if (cartProduct) {
    if (cartProduct.amount != 1) {
      cartProduct.amount--;
      const mySpan = productElement.querySelector(".span");
      mySpan.textContent = cartProduct.amount.toString();
      cartProduct.price = cartProduct.amount * price;
    } else {
      selectedProducts.splice(selectedProducts.indexOf(cartProduct), 1);
      addToCartDiv();
      displayProducts(data);
      setCategories();
    }
    localStorage.setItem("selectedProduct", JSON.stringify(selectedProducts));
    priceEle.textContent = cartProduct.price;
  }
  CountCart();
}

function CountCart() {
  let x = 0;
  selectedProducts.forEach((ele) => {
    x += ele.amount;
  });

  cartCount.innerHTML = x;
}
